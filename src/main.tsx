import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Hash routes other than the homepage need their own client render.
const hashPath = window.location.hash.slice(1).split('?')[0];
if (root.dataset.prerendered === 'home' && (!hashPath || hashPath === '/')) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
