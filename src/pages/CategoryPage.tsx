import React from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/features/ProductCard";
import SectionHeader from "@/components/features/SectionHeader";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find((c) => c.id === id);
  const products = PRODUCTS.filter((p) => p.category === id);

  return (
    <div className="pt-[130px] min-h-screen">
      {/* Hero Banner */}
      {category && (
        <div
          className="relative h-40 md:h-56 flex items-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${category.color}22 0%, transparent 60%)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-800" />
          <div className="container-custom relative z-10">
            <div className="text-6xl mb-3">{category.icon}</div>
            <h1 className="text-3xl md:text-5xl font-black font-grotesk text-white">{category.name}</h1>
            <p className="text-gray-400 mt-1">{products.length} products available</p>
          </div>
        </div>
      )}

      <div className="container-custom py-8">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
