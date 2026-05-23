import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, ShoppingBag, ArrowRight, Chrome, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/store/useStore";
import authBg from "@/assets/auth-bg.jpg";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
    { label: "Special char", ok: /[!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn("flex-1 h-1 rounded-full transition-all", i < score ? barColors[score - 1] : "bg-gray-200")} />
        ))}
      </div>
      {password && (
        <p className="text-xs text-theme-muted">
          Strength: <span className={cn("font-semibold", score >= 3 ? "text-green-600" : score >= 2 ? "text-yellow-600" : "text-red-500")}>{labels[score - 1] || "Weak"}</span>
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const { register, loginWithGoogle, loading } = useAuth();
  const { theme } = useStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please fill in all fields"); return; }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    const ok = await register(form.name, form.email, form.password);
    if (ok) { toast.success("Account created! Welcome!"); navigate("/"); }
  };

  return (
    <div className={cn("min-h-screen flex", isDark ? "bg-dark-800" : "bg-gray-50")}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/75 to-blue-900/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-white" />
            <span className="text-2xl font-bold text-white">Nexa<span className="text-yellow-300">Shop</span></span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-3">
              Join Millions of<br />Happy Shoppers
            </h1>
            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
              Create your free account and unlock exclusive deals, personalized picks, and 2-day delivery across India.
            </p>
            <div className="space-y-2.5">
              {[
                "Access 50M+ products from verified sellers",
                "Exclusive member-only deals & early sales",
                "Lightning-fast 2-day delivery India-wide",
                "Easy 30-day returns, no questions asked",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-indigo-200 text-xs">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-indigo-400 text-xs">Already have an account? <Link to="/login" className="text-white hover:underline">Sign in</Link></p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <ShoppingBag className="w-6 h-6 text-brand-500" />
            <span className="text-xl font-bold text-theme-primary">NexaShop</span>
          </div>

          <div className={cn("rounded-lg border p-6 md:p-8", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-200 shadow-card")}>
            {/* Steps */}
            <div className="flex items-center gap-2 mb-5">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all", s <= step ? "bg-brand-500 text-white" : isDark ? "bg-dark-400 text-gray-500" : "bg-gray-100 text-gray-400")}>
                    {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {s < 2 && <div className={cn("flex-1 h-0.5 rounded", s < step ? "bg-brand-500" : isDark ? "bg-dark-400" : "bg-gray-200")} />}
                </React.Fragment>
              ))}
            </div>

            <h2 className="text-xl font-bold text-theme-primary mb-0.5">
              {step === 1 ? "Create Account" : "Set Password"}
            </h2>
            <p className="text-theme-muted text-sm mb-5">
              {step === 1 ? "Step 1 of 2 — Basic Information" : "Step 2 of 2 — Secure your account"}
            </p>

            {step === 1 ? (
              <>
                <button
                  onClick={loginWithGoogle}
                  disabled={loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded border text-sm font-medium transition-colors mb-4",
                    isDark ? "bg-dark-500 border-dark-400 text-gray-200 hover:bg-dark-400" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Chrome className="w-4 h-4 text-blue-500" />
                  Sign up with Google
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("flex-1 h-px", isDark ? "bg-dark-400" : "bg-gray-200")} />
                  <span className="text-theme-muted text-xs">or with email</span>
                  <div className={cn("flex-1 h-px", isDark ? "bg-dark-400" : "bg-gray-200")} />
                </div>
                <form onSubmit={handleStep1} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-theme-secondary mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                      <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" className="form-input pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-theme-secondary mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                      <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="form-input pl-9" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-theme-secondary mb-1">Phone (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                      <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="form-input pl-9" />
                    </div>
                  </div>
                  <button type="submit" className="w-full btn-flipkart py-3 rounded font-semibold flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-theme-secondary mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Create a strong password"
                      className="form-input pl-9 pr-9"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted">
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {form.password && <PasswordStrength password={form.password} />}
                </div>
                <div>
                  <label className="block text-xs font-medium text-theme-secondary mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
                    <input
                      type="password"
                      value={form.confirm}
                      onChange={(e) => update("confirm", e.target.value)}
                      placeholder="Repeat your password"
                      className="form-input pl-9"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-1">
                  <button type="button" onClick={() => setStep(1)} className={cn("flex-1 py-3 rounded border text-sm font-medium transition-colors", isDark ? "border-dark-400 text-gray-300 hover:bg-dark-500" : "border-gray-300 text-gray-700 hover:bg-gray-50")}>
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 btn-flipkart py-3 rounded font-semibold flex items-center justify-center gap-2">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : "Create Account"}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-xs text-theme-muted mt-4">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-brand-500 hover:underline">Terms</a> &{" "}
              <a href="#" className="text-brand-500 hover:underline">Privacy Policy</a>
            </p>

            <p className="text-center text-sm text-theme-muted mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-500 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
