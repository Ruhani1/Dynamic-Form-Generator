import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Correct path if App.tsx is in src folder.

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
