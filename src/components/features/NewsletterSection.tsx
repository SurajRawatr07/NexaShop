import React, { useState } from "react";
import { Mail, ArrowRight, Sparkles, Bell } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email"); return; }
    setSubmitted(true);
    toast.success("Subscribed! Welcome to NexaShop ✨");
  };

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 aurora-bg" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/60 to-indigo-900/60" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139,69,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)`,
          }} />

          {/* Floating elements */}
          <div className="absolute top-6 right-8 w-16 h-16 bg-brand-500/10 rounded-2xl border border-brand-500/20 flex items-center justify-center animate-float">
            <Bell className="w-8 h-8 text-brand-400 opacity-60" />
          </div>
          <div className="absolute bottom-6 left-8 w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
            <Sparkles className="w-6 h-6 text-indigo-400 opacity-60" />
          </div>

          <div className="relative z-10 text-center py-12 px-6 md:py-16">
            <span className="inline-flex items-center gap-2 glass text-brand-300 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-brand-500/30">
              <Sparkles className="w-4 h-4" /> Exclusive Member Benefits
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-grotesk text-white mb-3">
              Get{" "}
              <span className="text-gradient">Exclusive</span>
              {" "}Deals
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter and get personalized deals, early access to sales, and exclusive member-only offers.
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-4 text-green-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">You're subscribed! Check your inbox for exclusive offers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full glass rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 outline-none focus:border-brand-500/60 transition-all text-sm"
                  />
                </div>
                <button type="submit" className="btn-primary px-6 py-4 rounded-xl font-semibold flex items-center gap-2 justify-center whitespace-nowrap group">
                  <span className="relative z-10 flex items-center gap-2">
                    Subscribe Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>
            )}

            <p className="text-gray-500 text-xs mt-3">No spam, unsubscribe anytime · Join 5M+ subscribers</p>

            <div className="flex justify-center items-center gap-8 mt-8 pt-6 border-t border-white/10">
              {[
                { value: "5M+", label: "Subscribers" },
                { value: "₹5,000", label: "Avg. Savings/Year" },
                { value: "Early", label: "Sale Access" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-white font-bold text-xl">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
