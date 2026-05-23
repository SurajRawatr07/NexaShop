import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const { theme } = useStore();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email"); return; }
    toast.success("Subscribed! Check your inbox for exclusive deals.");
    setEmail("");
  };

  return (
    <section className={cn(isDark ? "bg-dark-700 border-y border-dark-500" : "bg-blue-600")}>
      <div className="py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                Get Exclusive Deals in Your Inbox
              </h2>
              <p className="text-blue-100 text-sm">
                Subscribe for the best offers, new arrivals, and shopping news. No spam!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <div className="flex-1 flex items-center bg-white rounded overflow-hidden min-w-0">
                <Mail className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 bg-transparent px-2.5 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400 min-w-0"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded font-semibold text-sm transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
