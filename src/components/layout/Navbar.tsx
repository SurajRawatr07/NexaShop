import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart, Heart, Search, Menu, X, User, ChevronDown,
  Sun, Moon, MapPin, Package, LogOut, LayoutDashboard, Mic,
  Bell, Settings,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES, NAV_LINKS } from "@/data/products";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const {
    cartCount, wishlistItems, setCartOpen, setSearchOpen,
    mobileMenuOpen, setMobileMenuOpen, isAuthenticated, theme, toggleTheme,
  } = useStore();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const count = cartCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setCategoryMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
        setCategoryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* ===== MAIN NAVBAR ===== */}
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "shadow-nav" : "",
          isDark ? "bg-dark-800 border-b border-dark-600" : "bg-[#2874f0]"
        )}
      >
        {/* Top bar */}
        <div className="container-custom">
          <div className="flex items-center gap-2 md:gap-4 py-2.5">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex flex-col items-start">
              <span className={cn("text-xl font-bold leading-tight", isDark ? "text-white" : "text-white")}>
                Nexa<span className={isDark ? "text-brand-400" : "text-yellow-300"}>Shop</span>
              </span>
              <span className={cn("text-[9px] italic leading-none font-medium", isDark ? "text-gray-400" : "text-blue-100")}>
                Explore Plus
              </span>
            </Link>

            {/* Location - Desktop */}
            <button className={cn("hidden lg:flex items-center gap-1 text-xs flex-shrink-0", isDark ? "text-gray-300" : "text-white")}>
              <MapPin className="w-3 h-3" />
              <span className="font-medium">India ▾</span>
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className={cn(
                "flex items-center rounded overflow-hidden",
                isDark ? "bg-dark-500 border border-dark-400" : "bg-white"
              )}>
                <select className={cn(
                  "hidden md:block border-r px-2 py-2.5 text-xs font-medium outline-none flex-shrink-0",
                  isDark
                    ? "bg-dark-500 border-dark-400 text-gray-300"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                )}>
                  <option>All Categories</option>
                  {CATEGORIES.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="search-input flex-1 text-sm py-2.5"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className={cn("px-2.5 py-2.5 border-l", isDark ? "border-dark-400" : "border-gray-200")}
                >
                  <Mic className={cn("w-4 h-4", isDark ? "text-gray-400" : "text-gray-400")} />
                </button>
                <button
                  type="submit"
                  className={cn("px-4 py-2.5 font-semibold text-sm flex-shrink-0 transition-colors", isDark ? "bg-brand-600 hover:bg-brand-500 text-white" : "bg-[#2874f0] hover:bg-[#1a5fc8] text-white")}
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  "w-9 h-9 rounded flex items-center justify-center transition-colors",
                  isDark ? "text-gray-300 hover:text-white hover:bg-dark-500" : "text-white hover:bg-blue-600"
                )}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Search */}
              <button
                className={cn("md:hidden w-9 h-9 rounded flex items-center justify-center", isDark ? "text-gray-300" : "text-white")}
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-blue-600 transition-colors",
                      isDark ? "text-gray-200 hover:bg-dark-500" : "text-white"
                    )}
                  >
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                      alt="avatar"
                      className="w-7 h-7 rounded-full border border-white/30"
                    />
                    <span className="hidden lg:block text-sm font-medium max-w-[70px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", userMenuOpen && "rotate-180")} />
                  </button>

                  {userMenuOpen && (
                    <div className={cn(
                      "absolute right-0 top-full mt-1 w-48 rounded shadow-lg border py-1 z-50 animate-slide-down",
                      isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-200"
                    )}>
                      <div className={cn("px-3 py-2 border-b", isDark ? "border-dark-400" : "border-gray-100")}>
                        <p className="text-sm font-semibold text-theme-primary">{user?.name}</p>
                        <p className="text-xs text-theme-muted truncate">{user?.email}</p>
                      </div>
                      {[
                        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
                        { icon: Package, label: "My Orders", path: "/dashboard" },
                        { icon: Heart, label: "Wishlist", path: "/wishlist" },
                        { icon: Settings, label: "Settings", path: "/dashboard" },
                      ].map(({ icon: Icon, label, path }) => (
                        <Link
                          key={label}
                          to={path}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                            isDark ? "text-gray-300 hover:bg-dark-500" : "text-gray-700 hover:bg-gray-50"
                          )}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Icon className="w-3.5 h-3.5 text-brand-500" />
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className={cn(
                          "flex items-center gap-2.5 w-full px-3 py-2 text-sm border-t transition-colors",
                          isDark ? "text-red-400 hover:bg-dark-500 border-dark-400" : "text-red-600 hover:bg-red-50 border-gray-100"
                        )}
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-semibold transition-colors",
                    isDark ? "text-gray-200 hover:bg-dark-500" : "text-white hover:bg-blue-600"
                  )}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">Login</span>
                </Link>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-blue-600 transition-colors",
                  isDark ? "text-gray-300 hover:bg-dark-500 hover:text-white" : "text-white"
                )}
              >
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-[10px] font-medium">Wishlist</span>
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-blue-600 transition-colors",
                  isDark ? "text-gray-300 hover:bg-dark-500 hover:text-white" : "text-white"
                )}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-yellow-400 rounded-full text-[9px] text-gray-900 flex items-center justify-center font-bold">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-[10px] font-medium">Cart</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className={cn(
                  "md:hidden w-9 h-9 rounded flex items-center justify-center",
                  isDark ? "text-gray-300" : "text-white"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ===== CATEGORY BAR ===== */}
        <div className={cn(
          "hidden md:block border-t",
          isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-100"
        )}>
          <div className="container-custom">
            <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar">
              {/* All Categories dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap",
                    isDark ? "text-gray-200 hover:text-white hover:bg-dark-600" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Menu className="w-3.5 h-3.5" />
                  All Categories
                  <ChevronDown className={cn("w-3 h-3 transition-transform", categoryMenuOpen && "rotate-180")} />
                </button>

                {categoryMenuOpen && (
                  <div className={cn(
                    "absolute top-full left-0 w-64 shadow-lg border rounded-b z-50 animate-slide-down",
                    isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-200"
                  )}>
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                          isDark ? "text-gray-300 hover:bg-dark-500" : "text-gray-700 hover:bg-blue-50"
                        )}
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav Links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={cn(
                    "px-3 py-2.5 text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0",
                    location.pathname === link.path
                      ? isDark ? "text-brand-400 border-b-2 border-brand-400" : "text-brand-500 border-b-2 border-brand-500"
                      : isDark ? "text-gray-300 hover:text-white hover:bg-dark-600" : "text-gray-700 hover:text-brand-600 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex-1" />

              <div className="flex-shrink-0 px-3 py-2.5 text-xs text-orange-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse-dot" />
                Flash Sale Live
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE SIDEBAR ===== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-[80%] max-w-xs flex flex-col animate-slide-up overflow-y-auto",
            isDark ? "bg-dark-700 border-r border-dark-500" : "bg-white"
          )}>
            {/* Header */}
            <div className={cn("flex items-center justify-between px-4 py-3 border-b", isDark ? "bg-dark-800 border-dark-500" : "bg-[#2874f0]")}>
              <span className="text-white font-bold text-lg">NexaShop</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User */}
            {isAuthenticated && user ? (
              <div className={cn("flex items-center gap-3 px-4 py-3 border-b", isDark ? "border-dark-500" : "border-gray-100")}>
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="text-theme-primary font-semibold text-sm">{user.name}</p>
                  <p className="text-theme-muted text-xs">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className={cn("px-4 py-3 border-b", isDark ? "border-dark-500" : "border-gray-100")}>
                <div className="flex gap-2">
                  <Link to="/login" className="flex-1 btn-flipkart text-center py-2 rounded text-sm" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  <Link to="/register" className={cn("flex-1 text-center py-2 rounded text-sm border font-semibold", isDark ? "border-dark-400 text-gray-300" : "border-gray-300 text-gray-700")} onClick={() => setMobileMenuOpen(false)}>Register</Link>
                </div>
              </div>
            )}

            <div className="flex-1 py-2">
              <p className={cn("px-4 py-2 text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-500" : "text-gray-400")}>Navigation</p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium border-b transition-colors",
                    isDark ? "text-gray-300 border-dark-500 hover:bg-dark-600" : "text-gray-700 border-gray-50 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <p className={cn("px-4 py-2 mt-2 text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-500" : "text-gray-400")}>Shop by Category</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm border-b transition-colors",
                    isDark ? "text-gray-300 border-dark-500 hover:bg-dark-600" : "text-gray-700 border-gray-50 hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>

            {/* Theme toggle */}
            <div className={cn("px-4 py-3 border-t", isDark ? "border-dark-500" : "border-gray-100")}>
              <button
                onClick={toggleTheme}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2.5 rounded text-sm font-medium transition-colors",
                  isDark ? "text-gray-300 bg-dark-600 hover:bg-dark-500" : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                )}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
