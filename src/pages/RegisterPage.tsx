import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, Zap, ArrowRight, Chrome, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import authBg from "@/assets/auth-bg.jpg";
import toast from "react-hot-toast";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
    { label: "Special", ok: /[!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : "bg-white/10"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map((c) => (
            <span key={c.label} className={`text-[10px] flex items-center gap-0.5 ${c.ok ? "text-green-400" : "text-gray-500"}`}>
              {c.ok && <Check className="w-2.5 h-2.5" />}{c.label}
            </span>
          ))}
        </div>
        {password && <span className={`text-xs font-semibold ${colors[score - 1]?.replace("bg-", "text-") || "text-red-500"}`}>{labels[score - 1] || "Weak"}</span>}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const { register, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);

  const update = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Fill in all fields"); return; }
    if (!form.email.includes("@")) { toast.error("Invalid email"); return; }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.password) { toast.error("Enter a password"); return; }
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    const ok = await register(form.name, form.email, form.password);
    if (ok) { toast.success("Account created! Welcome 🎉"); navigate("/"); }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={authBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-indigo-900/60 to-dark-800/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center glow-purple">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black font-grotesk">
              <span className="text-gradient">Nexa</span><span className="text-white">Shop</span>
            </span>
          </Link>
          <div>
            <h1 className="text-5xl font-black font-grotesk text-white leading-tight mb-4">
              Join the
              <br /><span className="text-gradient">Revolution.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Create your free account and unlock exclusive deals, personalized recommendations, and premium shopping experiences.
            </p>
            <div className="space-y-3">
              {[
                "Access to 50M+ products from top brands",
                "Exclusive member-only deals and early sales",
                "Lightning-fast 2-day delivery",
                "AI-powered personalized recommendations",
              ].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-500 text-sm">Already have an account? <Link to="/login" className="text-brand-400 hover:text-brand-300">Sign in</Link></p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-dark-800 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-indigo-900/10" />
        <div className="relative z-10 w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-grotesk text-gradient">NexaShop</span>
          </Link>

          <div className="glass rounded-3xl p-8 border border-white/10">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${s <= step ? "bg-brand-500 text-white" : "glass text-gray-500"}`}>
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 2 && <div className={`flex-1 h-0.5 rounded-full transition-all ${s < step ? "bg-brand-500" : "bg-white/10"}`} />}
                </React.Fragment>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-black font-grotesk text-white mb-1">
                {step === 1 ? "Create Account" : "Set Password"}
              </h2>
              <p className="text-gray-400 text-sm">
                {step === 1 ? "Step 1: Your basic info" : "Step 2: Secure your account"}
              </p>
            </div>

            {step === 1 ? (
              <>
                <button
                  onClick={loginWithGoogle}
                  disabled={loading}
                  className="w-full glass rounded-xl px-4 py-3.5 flex items-center justify-center gap-3 hover:bg-white/5 transition-all mb-4 border border-white/10"
                >
                  <Chrome className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold text-sm">Sign up with Google</span>
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-500 text-xs">or with email</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <form onSubmit={handleStep1} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Full Name"
                      className="input-glass w-full pl-11 border border-white/10"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Email Address"
                      className="input-glass w-full pl-11 border border-white/10"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="Phone (optional)"
                      className="input-glass w-full pl-11 border border-white/10"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group">
                    <span className="relative z-10 flex items-center gap-2">
                      Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Create Password"
                    className="input-glass w-full pl-11 pr-12 border border-white/10"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && <PasswordStrength password={form.password} />}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    placeholder="Confirm Password"
                    className="input-glass w-full pl-11 border border-white/10"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 glass py-4 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <>Create Account</>}
                    </span>
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-gray-500 text-xs mt-4">
              By registering you agree to our{" "}
              <a href="#" className="text-brand-400 hover:underline">Terms</a> and{" "}
              <a href="#" className="text-brand-400 hover:underline">Privacy Policy</a>
            </p>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
