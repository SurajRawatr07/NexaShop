import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4", isDark ? "bg-dark-800" : "bg-gray-50")}>
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-black text-gray-200 dark:text-dark-500 leading-none select-none mb-2">
          404
        </p>
        <p className="text-4xl mb-3">🛍️</p>
        <h1 className="text-xl font-bold text-theme-primary mb-2">Page Not Found</h1>
        <p className="text-theme-muted text-sm mb-6 max-w-xs mx-auto">
          Looks like this page went out of stock! Let's get you back to shopping.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link to="/" className="btn-flipkart px-6 py-2.5 rounded text-sm font-semibold flex items-center gap-1.5">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/shop" className={cn("px-6 py-2.5 rounded text-sm font-semibold border flex items-center gap-1.5 transition-colors", isDark ? "border-dark-400 text-gray-300 hover:bg-dark-600" : "border-gray-300 text-gray-700 hover:bg-gray-50")}>
            <Search className="w-4 h-4" /> Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
