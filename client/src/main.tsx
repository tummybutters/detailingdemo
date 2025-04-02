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
