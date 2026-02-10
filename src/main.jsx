import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import SmoothScrollProvider from "./providers/SmoothScrollProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppRoutes />
      </SmoothScrollProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
