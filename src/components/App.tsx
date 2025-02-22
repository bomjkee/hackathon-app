import { useLaunchParams, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { routes } from '../api/navigation';
import { FooterTabs } from './FooterTabs/FooterTabs';


export const App = () => {
  const lp = useLaunchParams();
  

  return (
    <AppRoot
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
        <FooterTabs />
      </HashRouter>
    </AppRoot>
  );
}
