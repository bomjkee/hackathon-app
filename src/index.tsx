import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import { EnvUnsupported } from './components/EnvUspuported.tsx';
import { App } from './App';
import { init as initTelegram } from './utils/sdkInit';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  // Configure all application dependencies.
  initTelegram(import.meta.env.DEV);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
} catch (e) {
  root.render(<EnvUnsupported />);
}