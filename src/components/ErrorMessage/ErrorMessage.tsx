import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@telegram-apps/telegram-ui';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  retryButtonText?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  retryButtonText = 'Повторить',
  className = '' 
}) => {
  return (
    <motion.div
      className={`error-message-container ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="error-content">
        <ExclamationCircleIcon className="error-icon" />
        <span className="error-text">{message}</span>
      </div>
      
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          {retryButtonText}
        </button>
      )}
    </motion.div>
  );
}; 