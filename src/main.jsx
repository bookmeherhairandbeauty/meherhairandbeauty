import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "./index.css";
import App from "./App";
const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
// Only the homepage is prerendered. Other hash routes render directly on refresh.
if (root.dataset.prerendered && (!location.hash || location.hash === "#/"))
  hydrateRoot(root, app);
else createRoot(root).render(app);
