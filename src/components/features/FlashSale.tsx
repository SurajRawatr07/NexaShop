import React, { useMemo } from "react";
import { Clock, Flame, Zap } from "lucide-react";
import { FLASH_SALE_PRODUCTS } from "@/data/products";
import { useCountdown } from "@/hooks/useCountdown";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function FlashSale() {
  const target = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, d.getMinutes() + 42, d.getSeconds() + 17);
    return d;
  }, []);

  const { hours, minutes, seconds } = useCountdown(target);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-bold font-grotesk text-white">Flash Sale</h2>
                <span className="badge-sale animate-pulse">LIVE</span>
              </div>
              <p className="text-gray-400 text-sm">Hurry up! Deals expire soon</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-gray-400 text-sm">Ends in:</span>
            <div className="flex items-center gap-1">
              {[pad(hours), pad(minutes), pad(seconds)].map((t, i) => (
                <React.Fragment key={i}>
                  <div className="glass rounded-lg px-2.5 py-1.5 min-w-[40px] text-center">
                    <span className="text-white font-bold text-lg leading-none block">{t}</span>
                    <span className="text-gray-500 text-[9px]">
                      {i === 0 ? "HRS" : i === 1 ? "MIN" : "SEC"}
                    </span>
                  </div>
                  {i < 2 && <span className="text-red-400 font-bold text-lg">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bars for each product */}
        <div className="hidden md:flex gap-2 mb-4">
          {FLASH_SALE_PRODUCTS.slice(0, 4).map((p) => {
            const sold = Math.min(90, Math.floor(100 - (p.stockCount / 200) * 100));
            return (
              <div key={p.id} className="flex-1">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{sold}% sold</span>
                  <span>{p.stockCount} left</span>
                </div>
                <div className="h-1.5 bg-dark-500 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                    style={{ width: `${sold}%`, transition: "width 1s ease" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {FLASH_SALE_PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
