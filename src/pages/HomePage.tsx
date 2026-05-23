import React from "react";
import HeroSlider from "@/components/features/HeroSlider";
import CategoryGrid from "@/components/features/CategoryGrid";
import FlashSale from "@/components/features/FlashSale";
import ProductGrid from "@/components/features/ProductGrid";
import BrandsSection from "@/components/features/BrandsSection";
import TestimonialsSection from "@/components/features/TestimonialsSection";
import NewsletterSection from "@/components/features/NewsletterSection";
import { PRODUCTS, TRENDING_PRODUCTS, BESTSELLERS, NEW_ARRIVALS } from "@/data/products";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const SectionDivider = () => <div className="h-2 bg-theme-secondary" />;

export default function HomePage() {
  const { theme } = useStore();
  const isDark = theme === "dark";

  const electronics = PRODUCTS.filter((p) => p.category === "electronics");
  const fashion = PRODUCTS.filter((p) => p.category === "fashion");
  const grocery = PRODUCTS.filter((p) => p.category === "grocery");

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="pt-[92px] md:pt-[96px]">
        <HeroSlider />
      </div>

      <SectionDivider />

      {/* Categories */}
      <CategoryGrid />

      <SectionDivider />

      {/* Flash Sale */}
      <FlashSale />

      <SectionDivider />

      {/* Featured Products */}
      <ProductGrid
        title="Recommended For You"
        subtitle="Based on your interests"
        products={PRODUCTS.slice(0, 6)}
        viewAllLink="/shop"
        cols={6}
      />

      <SectionDivider />

      {/* Promo Banners */}
      <section className={cn("py-4", isDark ? "bg-dark-700" : "bg-white")}>
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/category/electronics"
              className="relative h-36 md:h-44 rounded overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&h=300&fit=crop"
                alt="Electronics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/20" />
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <span className="badge-new mb-2 inline-block w-fit text-xs">UP TO 60% OFF</span>
                <h3 className="text-white text-xl font-bold">Electronics Sale</h3>
                <p className="text-blue-200 text-xs mt-1">Shop latest gadgets & tech</p>
              </div>
            </Link>
            <Link
              to="/category/fashion"
              className="relative h-36 md:h-44 rounded overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&h=300&fit=crop"
                alt="Fashion"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-pink-900/20" />
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <span className="badge-trending mb-2 inline-block w-fit text-xs">NEW SEASON</span>
                <h3 className="text-white text-xl font-bold">Fashion Week</h3>
                <p className="text-pink-200 text-xs mt-1">Explore latest styles & trends</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Best Sellers */}
      <ProductGrid
        title="🏆 Best Sellers"
        subtitle="Most loved by customers"
        products={BESTSELLERS.length > 0 ? BESTSELLERS : PRODUCTS.slice(4, 10)}
        viewAllLink="/shop"
        cols={6}
      />

      <SectionDivider />

      {/* Electronics */}
      <ProductGrid
        title="⚡ Top Electronics"
        subtitle="Latest gadgets & technology"
        products={electronics.slice(0, 6)}
        viewAllLink="/category/electronics"
        cols={6}
      />

      <SectionDivider />

      {/* Top Brands */}
      <BrandsSection />

      <SectionDivider />

      {/* Trending */}
      <ProductGrid
        title="🔥 Trending Now"
        subtitle="What everyone is buying"
        products={TRENDING_PRODUCTS.length > 0 ? TRENDING_PRODUCTS : PRODUCTS.slice(1, 7)}
        viewAllLink="/shop"
        cols={6}
      />

      <SectionDivider />

      {/* Fashion */}
      <ProductGrid
        title="👗 Fashion & Style"
        subtitle="Latest trends & styles"
        products={fashion.slice(0, 4)}
        viewAllLink="/category/fashion"
        cols={4}
      />

      <SectionDivider />

      {/* New Arrivals */}
      <ProductGrid
        title="✨ Just Arrived"
        subtitle="Freshest additions to our store"
        products={NEW_ARRIVALS.length > 0 ? NEW_ARRIVALS : PRODUCTS.slice(6, 12)}
        viewAllLink="/shop"
        badge="NEW"
        cols={6}
      />

      <SectionDivider />

      {/* Testimonials */}
      <TestimonialsSection />

      <SectionDivider />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
