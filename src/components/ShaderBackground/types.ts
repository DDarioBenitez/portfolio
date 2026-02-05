export interface ShaderBackgroundProps {
  quality?: 'high' | 'medium' | 'low';
  intensity?: number;
  speed?: number;
  scale?: number;
  className?: string;
}

export interface ShaderConfig {
  resolution: number;
  intensity: number;
  speed: number;
  scale: number;
}

export interface PerformanceCapabilities {
  webgl: boolean;
  renderer?: string;
  maxTextureSize?: number;
  cores?: number;
  memory?: number;
  fallback?: string;
}

export interface ThemeColors {
  color_a: [number, number, number];
  color_b: [number, number, number];
  color_c: [number, number, number];
}