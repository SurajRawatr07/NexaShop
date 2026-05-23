import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { FLASH_SALE_PRODUCTS } from "@/data/products";
import { useCountdown } from "@/hooks/useCountdown";
import ProductCard from "./ProductCard";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function FlashSale() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  const target = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, d.getMinutes() + 42, d.getSeconds() + 17);
    return d;
  }, []);

  const { hours, minutes, seconds } = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className={cn("py-4", isDark ? "bg-dark-700" : "bg-white")}>
      {/* Section divider */}
      <div className="section-divider mb-0" />

      <div className={cn("py-4", isDark ? "bg-dark-700 border-y border-dark-500" : "bg-white border-y border-gray-100")}>
        <div className="container-custom">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-base md:text-lg font-bold text-orange-500 flex items-center gap-1.5">
                ⚡ Flash Deals
              </h2>

              {/* Countdown */}
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>Ends in</span>
                <div className="flex items-center gap-0.5">
                  {[pad(hours), pad(minutes), pad(seconds)].map((t, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-gray-900 text-white rounded px-1.5 py-0.5 text-xs font-mono font-bold min-w-[26px] text-center">
                        {t}
                      </div>
                      {i < 2 && <span className="text-orange-500 font-bold text-xs">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/deals"
              className={cn("flex items-center gap-0.5 text-xs font-semibold uppercase tracking-wide", isDark ? "text-brand-400" : "text-brand-500")}
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Products — horizontal scroll on mobile, grid on desktop */}
          <div className="md:hidden scroll-track">
            {FLASH_SALE_PRODUCTS.slice(0, 8).map((product) => (
              <div key={product.id} style={{ width: "160px" }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-3">
            {FLASH_SALE_PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
