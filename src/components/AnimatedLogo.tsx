
import React, { useState, useEffect } from 'react';

export const AnimatedLogo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
      setTimeout(() => setIsAnimating(prev => !prev), 500);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 w-12 cursor-pointer" onClick={() => setIsAnimating(prev => !prev)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`audio-wave flex items-end h-8 ${isAnimating ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          className={`h-10 w-10 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedLogo;
