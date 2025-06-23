import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style.scss";
import App from "./App";
import "./i18n"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
