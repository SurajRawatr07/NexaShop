import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/products";
import SectionHeader from "./SectionHeader";

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <SectionHeader title="Shop by Category" subtitle="Explore our wide range of categories" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="category-card flex flex-col items-center gap-2 text-center group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}25` }}
              >
                {cat.icon}
              </div>
              <span className="text-xs md:text-sm text-gray-300 group-hover:text-white font-medium transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Banner row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            {
              title: "Electronics Sale",
              subtitle: "Up to 60% off",
              image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=200&fit=crop",
              link: "/category/electronics",
              gradient: "from-blue-600/60 to-cyan-600/40",
            },
            {
              title: "Fashion Week",
              subtitle: "New Season Arrivals",
              image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=200&fit=crop",
              link: "/category/fashion",
              gradient: "from-pink-600/60 to-rose-600/40",
            },
            {
              title: "Gaming Zone",
              subtitle: "Level up your setup",
              image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=200&fit=crop",
              link: "/category/gaming",
              gradient: "from-purple-600/60 to-indigo-600/40",
            },
          ].map((b) => (
            <Link
              key={b.title}
              to={b.link}
              className="relative h-28 md:h-36 rounded-2xl overflow-hidden group"
            >
              <img src={b.image} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className={`absolute inset-0 bg-gradient-to-r ${b.gradient}`} />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="text-white font-bold text-lg">{b.title}</p>
                <p className="text-white/80 text-sm">{b.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
