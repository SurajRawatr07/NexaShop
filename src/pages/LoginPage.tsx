import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Zap, ArrowRight, Chrome, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import authBg from "@/assets/auth-bg.jpg";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@nexashop.com");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Fill in all fields"); return; }
    const ok = await login(email, password);
    if (ok) { toast.success("Welcome back! 🎉"); navigate("/"); }
  };

  const handleGoogle = async () => {
    const ok = await loginWithGoogle();
    if (ok) { toast.success("Signed in with Google!"); navigate("/"); }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-brand-900/60 to-dark-800/80" />
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none transition-all duration-500"
          style={{
            background: "radial-gradient(circle, #a855f7, #4f46e5)",
            left: `${mousePos.x * 0.4}%`,
            top: `${mousePos.y * 0.4}%`,
            transform: "translate(-50%,-50%)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center glow-purple">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black font-grotesk">
              <span className="text-gradient">Nexa</span>
              <span className="text-white">Shop</span>
            </span>
          </Link>

          <div>
            <h1 className="text-5xl font-black font-grotesk text-white leading-tight mb-4">
              Shop the
              <br />
              <span className="text-gradient">Future.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Join millions of smart shoppers discovering premium products at unbeatable prices with lightning-fast delivery.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "50M+", label: "Products" },
                { value: "99%", label: "Satisfaction" },
                { value: "2-Day", label: "Delivery" },
              ].map(({ value, label }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <p className="text-white font-black text-2xl">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["?seed=1", "?seed=2", "?seed=3", "?seed=4"].map((s, i) => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg${s}`}
                  className="w-8 h-8 rounded-full border-2 border-dark-800 bg-dark-600"
                  alt=""
                />
              ))}
            </div>
            <p className="text-gray-300 text-sm">
              <span className="text-white font-semibold">100M+ customers</span> trust NexaShop
            </p>
          </div>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-dark-800 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-indigo-900/10" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-grotesk text-gradient">NexaShop</span>
          </Link>

          <div className="glass rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black font-grotesk text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to your NexaShop account</p>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full glass rounded-xl px-4 py-3.5 flex items-center justify-center gap-3 hover:bg-white/5 transition-all mb-4 border border-white/10 hover:border-white/20 group"
            >
              <Chrome className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold text-sm">Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-xs">or continue with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-glass w-full pl-11 border border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-glass w-full pl-11 pr-12 border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 accent-brand-500"
                  />
                  <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-brand-400 text-sm hover:text-brand-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group mt-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                  Sign up free
                </Link>
              </p>
            </div>

            <div className="mt-4 p-3 glass rounded-xl text-center border border-brand-500/20">
              <p className="text-gray-400 text-xs">Demo: <span className="text-brand-400">demo@nexashop.com</span> / any password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
