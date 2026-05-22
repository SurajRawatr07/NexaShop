import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-800 px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <p className="text-[120px] md:text-[180px] font-black text-white/5 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-2">🛍️</p>
              <p className="text-white text-2xl font-bold">Page Not Found</p>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Looks like this page went out of stock! Let's get you back to shopping.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 group">
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-4 h-4" /> Go Home
            </span>
          </Link>
          <Link to="/shop" className="glass px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white flex items-center gap-2 transition-all">
            <Search className="w-4 h-4" /> Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
