import React, { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";
import { useCountdown } from "@/hooks/useCountdown";
import ProductCard from "@/components/features/ProductCard";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DealsPage() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  const target = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, d.getMinutes() + 42);
    return d;
  }, []);
  const { hours, minutes, seconds } = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, "0");

  const deals = PRODUCTS.filter((p) => p.discount >= 10).sort((a, b) => b.discount - a.discount);

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4">
        {/* Banner */}
        <div className="rounded bg-orange-500 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h1 className="text-white font-bold text-lg">⚡ Flash Deals</h1>
            <p className="text-orange-100 text-xs">Limited time offers — grab before they expire!</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-orange-100 text-xs">Ends in</span>
            {[pad(hours), pad(minutes), pad(seconds)].map((t, i) => (
              <React.Fragment key={i}>
                <div className="bg-white/20 text-white rounded px-2 py-1 text-sm font-bold font-mono min-w-[30px] text-center">{t}</div>
                {i < 2 && <span className="text-white font-bold">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
