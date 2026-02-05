import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: 'es' | 'en';
  onToggle: (lang: 'es' | 'en') => void;
  isDarkMode: boolean;
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle, isDarkMode, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const handleSelect = (lang: 'es' | 'en') => {
    onToggle(lang);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          transition-all duration-200 font-medium text-sm
          ${isDarkMode 
            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
            : '!bg-white hover:!bg-gray-50 !text-gray-700 !border-gray-200'
          }
        `}

        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currentLang.toUpperCase()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`
                absolute top-full mt-2 right-0 min-w-[140px] rounded-lg shadow-lg
                border overflow-hidden z-20
                ${isDarkMode 
                  ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' 
                  : 'bg-white border-gray-200 shadow-gray-900/10'
                }
              `}
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code as 'es' | 'en')}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left
                    transition-colors duration-150 text-sm font-medium
                    ${currentLang === lang.code 
                      ? (isDarkMode 
                        ? 'bg-slate-700 text-white' 
                        : 'bg-gray-100 text-gray-900')
                      : (isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-700' 
                        : 'text-gray-700 hover:bg-gray-50')
                    }
                  `}

                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <div className={currentLang === lang.code ? 'font-semibold' : ''}>
                      {lang.name}
                    </div>
                    <div className="text-xs opacity-60">{lang.code.toUpperCase()}</div>
                  </div>
                  {currentLang === lang.code && (
                    <motion.div
                      layoutId="activeLanguage"
                      className="w-2 h-2 rounded-full bg-blue-500 ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;