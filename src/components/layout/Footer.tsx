import React from "react";
import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook, Github, ArrowRight, Shield, Truck, RefreshCw, Headphones } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-900/80 mt-16">
      {/* Wave top */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full">
          <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1350,25 1440,20 L1440,0 L0,0 Z" fill="rgba(139,69,255,0.05)" />
        </svg>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-white/5">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
              { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated expert help" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 p-3 glass rounded-xl">
                <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-grotesk">
                <span className="text-gradient">Nexa</span>
                <span className="text-white">Shop</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The future of shopping is here. Premium products, unbeatable prices, lightning-fast delivery.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                { icon: Youtube, href: "#", color: "hover:text-red-400" },
                { icon: Facebook, href: "#", color: "hover:text-blue-600" },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className={cn("w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200", color)}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Account</h4>
            <ul className="space-y-2">
              {["Profile", "Orders", "Wishlist", "Addresses", "Coupons", "Notifications"].map((item) => (
                <li key={item}>
                  <Link to="/dashboard" className="text-gray-400 hover:text-brand-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Press", "Affiliate Program", "Partnerships"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-brand-400 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: "support@nexashop.com" },
                { icon: Phone, text: "+91 1800-123-4567" },
                { icon: MapPin, text: "Bangalore, India" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-gray-400 text-sm">
                  <Icon className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div className="mt-4">
              <div className="flex gap-1">
                <input
                  type="email"
                  placeholder="Your email..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-brand-500/50"
                />
                <button className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center hover:bg-brand-500 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">© 2025 NexaShop. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
