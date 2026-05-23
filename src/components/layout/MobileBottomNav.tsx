import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const { cartCount, wishlistItems, setCartOpen, setSearchOpen, isAuthenticated, theme } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const count = cartCount();
  const isDark = theme === "dark";

  const tabs = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", action: () => setSearchOpen(true) },
    { icon: ShoppingCart, label: "Cart", action: () => setCartOpen(true), badge: count },
    { icon: Heart, label: "Wishlist", path: "/wishlist", badge: wishlistItems.length },
    { icon: User, label: "Profile", path: isAuthenticated ? "/dashboard" : "/login" },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-40 md:hidden border-t",
      isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-200"
    )}>
      <div className="flex items-stretch">
        {tabs.map(({ icon: Icon, label, path, action, badge }) => {
          const isActive = path && location.pathname === path;
          return (
            <button
              key={label}
              onClick={action || (() => path && navigate(path))}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 px-1 transition-colors relative min-h-[56px]",
                isActive
                  ? isDark ? "text-brand-400" : "text-brand-500"
                  : isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {isActive && (
                <span className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-b",
                  isDark ? "bg-brand-400" : "bg-brand-500"
                )} />
              )}
              <div className="relative">
                <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
