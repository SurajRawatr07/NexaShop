import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-dark-800 flex flex-col">
      <Navbar />
      <main className="flex-1 mobile-pb">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
