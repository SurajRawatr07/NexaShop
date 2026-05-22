import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart, Heart, Search, Menu, X, User, Bell, MapPin,
  ChevronDown, Zap, Package, LogOut, Settings, LayoutDashboard,
  Mic, TrendingUp,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/context/AuthContext";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { CATEGORIES, NAV_LINKS } from "@/data/products";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { cartCount, wishlistItems, setCartOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen, isAuthenticated } = useStore();
  const { user, logout } = useAuth();
  const { scrollDir, scrollY } = useScrollDirection();
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const count = cartCount();

  const isScrolled = scrollY > 50;
  const isHidden = scrollDir === "down" && scrollY > 150;

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaMenu(null);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-dark shadow-2xl shadow-black/50" : "bg-gradient-to-b from-dark-800/95 to-transparent",
          isHidden && "-translate-y-full"
        )}
      >
        {/* Top Bar */}
        <div className="border-b border-white/5">
          <div className="container-custom flex items-center justify-between py-1.5">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3 h-3 text-brand-400" />
              <span>Deliver to </span>
              <span className="text-white font-medium">India ▾</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs text-gray-400">
              <span className="text-green-400 font-medium animate-pulse">● Live</span>
              <span>Free delivery on orders over ₹499</span>
              <span>|</span>
              <Link to="/deals" className="hover:text-brand-400 transition-colors">Today's Deals</Link>
              <span>|</span>
              <Link to="/dashboard" className="hover:text-brand-400 transition-colors">Sell on NexaShop</Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container-custom py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center glow-purple">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-grotesk">
                <span className="text-gradient">Nexa</span>
                <span className="text-white">Shop</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="flex w-full glass rounded-xl overflow-hidden border border-white/10 focus-within:border-brand-500/60 focus-within:shadow-[0_0_0_3px_rgba(139,69,255,0.15)] transition-all duration-300">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                />
                <button
                  type="button"
                  className="px-3 text-gray-400 hover:text-brand-400 transition-colors"
                  onClick={() => setSearchOpen(true)}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="px-5 bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:from-brand-500 hover:to-indigo-500 transition-all duration-200"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2 ml-auto">
              {/* Search Mobile */}
              <button
                className="md:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-all"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Notifications */}
              <button className="hidden md:flex w-10 h-10 glass rounded-xl items-center justify-center text-gray-300 hover:text-white relative transition-all group">
                <Bell className="w-4 h-4 group-hover:text-brand-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-300 hover:text-pink-400 relative transition-all group"
              >
                <Heart className="w-4 h-4 group-hover:fill-pink-400 transition-all" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-300 hover:text-brand-400 relative transition-all group"
              >
                <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-bounce">
                    {count}
                  </span>
                )}
              </button>

              {/* User */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 glass rounded-xl px-2 py-1.5 hover:border-brand-500/40 transition-all"
                  >
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                      alt="avatar"
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="hidden lg:block text-sm text-white font-medium max-w-[80px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className={cn("w-3 h-3 text-gray-400 transition-transform", userMenuOpen && "rotate-180")} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 glass-dark rounded-2xl border border-white/10 py-2 shadow-2xl animate-slide-down z-50">
                      <div className="px-4 py-2 border-b border-white/10 mb-1">
                        <p className="text-white font-semibold text-sm">{user?.name}</p>
                        <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                      </div>
                      {[
                        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
                        { icon: Package, label: "My Orders", path: "/dashboard?tab=orders" },
                        { icon: Heart, label: "Wishlist", path: "/wishlist" },
                        { icon: Settings, label: "Settings", path: "/dashboard?tab=settings" },
                      ].map(({ icon: Icon, label, path }) => (
                        <Link
                          key={label}
                          to={path}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4 text-brand-400" />
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors text-sm border-t border-white/10 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 btn-primary px-3 py-2 text-sm rounded-xl"
                >
                  <User className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 hidden sm:block">Sign In</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Category Nav - Desktop */}
          <div className="hidden md:flex items-center gap-1 mt-2 pt-2 border-t border-white/5">
            <button
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setMegaMenu(megaMenu ? null : "all")}
            >
              <Menu className="w-4 h-4" />
              <span>All</span>
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-lg transition-all nav-link",
                  location.pathname === link.path ? "text-brand-400 bg-brand-500/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-1 ml-auto text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span className="hidden lg:block">Flash Sale ends in 3h 42m</span>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {megaMenu && (
          <div className="absolute top-full left-0 right-0 glass-dark border-t border-white/10 shadow-2xl animate-slide-down">
            <div className="container-custom py-6">
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all group"
                    onClick={() => setMegaMenu(null)}
                  >
                    <div
                      className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110", `bg-gradient-to-br ${cat.gradient}/20`)}
                      style={{ background: `${cat.color}15` }}
                    >
                      {cat.icon}
                    </div>
                    <span className="text-xs text-gray-300 group-hover:text-white text-center transition-colors">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm glass-dark border-r border-white/10 flex flex-col animate-slide-up overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-lg font-bold font-grotesk text-gradient">NexaShop</span>
              <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 glass rounded-lg flex items-center justify-center">
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <img src={user.avatar || ""} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
              </div>
            )}
            <div className="flex-1 p-4 space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">Navigation</p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-4 mb-2 px-2">Categories</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
            {!isAuthenticated && (
              <div className="p-4 border-t border-white/10 flex gap-2">
                <Link to="/login" className="flex-1 btn-primary text-center py-2.5 rounded-xl text-sm font-semibold relative z-10">Sign In</Link>
                <Link to="/register" className="flex-1 glass text-center py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
