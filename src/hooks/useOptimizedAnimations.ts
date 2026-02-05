import { useMemo } from 'react';
import type { Variants, Transition } from 'framer-motion';

export interface OptimizedAnimationConfig {
  container: Variants;
  item: Variants;
  transition: Transition;
  hover: {
    scale: number;
    y: number;
    rotate?: number;
  };
  tap: {
    scale: number;
  };
}

export const useOptimizedAnimations = () => {
  // Animaciones de alta performance fijas
  const animationConfig = useMemo((): OptimizedAnimationConfig => {
    return {
      container: {
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8, 
            ease: "easeOut",
            staggerChildren: 0.1
          }
        }
      },
      item: {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      },
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      },
      hover: {
        scale: 1.05,
        y: -4,
        rotate: 2
      },
      tap: {
        scale: 0.98
      }
    };
  }, []);

  const shouldAnimate = true;
  const performanceLevel = 'high' as const;

  const getScrollAnimationProps = useMemo(() => ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants: animationConfig.container
  }), [animationConfig]);

  const getStaggerChildrenProps = useMemo(() => ({
    variants: animationConfig.container
  }), [animationConfig]);

  const getChildAnimationProps = useMemo(() => ({
    variants: animationConfig.item
  }), [animationConfig]);

  const getHoverProps = useMemo(() => ({
    whileHover: animationConfig.hover,
    whileTap: animationConfig.tap,
    transition: { duration: 0.4 }
  }), [animationConfig]);

  return {
    animationConfig,
    shouldAnimate,
    performanceLevel,
    getScrollAnimationProps,
    getStaggerChildrenProps,
    getChildAnimationProps,
    getHoverProps
  };
};
