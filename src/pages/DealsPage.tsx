import React from "react";
import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/features/ProductGrid";
import FlashSale from "@/components/features/FlashSale";

export default function DealsPage() {
  const discounted = PRODUCTS.filter((p) => p.discount >= 10).sort((a, b) => b.discount - a.discount);

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-6">
        <div className="text-center mb-8">
          <span className="badge-sale text-base px-4 py-1.5 mb-3 inline-block animate-pulse">🔥 LIMITED TIME</span>
          <h1 className="text-4xl md:text-5xl font-black font-grotesk text-gradient mb-2">Today's Deals</h1>
          <p className="text-gray-400">Exclusive discounts updated every day. Don't miss out!</p>
        </div>
      </div>
      <FlashSale />
      <ProductGrid
        title="All Deals"
        subtitle="Products with biggest discounts"
        products={discounted}
        viewAllLink="/shop"
        cols={5}
      />
    </div>
  );
}
