import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/products";
import SectionHeader from "./SectionHeader";

export default function TestimonialsSection() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Real reviews from real shoppers"
          gradient
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="glass rounded-2xl p-5 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote className="w-6 h-6 text-brand-400/40 mb-3" />
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">{t.comment}</p>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full" />
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
