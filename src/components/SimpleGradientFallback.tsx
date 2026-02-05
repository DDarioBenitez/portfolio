import React from 'react';

interface SimpleGradientFallbackProps {
  isDarkMode: boolean;
}

const SimpleGradientFallback: React.FC<SimpleGradientFallbackProps> = ({ isDarkMode }) => {
  return (
    <div 
      className="fixed inset-0"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      }}
    />
  );
};

export default SimpleGradientFallback;