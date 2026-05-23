import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

// Apply saved theme before render
const savedStore = localStorage.getItem("nexashop-store");
if (savedStore) {
  try {
    const parsed = JSON.parse(savedStore);
    if (parsed?.state?.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch {}
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          },
          success: {
            iconTheme: { primary: "#2874f0", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
          },
          duration: 2000,
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
