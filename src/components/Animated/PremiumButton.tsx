import React from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '../../hooks/useOptimizedAnimations';

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const { getHoverProps, shouldAnimate } = useOptimizedAnimations();
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md',
    outline: 'border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 shadow-md'
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl px-6 py-3 font-semibold
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
      {...(shouldAnimate && !disabled ? getHoverProps : {})}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      {/* Efecto de shimmer al hover - solo en high/medium performance */}
      {shouldAnimate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={disabled ? undefined : { x: '100%' }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: 'left center' }}
        />
      )}
      
      {/* Contenido */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default PremiumButton;