import { useMemo } from 'react';

export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  stagger: number;
  scale: number;
  opacity: number;
  complexAnimations: boolean;
  particleCount: number;
  pixelRatio: number;
  reducedMotion: boolean;
}

export interface PerformanceSettings {
  level: 'high';
  animations: AnimationConfig;
  maxConcurrentAnimations: number;
}

// Valores fijos de alta performance - sin detección
const defaultSettings: PerformanceSettings = {
  level: 'high',
  animations: {
    enabled: true,
    duration: 0.8,
    stagger: 0.1,
    scale: 1.05,
    opacity: 0.8,
    complexAnimations: true,
    particleCount: 100,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    reducedMotion: typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  },
  maxConcurrentAnimations: 10
};

export const usePerformance = () => {
  const settings = useMemo(() => defaultSettings, []);

  const shouldAnimate = useMemo(() => {
    return settings.animations.enabled && !settings.animations.reducedMotion;
  }, [settings]);

  const getAnimationProps = useMemo(() => ({
    initial: { opacity: 0, y: shouldAnimate ? 20 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: settings.animations.duration,
      stagger: settings.animations.stagger,
      ease: "easeOut" as const
    }
  }), [shouldAnimate, settings]);

  const getHoverProps = useMemo(() => ({
    whileHover: shouldAnimate ? { scale: settings.animations.scale } : {},
    whileTap: shouldAnimate ? { scale: 0.98 } : {},
    transition: { duration: settings.animations.duration / 2 }
  }), [shouldAnimate, settings]);

  return {
    performanceLevel: 'high' as const,
    isLoading: false,
    settings,
    shouldAnimate,
    getAnimationProps,
    getHoverProps,
    isHighPerformance: true,
    isMediumPerformance: false,
    isLowPerformance: false,
    isSlowDevice: false,
    isMobile: false
  };
};
