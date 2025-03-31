import React, { useEffect } from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { FooterTabs } from './components/FooterTabs/FooterTabs';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { init as initApp } from './utils/sdkInit';
import routes from './api/routes';
import './App.css';


export const App: React.FC = () => {
  const lp = useLaunchParams();

  // Инициализируем приложение при монтировании компонента
  useEffect(() => {
    try {
      initApp();
    } catch (error) {
      console.error('Ошибка при инициализации приложения:', error);
    }
  }, []);

  return (
    <AppRoot
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <div className="app">
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} /> )}
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
          <FooterTabs />
        </div>
      </HashRouter>
    </AppRoot>
  );
};
