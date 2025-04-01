import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./components/ui/theme-colors.css";
import "./components/ui/mapbox-geocoder.css";
import "./components/ui/3d-button.css";
import "./components/ui/custom-hero-button.css";
import "./components/ui/custom-nav-button.css";
import "./components/ui/service-3d-button.css";

createRoot(document.getElementById("root")!).render(<App />);
