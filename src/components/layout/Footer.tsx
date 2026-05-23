import React from "react";
import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook, ArrowRight, Truck, RotateCcw, Shield, Headphones, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  return (
    <footer className={cn("border-t", isDark ? "bg-dark-800 border-dark-500" : "bg-gray-900")}>
      {/* Trust Strip */}
      <div className={cn("border-b", isDark ? "bg-dark-700 border-dark-500" : "bg-gray-800")}>
        <div className="container-custom py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Headphones, title: "24/7 Support", desc: "Expert help always" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-2.5">
                <div className={cn("w-8 h-8 rounded flex items-center justify-center flex-shrink-0", isDark ? "bg-dark-500" : "bg-gray-700")}>
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{title}</p>
                  <p className="text-gray-400 text-[10px]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 mb-3">
              <span className="text-lg font-bold text-white">
                Nexa<span className="text-blue-400">Shop</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              India's most trusted shopping platform with millions of products and lightning-fast delivery.
            </p>
            <div className="flex items-center gap-2">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-7 h-7 rounded bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-1.5">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="text-gray-400 hover:text-white text-xs transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">Account</h4>
            <ul className="space-y-1.5">
              {["My Profile", "Orders", "Wishlist", "Addresses", "Coupons", "Notifications"].map((item) => (
                <li key={item}>
                  <Link to="/dashboard" className="text-gray-400 hover:text-white text-xs transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">Company</h4>
            <ul className="space-y-1.5">
              {["About Us", "Careers", "Blog", "Press", "Partnerships", "Sell on NexaShop"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">Stay Updated</h4>
            <div className="flex gap-1 mb-4">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded text-xs text-white placeholder-gray-500 px-2.5 py-2 outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-500 hover:bg-blue-600 rounded px-2.5 py-2 transition-colors flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <ul className="space-y-1.5">
              {[
                { icon: Mail, text: "support@nexashop.com" },
                { icon: Phone, text: "1800-123-4567" },
                { icon: MapPin, text: "Bangalore, India" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Icon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={cn("border-t", isDark ? "border-dark-500" : "border-gray-700")}>
        <div className="container-custom py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-[11px]">© 2025 NexaShop Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {["Privacy", "Terms", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-gray-400 text-[11px] transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
