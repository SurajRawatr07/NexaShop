import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const { cartCount, wishlistItems, setCartOpen, setSearchOpen, isAuthenticated } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const count = cartCount();

  const tabs = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", action: () => setSearchOpen(true) },
    { icon: ShoppingCart, label: "Cart", action: () => setCartOpen(true), badge: count },
    { icon: Heart, label: "Wishlist", path: "/wishlist", badge: wishlistItems.length },
    { icon: User, label: "Profile", path: isAuthenticated ? "/dashboard" : "/login" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-dark border-t border-white/10 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map(({ icon: Icon, label, path, action, badge }) => {
          const isActive = path && location.pathname === path;
          return (
            <button
              key={label}
              onClick={action || (() => path && navigate(path))}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative",
                isActive ? "text-brand-400" : "text-gray-500 hover:text-gray-300"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-brand-500/10 rounded-xl" />
              )}
              <div className="relative">
                <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-brand-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span className={cn("text-[10px] font-medium", isActive && "text-brand-400")}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
