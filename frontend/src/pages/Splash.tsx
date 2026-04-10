import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay after 100%
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="splash-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="splash-content"
      >
        <div className="splash-logo-wrapper">
          <div className="splash-logo">
            <Database size={42} color="white" />
          </div>
          <div className="splash-glow"></div>
        </div>
        
        <h1 className="splash-title">
          Stack<span>It</span>
        </h1>
        
        <div className="splash-loader-container">
          <div className="splash-loader-bar">
            <motion.div 
              className="splash-loader-progress"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="splash-loader-text">POWERING YOUR STACK...</p>
        </div>
      </motion.div>
    </div>
  );
};
