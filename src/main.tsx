import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 15, 26, 0.95)",
            color: "#f1f1f5",
            border: "1px solid rgba(139, 69, 255, 0.3)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#a855f7", secondary: "#f1f1f5" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#f1f1f5" },
          },
          duration: 3000,
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
