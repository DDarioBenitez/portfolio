import { useState, useEffect } from 'react';

interface AdaptiveBackgroundProps {
  isDarkMode: boolean;
}

const AdaptiveBackground = ({ isDarkMode: propIsDarkMode }: AdaptiveBackgroundProps) => {
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
      className="fixed inset-0 -z-10"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 80%, #cbd5e1 100%)'
      }}
    />
  );
};

export default AdaptiveBackground;
