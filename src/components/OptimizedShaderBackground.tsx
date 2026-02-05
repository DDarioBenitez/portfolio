import { useState, useEffect } from 'react';

interface OptimizedShaderBackgroundProps {
  isDarkMode: boolean;
}

const OptimizedShaderBackground: React.FC<OptimizedShaderBackgroundProps> = ({ 
  isDarkMode: propIsDarkMode 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(propIsDarkMode);

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

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 80%, #cbd5e1 100%)',
        zIndex: -1
      }}
    />
  );
};

export default OptimizedShaderBackground;
