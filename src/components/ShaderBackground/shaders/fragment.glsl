precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity;
uniform float u_scale;
uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform vec3 u_color_c;

varying vec2 v_uv;

// Importar funciones de noise
#pragma include "./noise.glsl"

void main() {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  vec3 p3 = vec3(p * 2.0 - 1.0, u_time * 0.08);
  
  float value = simplex3d_fractal(p3 * u_scale) * u_intensity + 0.5;
  
  vec3 color;
  if(value < 0.5) {
    color = mix(u_color_a, u_color_b, value * 2.0);
  } else {
    color = mix(u_color_b, u_color_c, (value - 0.5) * 2.0);
  }
  
  gl_FragColor = vec4(color, 1.0);
}