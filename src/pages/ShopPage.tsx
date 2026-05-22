import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, X, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/features/ProductCard";
import type { SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Biggest Discount" },
];

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sort, setSort] = useState<SortOption>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 300000,
    rating: 0,
    freeDelivery: false,
    inStock: false,
    brands: [] as string[],
  });

  const allBrands = [...new Set(PRODUCTS.map((p) => p.brand))];

  const filtered = useMemo(() => {
    let p = [...PRODUCTS];
    if (query) {
      p = p.filter((x) =>
        x.name.toLowerCase().includes(query.toLowerCase()) ||
        x.brand.toLowerCase().includes(query.toLowerCase()) ||
        x.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    p = p.filter((x) => x.price >= filters.minPrice && x.price <= filters.maxPrice);
    if (filters.rating > 0) p = p.filter((x) => x.rating >= filters.rating);
    if (filters.freeDelivery) p = p.filter((x) => x.freeDelivery);
    if (filters.inStock) p = p.filter((x) => x.inStock);
    if (filters.brands.length > 0) p = p.filter((x) => filters.brands.includes(x.brand));

    switch (sort) {
      case "price-low": p.sort((a, b) => a.price - b.price); break;
      case "price-high": p.sort((a, b) => b.price - a.price); break;
      case "rating": p.sort((a, b) => b.rating - a.rating); break;
      case "discount": p.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }
    return p;
  }, [query, sort, filters]);

  const toggleBrand = (brand: string) => {
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(brand) ? f.brands.filter((b) => b !== brand) : [...f.brands, brand],
    }));
  };

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold font-grotesk text-white">
              {query ? `Results for "${query}"` : "All Products"}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 text-gray-300 hover:text-white transition-all text-sm md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="flex items-center gap-2 glass rounded-xl p-1">
              <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-brand-500/20 text-brand-400" : "text-gray-400"}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-brand-500/20 text-brand-400" : "text-gray-400"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="glass rounded-xl px-3 py-2.5 text-gray-300 text-sm outline-none border border-white/10 bg-transparent"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-dark-700">{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`w-64 flex-shrink-0 hidden md:block`}>
            <div className="glass rounded-2xl p-5 sticky top-36 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Filters</h3>
                <button
                  onClick={() => setFilters({ minPrice: 0, maxPrice: 300000, rating: 0, freeDelivery: false, inStock: false, brands: [] })}
                  className="text-brand-400 text-xs hover:text-brand-300"
                >
                  Clear All
                </button>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-gray-300 text-sm font-semibold mb-3">Price Range</h4>
                <input
                  type="range"
                  min={0}
                  max={300000}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: +e.target.value }))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span>
                  <span>₹{filters.maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-gray-300 text-sm font-semibold mb-3">Min Rating</h4>
                <div className="flex gap-2">
                  {[4, 3, 2, 0].map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilters((f) => ({ ...f, rating: r }))}
                      className={`glass rounded-lg px-2.5 py-1.5 text-xs transition-all ${filters.rating === r ? "border-brand-500/60 text-brand-400 bg-brand-500/10" : "text-gray-400"}`}
                    >
                      {r === 0 ? "All" : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                {[
                  { label: "Free Delivery", key: "freeDelivery" },
                  { label: "In Stock Only", key: "inStock" },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setFilters((f) => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                      className={`w-10 h-5 rounded-full transition-all ${filters[key as keyof typeof filters] ? "bg-brand-500" : "bg-white/10"} relative`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${filters[key as keyof typeof filters] ? "left-5" : "left-0.5"}`} />
                    </div>
                    <span className="text-gray-300 text-sm">{label}</span>
                  </label>
                ))}
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-gray-300 text-sm font-semibold mb-3">Brands</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto hide-scrollbar">
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded accent-brand-500"
                      />
                      <span className="text-gray-400 group-hover:text-gray-200 text-sm transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-white text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={
                view === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                  : "grid grid-cols-1 gap-3"
              }>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} variant={view === "list" ? "horizontal" : "default"} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
