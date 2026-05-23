import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function CategoryGrid() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  return (
    <section className={cn("py-4", isDark ? "bg-dark-700 border-b border-dark-500" : "bg-white border-b border-gray-100")}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className={cn("text-sm font-bold uppercase tracking-wide", isDark ? "text-gray-200" : "text-gray-700")}>
            Shop by Category
          </h2>
          <Link to="/shop" className={cn("flex items-center gap-0.5 text-xs font-medium", isDark ? "text-brand-400" : "text-brand-500")}>
            See All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Scrollable Categories */}
        <div className="scroll-track pb-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex flex-col items-center gap-1.5 group"
              style={{ minWidth: "72px" }}
            >
              <div
                className={cn(
                  "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-md",
                  isDark ? "bg-dark-500 border border-dark-400" : "bg-gray-50 border border-gray-100"
                )}
                style={{ boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                {cat.icon}
              </div>
              <span className={cn(
                "text-[10px] md:text-xs text-center leading-tight font-medium group-hover:text-brand-500 transition-colors",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Promo Banners */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[
            {
              title: "Electronics Sale",
              subtitle: "Up to 60% off",
              image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=200&fit=crop",
              link: "/category/electronics",
              color: "#1565C0",
            },
            {
              title: "Fashion Week",
              subtitle: "New Season Arrivals",
              image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=200&fit=crop",
              link: "/category/fashion",
              color: "#C62828",
            },
            {
              title: "Gaming Zone",
              subtitle: "Level up your setup",
              image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=200&fit=crop",
              link: "/category/gaming",
              color: "#1B5E20",
            },
          ].map((b) => (
            <Link
              key={b.title}
              to={b.link}
              className="relative h-24 md:h-32 rounded overflow-hidden group col-span-1 md:first:col-span-1"
            >
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${b.color}CC, ${b.color}44)` }} />
              <div className="absolute inset-0 flex flex-col justify-center px-4">
                <p className="text-white font-bold text-sm md:text-base leading-tight">{b.title}</p>
                <p className="text-white/85 text-xs mt-0.5">{b.subtitle}</p>
                <span className="mt-1.5 text-xs text-white font-medium flex items-center gap-0.5 group-hover:gap-1 transition-all">
                  Shop Now <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
