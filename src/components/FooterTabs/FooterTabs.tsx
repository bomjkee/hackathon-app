import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';
import './FooterTabs.css';

const tabs = [
  { path: '/hackathons', icon: HomeIcon, label: 'Хакатоны' },
  { path: '/teams', icon: UserGroupIcon, label: 'Команды' },
  { path: '/profile', icon: UserIcon, label: 'Профиль' },
];

export const FooterTabs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Не показываем футер на стартовой странице и на странице регистрации
  if (currentPath === '/' || currentPath === '/registration') {
    return null;
  }

  return (
    <motion.div 
      className="footer-tabs"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8
      }}
    >
      <div className="tabs-container">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path || currentPath.startsWith(tab.path);
            
          // Специальная проверка для хакатонов
          const isHackathonTab = tab.path === '/hackathons' && 
            (currentPath === '/hackathons' || currentPath.startsWith('/hackathons/'));
            
          return (
            <Link 
              key={tab.path} 
              to={tab.path}
              className={`tab ${isActive || isHackathonTab ? 'active' : ''}`}
            >
              <tab.icon className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
              {(isActive || isHackathonTab) && (
                <motion.div
                  className="active-indicator"
                  layoutId="active-indicator"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}; 