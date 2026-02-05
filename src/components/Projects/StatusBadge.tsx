import React from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '../../hooks/useOptimizedAnimations';
import { FaRocket, FaCog, FaLock } from 'react-icons/fa';

interface StatusBadgeProps {
  status: 'production' | 'development' | 'private';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const { shouldAnimate } = useOptimizedAnimations();
  
  const variants = {
    production: {
      bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
      icon: <FaRocket className="w-3 h-3" />,
      text: 'Producción',
      animate: { scale: [1, 1.05, 1] }
    },
    development: {
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-600', 
      icon: <FaCog className={shouldAnimate ? "w-3 h-3 animate-spin" : "w-3 h-3"} />,
      text: 'En desarrollo',
      animate: { opacity: [0.7, 1, 0.7] }
    },
    private: {
      bg: 'bg-gradient-to-r from-gray-500 to-slate-600',
      icon: <FaLock className="w-3 h-3" />,
      text: 'Código privado',
      animate: { rotate: [0, 180] }
    }
  };

  const config = variants[status] || variants.private;

  if (!shouldAnimate) {
    return (
      <div
        className={`
          ${config.bg} text-white px-3 py-1 rounded-full
          text-xs font-semibold flex items-center gap-1
          shadow-lg ${className}
        `}
      >
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
  }

  return (
    <motion.div
      animate={config.animate}
      transition={{ repeat: Infinity, duration: 2 }}
      className={`
        ${config.bg} text-white px-3 py-1 rounded-full
        text-xs font-semibold flex items-center gap-1
        shadow-lg ${className}
      `}
    >
      {config.icon}
      <span>{config.text}</span>
    </motion.div>
  );
};

export default StatusBadge;