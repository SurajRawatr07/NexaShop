import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function BrandsSection() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  const brands = [
    { name: "Apple", img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", link: "/shop?brand=Apple" },
    { name: "Samsung", img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", link: "/shop?brand=Samsung" },
    { name: "Nike", img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", link: "/shop?brand=Nike" },
    { name: "Sony", img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg", link: "/shop?brand=Sony" },
    { name: "Adidas", img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", link: "/shop?brand=Adidas" },
    { name: "Microsoft", img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link: "/shop?brand=Microsoft" },
  ];

  return (
    <section className={cn(isDark ? "bg-dark-700 border-y border-dark-500" : "bg-white border-y border-gray-100")}>
      <div className="section-divider" />
      <div className={cn("py-4", isDark ? "bg-dark-700" : "bg-white")}>
        <div className="container-custom">
          <div className="flex items-center justify-between mb-4">
            <h2 className={cn("text-base md:text-lg font-bold", isDark ? "text-white" : "text-gray-900")}>
              Top Brands
            </h2>
            <Link to="/shop" className={cn("text-xs font-semibold uppercase tracking-wide", isDark ? "text-brand-400" : "text-brand-500")}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={brand.link}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-3 rounded border transition-all hover:shadow-card-hover group",
                  isDark ? "bg-dark-600 border-dark-400 hover:border-dark-300" : "bg-gray-50 border-gray-100 hover:bg-white"
                )}
              >
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="h-7 object-contain group-hover:opacity-80 transition-opacity"
                  style={{ filter: isDark ? "invert(1)" : "none", maxWidth: "80px" }}
                />
                <span className={cn("text-xs font-medium", isDark ? "text-gray-400" : "text-gray-500")}>{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
