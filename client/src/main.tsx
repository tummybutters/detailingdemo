import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./components/ui/theme-colors.css";
import "./components/ui/mapbox-geocoder.css";
import "./components/ui/3d-button.css";
import "./components/ui/custom-hero-button.css";
import "./components/ui/custom-nav-button.css";
import "./components/ui/service-3d-button.css";
import "./components/ui/3d-step-icon.css";
import { initEmailJS } from "./lib/emailService";

// Initialize EmailJS when the app starts
initEmailJS();

// Make environment variables available to the frontend
declare global {
  interface Window {
    env: {
      EMAILJS_SERVICE_ID: string;
      EMAILJS_TEMPLATE_ID: string;
      EMAILJS_PUBLIC_KEY: string;
    };
  }
}

// Initialize global env object with Vite environment variables (prefixed with VITE_)
window.env = {
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
};

// Mount the React application
createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for production environments
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
