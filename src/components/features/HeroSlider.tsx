import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag, Tag } from "lucide-react";
import { useStore } from "@/store/useStore";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: 1,
    image: heroBanner1,
    badge: "New Arrivals 2025",
    title: "The Future of Shopping",
    subtitle: "Discover premium products at unbeatable prices with lightning-fast delivery across India",
    cta: "Shop Now",
    ctaLink: "/shop",
    ctaSecondary: "Explore Deals",
    ctaSecondaryLink: "/deals",
  },
  {
    id: 2,
    image: heroBanner2,
    badge: "Flash Sale — Up to 70% OFF",
    title: "Mega Flash Sale is LIVE",
    subtitle: "Limited time deals on electronics, fashion, and more. Grab them before they're gone!",
    cta: "Grab Deals",
    ctaLink: "/deals",
    ctaSecondary: "See All Offers",
    ctaSecondaryLink: "/shop",
  },
  {
    id: 3,
    image: heroBanner3,
    badge: "Fashion Week Special",
    title: "Elevate Your Style",
    subtitle: "From luxury brands to street fashion — find your perfect look at the best prices.",
    cta: "Shop Fashion",
    ctaLink: "/category/fashion",
    ctaSecondary: "Browse Brands",
    ctaSecondaryLink: "/shop",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme } = useStore();

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 45vw, 480px)" }}>
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div key={current} className="max-w-xl animate-slide-up">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded mb-3 border border-white/30">
              {slide.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              {slide.title}
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-5 max-w-md leading-relaxed hidden sm:block">
              {slide.subtitle}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={slide.ctaLink}
                className="flex items-center gap-1.5 bg-[#fb641b] hover:bg-orange-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded text-sm md:text-base font-semibold transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {slide.cta}
              </Link>
              <Link
                to={slide.ctaSecondaryLink}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white px-4 py-2.5 md:px-6 md:py-3 rounded text-sm md:text-base font-semibold transition-colors border border-white/30"
              >
                <Tag className="w-4 h-4" />
                {slide.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "transition-all duration-300 rounded-full",
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
