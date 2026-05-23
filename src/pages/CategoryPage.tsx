import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/features/ProductCard";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useStore();
  const isDark = theme === "dark";
  const category = CATEGORIES.find((c) => c.id === id);
  const products = PRODUCTS.filter((p) => p.category === id);

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-theme-muted mb-4">
          <Link to="/" className="hover:text-brand-500">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-theme-primary font-medium">{category?.name || id}</span>
        </nav>

        {/* Header */}
        <div className={cn("rounded border p-4 mb-4 flex items-center gap-3", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
          <span className="text-3xl">{category?.icon || "🛍️"}</span>
          <div>
            <h1 className="text-lg font-bold text-theme-primary">{category?.name || id}</h1>
            <p className="text-theme-muted text-xs">{products.length} products available</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🛍️</p>
            <h3 className="text-theme-primary font-bold mb-1">No products in this category</h3>
            <Link to="/shop" className="text-brand-500 text-sm hover:underline">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
