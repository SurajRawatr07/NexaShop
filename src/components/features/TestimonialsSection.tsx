import React from "react";
import { useStore } from "@/store/useStore";
import { TESTIMONIALS } from "@/data/products";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  return (
    <section className={cn(isDark ? "bg-dark-700 border-y border-dark-500" : "bg-gray-50 border-y border-gray-100")}>
      <div className="section-divider" />
      <div className="py-6">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-4">
            <h2 className={cn("text-base md:text-lg font-bold", isDark ? "text-white" : "text-gray-900")}>
              What Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "p-4 rounded border transition-all",
                  isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card"
                )}
              >
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={cn("text-xs leading-relaxed mb-3 line-clamp-3", isDark ? "text-gray-300" : "text-gray-600")}>
                  "{t.comment}"
                </p>
                <div className="flex items-center gap-2">
                  <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <p className={cn("text-xs font-semibold", isDark ? "text-gray-200" : "text-gray-800")}>{t.name}</p>
                    <p className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-400")}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
