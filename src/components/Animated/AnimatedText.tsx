import React from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '../../hooks/useOptimizedAnimations';

// AnimatedCounter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2, 
  suffix = '+', 
  className = '' 
}) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * value);
      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }, [value, duration]);

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
};

// AnimatedText Component
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '', 
  delay = 0, 
  stagger = 0.03 
}) => {
  const { shouldAnimate, animationConfig } = useOptimizedAnimations();
  const words = text.split(' ');

  const duration = animationConfig.transition.duration || 0.5;
  const ease = animationConfig.transition.ease || 'easeOut';
  const staggerChildren = animationConfig.transition.staggerChildren || stagger;

  // For very low performance, just show static text
  if (!shouldAnimate) {
    return <div className={className}>{text}</div>;
  }

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay + wordIndex * staggerChildren, 
            duration,
            ease
          }}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: delay + wordIndex * staggerChildren + charIndex * 0.01, 
                duration: Math.max(duration * 0.5, 0.2),
                ease
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

// AnimatedContainer Component
interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { shouldAnimate, getScrollAnimationProps } = useOptimizedAnimations();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      {...getScrollAnimationProps}
      transition={{ 
        duration: 0.8, 
        ease: 'easeOut',
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

// Default export
export default AnimatedCounter;