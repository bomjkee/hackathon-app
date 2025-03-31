import React from 'react';
import { Spinner } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import './LoaderScreen.css';

interface LoaderScreenProps {
  message?: string;
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ 
  message = 'Загрузка...' 
}) => {
  return (
    <motion.div 
      className="loader-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loader-content">
        <Spinner size="l" />
        <motion.p 
          className="loader-message"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}; 