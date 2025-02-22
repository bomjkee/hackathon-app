import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import { EnvUnsupported } from './components/Error/EnvUspuported.tsx';
import { App } from './components/App.tsx';
import { init } from './init.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

  root.render(
    <StrictMode>
      <App/>
    </StrictMode>,
  );
} catch (e) {
  root.render(<EnvUnsupported/>);
}