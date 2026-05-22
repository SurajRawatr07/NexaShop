import React, { useState } from "react";
import { User, Package, Heart, Bell, MapPin, Settings, LogOut, ChevronRight, Star, Truck, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const MOCK_ORDERS = [
  { id: "NX87654321", product: "iPhone 16 Pro Max", image: "https://images.unsplash.com/photo-1697462059929-60f51e2b9e86?w=100&h=100&fit=crop", price: 134900, status: "Delivered", date: "12 Jan 2025" },
  { id: "NX12345678", product: "Sony WH-1000XM5", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop", price: 24990, status: "In Transit", date: "20 Jan 2025" },
  { id: "NX99887766", product: "Nike Air Jordan 1", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", price: 12995, status: "Processing", date: "22 Jan 2025" },
];

export default function DashboardPage() {
  const [tab, setTab] = useState("profile");
  const { user, logout } = useAuth();
  const { wishlistItems, cartItems } = useStore();
  const navigate = useNavigate();

  const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const statusColor: Record<string, string> = {
    Delivered: "text-green-400 bg-green-400/10",
    "In Transit": "text-blue-400 bg-blue-400/10",
    Processing: "text-amber-400 bg-amber-400/10",
    Cancelled: "text-red-400 bg-red-400/10",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-3">
            {/* Profile Card */}
            <div className="glass rounded-2xl p-5 text-center">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt="avatar"
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h3 className="text-white font-bold">{user?.name}</h3>
              <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-white/10">
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{MOCK_ORDERS.length}</p>
                  <p className="text-gray-400 text-xs">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{wishlistItems.length}</p>
                  <p className="text-gray-400 text-xs">Wishlist</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="glass rounded-2xl p-2">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === id ? "bg-brand-500/15 text-brand-400 border border-brand-500/30" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {tab === id && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-1 border-t border-white/10 pt-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === "profile" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6">My Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: user?.name },
                    { label: "Email", value: user?.email },
                    { label: "Phone", value: user?.phone || "+91 98765 43210" },
                    { label: "Member Since", value: "January 2025" },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass rounded-xl p-4">
                      <p className="text-gray-400 text-xs mb-1">{label}</p>
                      <p className="text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {[
                    { icon: Package, label: "Total Orders", value: MOCK_ORDERS.length },
                    { icon: Heart, label: "Wishlist", value: wishlistItems.length },
                    { icon: Star, label: "Reviews", value: 7 },
                    { icon: CheckCircle, label: "Delivered", value: 2 },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="glass rounded-xl p-4 text-center">
                      <Icon className="w-6 h-6 text-brand-400 mx-auto mb-2" />
                      <p className="text-white font-bold text-xl">{value}</p>
                      <p className="text-gray-400 text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6">My Orders</h2>
                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-brand-500/30 transition-all">
                      <img src={order.image} alt={order.product} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{order.product}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Order #{order.id}</p>
                        <p className="text-gray-400 text-xs">{order.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[order.status] || ""}`}>
                          {order.status}
                        </span>
                        <p className="text-white font-bold mt-2 text-sm">{formatPrice(order.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6">My Wishlist ({wishlistItems.length})</h2>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No items in wishlist</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="glass rounded-xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-28 object-cover" />
                        <div className="p-3">
                          <p className="text-white text-xs font-medium line-clamp-2">{item.name}</p>
                          <p className="text-brand-400 font-bold mt-1">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6">Saved Addresses</h2>
                {(user?.addresses || []).map((addr) => (
                  <div key={addr.id} className="glass rounded-xl p-4 mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${addr.isDefault ? "bg-brand-500/20 text-brand-400" : "bg-white/10 text-gray-400"}`}>{addr.label}</span>
                        <p className="text-white mt-2 font-medium">{addr.street}</p>
                        <p className="text-gray-400 text-sm">{addr.city}, {addr.state} - {addr.zip}</p>
                      </div>
                      {addr.isDefault && <span className="text-green-400 text-xs">Default</span>}
                    </div>
                  </div>
                ))}
                <button className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold mt-2 relative z-10">+ Add New Address</button>
              </div>
            )}

            {tab === "settings" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6">Account Settings</h2>
                <div className="space-y-3">
                  {[
                    { label: "Email Notifications", desc: "Receive order updates via email" },
                    { label: "SMS Alerts", desc: "Receive delivery alerts via SMS" },
                    { label: "Push Notifications", desc: "Browser push notifications" },
                    { label: "Personalized Recommendations", desc: "AI-powered product suggestions" },
                    { label: "Dark Mode", desc: "Always use dark theme" },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-medium">{s.label}</p>
                        <p className="text-gray-400 text-xs">{s.desc}</p>
                      </div>
                      <div className="w-11 h-6 bg-brand-500 rounded-full relative cursor-pointer">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
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
