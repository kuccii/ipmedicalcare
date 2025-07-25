import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { inject } from '@vercel/analytics';
import ReactGA from 'react-ga4';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
    <App />
    </HelmetProvider>
  </StrictMode>
);

// Initialize Vercel Analytics
inject();

// Initialize Google Analytics 4 (replace with your actual Measurement ID)
ReactGA.initialize('G-XXXXXXXXXX');
