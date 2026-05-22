import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag, Zap } from "lucide-react";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";

const SLIDES = [
  {
    id: 1,
    image: heroBanner1,
    badge: "🚀 New Arrivals 2025",
    title: "The Future\nof Shopping",
    subtitle: "Discover millions of premium products at unbeatable prices with lightning-fast delivery",
    cta: "Shop Now",
    ctaLink: "/shop",
    ctaSecondary: "Explore Deals",
    ctaSecondaryLink: "/deals",
    accent: "from-brand-600/80 to-indigo-600/60",
  },
  {
    id: 2,
    image: heroBanner2,
    badge: "⚡ Flash Sale — 50% OFF",
    title: "Mega Flash\nSale is LIVE",
    subtitle: "Limited time deals on top electronics, fashion, and more. Don't miss out!",
    cta: "Grab Deals",
    ctaLink: "/deals",
    ctaSecondary: "See All Offers",
    ctaSecondaryLink: "/shop",
    accent: "from-red-600/80 to-orange-600/60",
  },
  {
    id: 3,
    image: heroBanner3,
    badge: "✨ Fashion Week",
    title: "Elevate Your\nStyle Game",
    subtitle: "From luxury brands to street style — find your perfect look at NexaShop",
    cta: "Shop Fashion",
    ctaLink: "/category/fashion",
    ctaSecondary: "Browse Brands",
    ctaSecondaryLink: "/shop",
    accent: "from-pink-600/80 to-purple-600/60",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "min(90vh, 680px)" }}>
      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.accent} mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-transparent to-transparent" />
        </div>
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-400 rounded-full opacity-30"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 4) * 20}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div
            key={current}
            className="max-w-2xl animate-slide-up"
            style={{ animationDuration: "0.6s" }}
          >
            <span className="inline-block glass text-brand-300 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-brand-500/30">
              {slide.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-grotesk text-white leading-[1.05] mb-4 whitespace-pre-line">
              {slide.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? line : <span className="text-gradient">{line}</span>}
                </span>
              ))}
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to={slide.ctaLink}
                className="btn-primary px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-semibold flex items-center gap-2 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  {slide.cta}
                </span>
              </Link>
              <Link
                to={slide.ctaSecondaryLink}
                className="glass px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
              >
                <Zap className="w-4 h-4 text-brand-400 group-hover:scale-110 transition-transform" />
                {slide.ctaSecondary}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
              {[
                { value: "50M+", label: "Products" },
                { value: "2M+", label: "Sellers" },
                { value: "100M+", label: "Customers" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-white font-bold text-xl md:text-2xl">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2.5 bg-brand-400" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}

