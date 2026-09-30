import React from 'react';
import ReactDOM from 'react-dom/client';
import { BartrProvider } from './context/BartrContext';
import { AppContent } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BartrProvider>
      <AppContent />
    </BartrProvider>
  </React.StrictMode>
);
