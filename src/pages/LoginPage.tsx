import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ShoppingBag, Chrome, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/store/useStore";
import authBg from "@/assets/auth-bg.jpg";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login, loginWithGoogle, loading } = useAuth();
  const { theme } = useStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    const ok = await login(email, password);
    if (ok) navigate("/");
  };

  return (
    <div className={cn("min-h-screen flex", isDark ? "bg-dark-800" : "bg-gray-50")}>
      {/* Left Panel — Desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/75 to-indigo-900/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-white" />
            <span className="text-2xl font-bold text-white">Nexa<span className="text-yellow-300">Shop</span></span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-3">
              India's Premier<br />Shopping Platform
            </h1>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Discover millions of products from top brands with guaranteed quality, fast delivery, and the best prices.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "50M+", label: "Products" },
                { value: "100M+", label: "Customers" },
                { value: "2M+", label: "Sellers" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/10 rounded p-3 text-center">
                  <p className="text-white font-bold text-xl">{value}</p>
                  <p className="text-blue-200 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-blue-300 text-xs">
            © 2025 NexaShop Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <ShoppingBag className="w-6 h-6 text-brand-500" />
            <span className="text-xl font-bold text-theme-primary">NexaShop</span>
          </div>

          <div className={cn("rounded-lg border p-6 md:p-8", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-200 shadow-card")}>
            <h2 className="text-xl font-bold text-theme-primary mb-1">Sign In</h2>
            <p className="text-theme-muted text-sm mb-5">Welcome back! Please sign in to continue.</p>

            {/* Google */}
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded border text-sm font-medium transition-colors mb-4",
                isDark ? "bg-dark-500 border-dark-400 text-gray-200 hover:bg-dark-400" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
            >
              <Chrome className="w-4 h-4 text-blue-500" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={cn("flex-1 h-px", isDark ? "bg-dark-400" : "bg-gray-200")} />
              <span className="text-theme-muted text-xs">or sign in with email</span>
              <div className={cn("flex-1 h-px", isDark ? "bg-dark-400" : "bg-gray-200")} />
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-theme-secondary mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="form-input pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-theme-secondary mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="form-input pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-brand-500" />
                  <span className="text-xs text-theme-muted">Remember me</span>
                </label>
                <a href="#" className="text-xs text-brand-500 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-flipkart py-3 rounded text-sm font-semibold flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className={cn("mt-4 p-3 rounded text-xs", isDark ? "bg-dark-500" : "bg-blue-50 border border-blue-100")}>
              <p className={cn("font-semibold mb-1", isDark ? "text-gray-300" : "text-blue-800")}>Demo Credentials</p>
              <p className={isDark ? "text-gray-400" : "text-blue-600"}>Email: demo@nexashop.com</p>
              <p className={isDark ? "text-gray-400" : "text-blue-600"}>Password: demo123</p>
            </div>

            <p className="text-center text-sm text-theme-muted mt-4">
              New to NexaShop?{" "}
              <Link to="/register" className="text-brand-500 font-semibold hover:underline">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
