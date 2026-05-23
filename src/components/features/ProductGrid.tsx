import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  badge?: string;
  viewAllLink?: string;
  gradient?: boolean;
  cols?: number;
  horizontal?: boolean;
}

export default function ProductGrid({
  title, subtitle, products, badge, viewAllLink, cols = 6, horizontal,
}: ProductGridProps) {
  const { theme } = useStore();
  const isDark = theme === "dark";

  const colClass: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  return (
    <section className={cn(isDark ? "bg-dark-700 border-y border-dark-500" : "bg-white border-y border-gray-100")}>
      <div className="section-divider" />
      <div className={cn("py-4", isDark ? "bg-dark-700" : "bg-white")}>
        <div className="container-custom">
          {/* Header */}
          <div className="flex items-end justify-between mb-4">
            <div>
              {badge && (
                <span className="badge-sale mb-1.5 inline-block">{badge}</span>
              )}
              <h2 className={cn("text-base md:text-lg font-bold leading-tight", isDark ? "text-white" : "text-gray-900")}>
                {title}
              </h2>
              {subtitle && (
                <p className={cn("text-xs mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>{subtitle}</p>
              )}
            </div>
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className={cn(
                  "flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wide flex-shrink-0 ml-2",
                  isDark ? "text-brand-400" : "text-brand-500"
                )}
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile: horizontal scroll, Desktop: grid */}
          {horizontal ? (
            <div className="scroll-track">
              {products.map((p) => (
                <div key={p.id} style={{ width: "160px" }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Mobile horizontal scroll */}
              <div className="md:hidden scroll-track">
                {products.map((p) => (
                  <div key={p.id} style={{ width: "160px" }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {/* Desktop grid */}
              <div className={`hidden md:grid ${colClass[cols] || colClass[6]} gap-3`}>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
