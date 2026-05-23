import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import { useStore } from "@/store/useStore";

export default function MainLayout() {
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-theme-secondary flex flex-col">
      <Navbar />
      <main className="flex-1 mobile-pb">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
