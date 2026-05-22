import React from "react";
import HeroSlider from "@/components/features/HeroSlider";
import CategoryGrid from "@/components/features/CategoryGrid";
import FlashSale from "@/components/features/FlashSale";
import ProductGrid from "@/components/features/ProductGrid";
import BrandsSection from "@/components/features/BrandsSection";
import TestimonialsSection from "@/components/features/TestimonialsSection";
import NewsletterSection from "@/components/features/NewsletterSection";
import { PRODUCTS, TRENDING_PRODUCTS, BESTSELLERS, NEW_ARRIVALS } from "@/data/products";

export default function HomePage() {
  const electronics = PRODUCTS.filter((p) => p.category === "electronics");
  const fashion = PRODUCTS.filter((p) => p.category === "fashion");

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="pt-[108px] md:pt-[130px]">
        <HeroSlider />
      </div>

      {/* Categories */}
      <CategoryGrid />

      {/* Flash Sale */}
      <FlashSale />

      {/* Featured Products */}
      <ProductGrid
        title="Featured Products"
        subtitle="Handpicked premium products for you"
        products={PRODUCTS.slice(0, 8)}
        viewAllLink="/shop"
        badge="✨ Editor's Choice"
        gradient
      />

      {/* Trending */}
      <ProductGrid
        title="🔥 Trending Now"
        subtitle="What everyone is buying right now"
        products={TRENDING_PRODUCTS.length > 0 ? TRENDING_PRODUCTS : PRODUCTS.slice(1, 5)}
        viewAllLink="/shop"
      />

      {/* Promo Banners */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&h=300&fit=crop"
                alt="Electronics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <span className="badge-new mb-2 inline-block w-fit">UP TO 60% OFF</span>
                <h3 className="text-white text-2xl font-black">Electronics Sale</h3>
                <p className="text-blue-200 text-sm mt-1">Shop latest gadgets & more</p>
              </div>
            </div>
            <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&h=300&fit=crop"
                alt="Fashion"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <span className="badge-trending mb-2 inline-block w-fit">NEW SEASON</span>
                <h3 className="text-white text-2xl font-black">Fashion Week</h3>
                <p className="text-pink-200 text-sm mt-1">Explore latest styles & trends</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <ProductGrid
        title="Best Sellers"
        subtitle="Most loved products by our customers"
        products={BESTSELLERS.length > 0 ? BESTSELLERS : PRODUCTS.slice(4, 8)}
        viewAllLink="/shop"
      />

      {/* Electronics */}
      <ProductGrid
        title="⚡ Electronics"
        subtitle="Latest gadgets and technology"
        products={electronics.slice(0, 8)}
        viewAllLink="/category/electronics"
        cols={4}
      />

      {/* Brands */}
      <BrandsSection />

      {/* Fashion */}
      <ProductGrid
        title="👗 Fashion"
        subtitle="Latest trends and styles"
        products={fashion.slice(0, 4)}
        viewAllLink="/category/fashion"
        cols={4}
      />

      {/* New Arrivals */}
      <ProductGrid
        title="✨ New Arrivals"
        subtitle="Just landed in our store"
        products={NEW_ARRIVALS.length > 0 ? NEW_ARRIVALS : PRODUCTS.slice(6, 10)}
        viewAllLink="/shop"
        badge="JUST IN"
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
