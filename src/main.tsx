import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;

// Robust Prerender Detection:
// Confirms that #root contains genuine pre-rendered application markup (starts with MainLayout container)
// rather than empty whitespace, comment nodes, or third-party extension injection.
const isPrerendered = Boolean(
  container.firstElementChild &&
  container.firstElementChild.classList.contains('min-h-screen')
);

if (isPrerendered) {
  try {
    ReactDOM.hydrateRoot(
      container,
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      {
        onRecoverableError(error, errorInfo) {
          console.warn('React hydration recoverable warning:', error, errorInfo);
        }
      }
    );
  } catch (err) {
    console.error('Hydration failed unexpectedly, falling back to createRoot:', err);
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} else {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}


