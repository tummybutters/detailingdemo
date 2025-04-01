import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";
import "./components/ui/theme-colors.css";

// Initialize global Mapbox search after load
const MapboxSearchInitializer = () => {
  useEffect(() => {
    const searchScript = document.getElementById('search-js');
    if (searchScript) {
      searchScript.addEventListener('load', () => {
        // @ts-ignore - mapboxsearch is loaded via external script
        if (window.mapboxsearch) {
          // @ts-ignore
          window.mapboxsearch.config.accessToken = 'pk.eyJ1IjoidGJ1dGNoZXIzIiwiYSI6ImNtOHhpOW81YTA0OHYycnEwNnM4MWphZDgifQ.VSLkTQ3yEJBUTqC14kAkcQ';
          
          // Initialize the global autofill feature (optional, we also handle in component)
          // @ts-ignore
          window.mapboxsearch.autofill({
            options: {
              country: 'us',
              language: 'en'
            }
          });
        }
      });
    }
  }, []);
  
  return null;
};

// Create app with initializer
const AppWithMapbox = () => (
  <>
    <MapboxSearchInitializer />
    <App />
  </>
);

createRoot(document.getElementById("root")!).render(<AppWithMapbox />);
