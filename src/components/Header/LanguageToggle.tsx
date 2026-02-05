import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  currentLang: 'es' | 'en';
  onToggle: (lang: 'es' | 'en') => void;
  isDarkMode: boolean;
  className?: string;
  id?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle, isDarkMode, className = '', id = '' }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onToggle(currentLang === 'es' ? 'en' : 'es');
      setIsAnimating(false);
    }, 150);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={handleToggle}
        id={id}
        className={`
          relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300
          ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}
        `}
      >
        {/* Slider animado */}
        <motion.div
          className={`
            absolute top-1 w-6 h-6 rounded-full shadow-lg transition-colors duration-300
            ${isDarkMode ? 'bg-white' : 'bg-slate-800'}
          `}
          animate={{ x: currentLang === 'en' ? 32 : 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
      </motion.button>

      {/* Labels animados */}
      <motion.div
        className="absolute -top-6 left-0 text-xs font-bold"
        animate={{ 
          opacity: currentLang === 'es' ? 1 : 0.5,
          scale: currentLang === 'es' ? 1 : 0.9
        }}
        transition={{ duration: 0.2 }}
      >
        ES
      </motion.div>
      <motion.div
        className="absolute -top-6 right-0 text-xs font-bold"
        animate={{ 
          opacity: currentLang === 'en' ? 1 : 0.5,
          scale: currentLang === 'en' ? 1 : 0.9
        }}
        transition={{ duration: 0.2 }}
      >
        EN
      </motion.div>
    </motion.div>
  );
};

export default LanguageToggle;