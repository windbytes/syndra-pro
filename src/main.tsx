import 'antd/dist/reset.css';
import '@/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { bootstrap } from '@/app/bootstrap';
import { AppProvider } from '@/app/providers/AppProvider';
import App from './App';

const container = document.getElementById('root');

if (container) {
  void bootstrap().then(() => {
    createRoot(container).render(
      <StrictMode>
        <AppProvider>
          <App />
        </AppProvider>
      </StrictMode>
    );
  });
} else {
  console.error('Root element not found');
}
