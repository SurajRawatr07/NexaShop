import React, { useState } from "react";
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight, Star, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  { id: "NX87654321", product: "iPhone 16 Pro Max", image: "https://images.unsplash.com/photo-1697462059929-60f51e2b9e86?w=100&h=100&fit=crop", price: 134900, status: "Delivered", date: "12 Jan 2025" },
  { id: "NX12345678", product: "Sony WH-1000XM5", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop", price: 24990, status: "In Transit", date: "20 Jan 2025" },
  { id: "NX99887766", product: "Nike Air Jordan 1", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", price: 12995, status: "Processing", date: "22 Jan 2025" },
];

export default function DashboardPage() {
  const [tab, setTab] = useState("profile");
  const { user, logout } = useAuth();
  const { wishlistItems, theme } = useStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const statusConfig: Record<string, { color: string; bg: string }> = {
    Delivered: { color: "text-green-700", bg: "bg-green-50" },
    "In Transit": { color: "text-blue-700", bg: "bg-blue-50" },
    Processing: { color: "text-amber-700", bg: "bg-amber-50" },
    Cancelled: { color: "text-red-700", bg: "bg-red-50" },
  };

  if (isDark) {
    Object.assign(statusConfig, {
      Delivered: { color: "text-green-400", bg: "bg-green-900/20" },
      "In Transit": { color: "text-blue-400", bg: "bg-blue-900/20" },
      Processing: { color: "text-amber-400", bg: "bg-amber-900/20" },
      Cancelled: { color: "text-red-400", bg: "bg-red-900/20" },
    });
  }

  const cardClass = cn("rounded border p-4", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card");

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="space-y-3">
            {/* Profile Card */}
            <div className={cn(cardClass, "text-center")}>
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                alt="avatar"
                className="w-14 h-14 rounded-full mx-auto mb-2"
              />
              <h3 className="text-theme-primary font-bold text-sm">{user?.name}</h3>
              <p className="text-theme-muted text-xs truncate">{user?.email}</p>
              <div className={cn("flex justify-center gap-4 mt-3 pt-3 border-t", isDark ? "border-dark-400" : "border-gray-100")}>
                <div className="text-center">
                  <p className="text-theme-primary font-bold">{MOCK_ORDERS.length}</p>
                  <p className="text-theme-muted text-xs">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-theme-primary font-bold">{wishlistItems.length}</p>
                  <p className="text-theme-muted text-xs">Wishlist</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className={cn("rounded border overflow-hidden", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-4 py-3 text-xs font-medium transition-colors border-b",
                    isDark ? "border-dark-500" : "border-gray-50",
                    tab === id
                      ? isDark ? "bg-brand-900/30 text-brand-400" : "bg-blue-50 text-brand-500"
                      : isDark ? "text-gray-300 hover:bg-dark-500" : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {tab === id && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
              ))}
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className={cn("w-full flex items-center gap-2.5 px-4 py-3 text-xs font-medium transition-colors text-red-500", isDark ? "hover:bg-dark-500" : "hover:bg-red-50")}
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === "profile" && (
              <div className={cardClass}>
                <h2 className="text-theme-primary font-bold text-base mb-4">My Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Full Name", value: user?.name },
                    { label: "Email", value: user?.email },
                    { label: "Phone", value: user?.phone || "+91 98765 43210" },
                    { label: "Member Since", value: "January 2025" },
                  ].map(({ label, value }) => (
                    <div key={label} className={cn("rounded p-3 border", isDark ? "border-dark-400 bg-dark-500" : "border-gray-100 bg-gray-50")}>
                      <p className="text-theme-muted text-[10px] mb-0.5">{label}</p>
                      <p className="text-theme-primary font-medium text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Package, label: "Orders", value: MOCK_ORDERS.length },
                    { icon: Heart, label: "Wishlist", value: wishlistItems.length },
                    { icon: Star, label: "Reviews", value: 7 },
                    { icon: CheckCircle, label: "Delivered", value: 2 },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className={cn("rounded p-3 border text-center", isDark ? "border-dark-400 bg-dark-500" : "border-gray-100 bg-gray-50")}>
                      <Icon className="w-5 h-5 text-brand-500 mx-auto mb-1" />
                      <p className="text-theme-primary font-bold text-lg">{value}</p>
                      <p className="text-theme-muted text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className={cardClass}>
                <h2 className="text-theme-primary font-bold text-base mb-4">My Orders</h2>
                <div className="space-y-3">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className={cn("flex items-center gap-3 p-3 rounded border transition-all", isDark ? "border-dark-400 hover:border-dark-300" : "border-gray-100 hover:border-gray-200")}>
                      <img src={order.image} alt={order.product} className="w-14 h-14 object-contain rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-theme-primary font-medium text-sm line-clamp-1">{order.product}</p>
                        <p className="text-theme-muted text-xs">Order #{order.id}</p>
                        <p className="text-theme-muted text-xs">{order.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded", statusConfig[order.status]?.bg, statusConfig[order.status]?.color)}>
                          {order.status}
                        </span>
                        <p className="text-theme-primary font-bold text-sm mt-1">{formatPrice(order.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div className={cardClass}>
                <h2 className="text-theme-primary font-bold text-base mb-4">Wishlist ({wishlistItems.length})</h2>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-10 h-10 text-theme-muted mx-auto mb-2" />
                    <p className="text-theme-muted text-sm">No items in wishlist</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className={cn("rounded border overflow-hidden", isDark ? "border-dark-400" : "border-gray-100")}>
                        <div className={cn("aspect-square p-2", isDark ? "bg-dark-500" : "bg-gray-50")}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="p-2.5">
                          <p className="text-theme-primary text-xs font-medium line-clamp-2">{item.name}</p>
                          <p className="text-brand-500 font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className={cardClass}>
                <h2 className="text-theme-primary font-bold text-base mb-4">Saved Addresses</h2>
                <div className={cn("rounded border p-3 mb-3", isDark ? "border-dark-400 bg-dark-500" : "border-gray-100 bg-gray-50")}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-600">Home</span>
                    <span className="text-green-600 text-xs">Default</span>
                  </div>
                  <p className="text-theme-primary text-sm font-medium">123, MG Road, Koramangala</p>
                  <p className="text-theme-muted text-xs">Bangalore, Karnataka - 560001</p>
                </div>
                <button className="btn-flipkart px-4 py-2 rounded text-sm font-semibold">+ Add New Address</button>
              </div>
            )}

            {tab === "settings" && (
              <div className={cardClass}>
                <h2 className="text-theme-primary font-bold text-base mb-4">Account Settings</h2>
                <div className="space-y-2">
                  {[
                    { label: "Email Notifications", desc: "Receive order updates via email" },
                    { label: "SMS Alerts", desc: "Delivery alerts via SMS" },
                    { label: "Push Notifications", desc: "Browser notifications" },
                    { label: "Personalized Deals", desc: "AI-powered recommendations" },
                  ].map((s, i) => (
                    <div key={s.label} className={cn("flex items-center justify-between p-3 rounded border", isDark ? "border-dark-400" : "border-gray-100")}>
                      <div>
                        <p className="text-theme-primary text-sm font-medium">{s.label}</p>
                        <p className="text-theme-muted text-xs">{s.desc}</p>
                      </div>
                      <div className={cn("w-10 h-5 rounded-full relative cursor-pointer transition-colors", i % 2 === 0 ? "bg-brand-500" : isDark ? "bg-dark-400" : "bg-gray-200")}>
                        <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all", i % 2 === 0 ? "right-0.5" : "left-0.5")} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
