import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ShaderBackgroundProps, ShaderConfig, PerformanceCapabilities, ThemeColors } from './types';

const useShaderCache = () => {
  const cacheRef = useRef<Map<string, WebGLShader | null>>(new Map());
  
  const getShader = useCallback((gl: WebGLRenderingContext, source: string, type: number) => {
    const key = `${type}_${source}`;
    if (!cacheRef.current.has(key)) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      cacheRef.current.set(key, shader);
    }
    return cacheRef.current.get(key)!;
  }, []);
  
  return { getShader };
};

const usePerformanceDetection = (): PerformanceCapabilities => {
  const [capabilities, setCapabilities] = useState<PerformanceCapabilities>({
    webgl: false,
    fallback: 'none'
  });

  useEffect(() => {
    const detectPerformance = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setCapabilities({ 
            webgl: false, 
            fallback: 'canvas' 
          });
          return;
        }
        
        // Analizar renderer y capabilities
        const renderer = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).RENDERER) || '';
        const cores = navigator.hardwareConcurrency || 4;
        const memory = (navigator as any).deviceMemory || 4;
        
        // Clasificar performance
        let level: 'high' | 'medium' | 'low' = 'high';
        if (renderer.includes('Mali') || cores < 4 || memory < 2) {
          level = 'low';
        } else if (cores < 8 || memory < 4) {
          level = 'medium';
        }
        
        setCapabilities({ 
          renderer, 
          cores, 
          memory, 
          webgl: true 
        });
        
        return level;
      } catch (error) {
        console.error('Performance detection failed:', error);
        setCapabilities({ 
          webgl: false, 
          fallback: 'canvas' 
        });
      }
    };
    
    detectPerformance();
  }, []);
  
  return capabilities;
};

const defaultConfigs: Record<string, ShaderConfig> = {
  high: {
    resolution: 1.0,
    intensity: 0.15,
    speed: 0.08,
    scale: 1.2
  },
  medium: {
    resolution: 0.7,
    intensity: 0.12,
    speed: 0.06,
    scale: 1.0
  },
  low: {
    resolution: 0.5,
    intensity: 0.08,
    speed: 0.04,
    scale: 0.8
  }
};

const getThemeColors = (isDark: boolean): ThemeColors => {
  if (isDark) {
    return {
      color_a: [0.058, 0.113, 0.215],  // Azul profundo
      color_b: [0.274, 0.341, 0.447],  // Azul medio  
      color_c: [0.375, 0.470, 0.592]   // Azul claro
    };
  } else {
    return {
      color_a: [0.960, 0.980, 0.992],  // Blanco casi puro
      color_b: [0.945, 0.960, 0.976],  // Blanco roto
      color_c: [0.886, 0.933, 0.964]   // Gris muy claro
    };
  }
};

const loadShaderSource = async (path: string): Promise<string> => {
  const response = await fetch(path);
  return response.text();
};

const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
  const program = gl.createProgram();
  if (!program) return null;
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  
  return program;
};

const SimpleShaderBackground: React.FC<ShaderBackgroundProps> = ({ 
  quality = 'high', 
  className = '',
  intensity = 0.15,
  speed = 0.08,
  scale = 1.2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { getShader } = useShaderCache();
  const capabilities = usePerformanceDetection();

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(theme === 'dark');

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(currentTheme === 'dark');
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    const init = async () => {
      try {
        // Cargar shaders
        const vertexSource = await loadShaderSource('/shaders/vertex.glsl');
        const noiseSource = await loadShaderSource('/shaders/noise.glsl');
        const fragmentSource = await loadShaderSource('/shaders/fragment.glsl');

        // Crear shaders
        const vertexShader = getShader(gl, vertexSource, gl.VERTEX_SHADER);
        const fragmentShader = getShader(gl, fragmentSource.replace('#pragma include "./noise.glsl"', noiseSource), gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) {
          throw new Error('Failed to create shaders');
        }

        // Crear programa
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) {
          throw new Error('Failed to create program');
        }

        programRef.current = program;

        // Setup geometry (full screen quad)
        const positions = new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
           1,  1,
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        // Get attribute and uniform locations
        const positionAttribute = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionAttribute);
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

        // Configurar uniforms
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const intensityLocation = gl.getUniformLocation(program, 'u_intensity');
        const scaleLocation = gl.getUniformLocation(program, 'u_scale');

        const colors = getThemeColors(isDarkMode);
        const colorALocation = gl.getUniformLocation(program, 'u_color_a');
        const colorBLocation = gl.getUniformLocation(program, 'u_color_b');
        const colorCLocation = gl.getUniformLocation(program, 'u_color_c');

        gl.useProgram(program);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(intensityLocation, intensity);
        gl.uniform1f(scaleLocation, scale);
        gl.uniform3f(colorALocation, colors.color_a[0], colors.color_a[1], colors.color_a[2]);
        gl.uniform3f(colorBLocation, colors.color_b[0], colors.color_b[1], colors.color_b[2]);
        gl.uniform3f(colorCLocation, colors.color_c[0], colors.color_c[1], colors.color_c[2]);

      } catch (error) {
        console.error('Shader initialization failed:', error);
      }
    };

    init();

    // Animation loop
    const render = (time: DOMHighResTimeStamp) => {
      if (!glRef.current || !programRef.current) return;

      const gl = glRef.current;
      const program = programRef.current;

      // Resize canvas
      canvas.width = window.innerWidth * (defaultConfigs[quality]).resolution;
      canvas.height = window.innerHeight * (defaultConfigs[quality]).resolution;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(program);

      // Update uniforms
      const timeLocation = gl.getUniformLocation(program, 'u_time');
      gl.uniform1f(timeLocation, time * 0.001 * speed);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render(0);

    // Handle resize
    const handleResize = () => {
      if (glRef.current && programRef.current) {
        const gl = glRef.current;
        const program = programRef.current;
        
        canvas.width = window.innerWidth * (defaultConfigs[quality].resolution);
        canvas.height = window.innerHeight * (defaultConfigs[quality].resolution);
        gl.viewport(0, 0, canvas.width, canvas.height);

        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        gl.useProgram(program);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (glRef.current) {
        glRef.current.deleteProgram(programRef.current!);
      }
    };
  }, [quality, intensity, speed, scale, isDarkMode, getShader]);

  if (!capabilities.webgl) {
    // Fallback simple gradient
    return (
      <div 
        className={className}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
          zIndex: -1
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default SimpleShaderBackground;