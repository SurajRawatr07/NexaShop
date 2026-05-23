import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/features/ProductCard";
import type { SortOption } from "@/types";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
];

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { theme } = useStore();
  const isDark = theme === "dark";
  const [sort, setSort] = useState<SortOption>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
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
    p = p.filter((x) => x.price <= filters.maxPrice);
    if (filters.rating > 0) p = p.filter((x) => x.rating >= filters.rating);
    if (filters.freeDelivery) p = p.filter((x) => x.freeDelivery);
    if (filters.inStock) p = p.filter((x) => x.inStock);
    if (filters.brands.length > 0) p = p.filter((x) => filters.brands.includes(x.brand));
    switch (sort) {
      case "price-low": p.sort((a, b) => a.price - b.price); break;
      case "price-high": p.sort((a, b) => b.price - a.price); break;
      case "rating": p.sort((a, b) => b.rating - a.rating); break;
      case "discount": p.sort((a, b) => b.discount - a.discount); break;
    }
    return p;
  }, [query, sort, filters]);

  const toggleBrand = (brand: string) => {
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(brand) ? f.brands.filter((b) => b !== brand) : [...f.brands, brand],
    }));
  };

  const filterSidebarClass = cn(
    "rounded border p-4 sticky top-[104px] space-y-5",
    isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card"
  );

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-base font-bold text-theme-primary">
              {query ? `Results for "${query}"` : "All Products"}
            </h1>
            <p className="text-theme-muted text-xs">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={cn("flex items-center gap-1.5 px-3 py-2 rounded border text-xs font-medium transition-colors md:hidden", isDark ? "border-dark-400 text-gray-300 hover:bg-dark-600" : "border-gray-200 text-gray-700 hover:bg-gray-50")}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
            <div className={cn("flex items-center rounded border overflow-hidden", isDark ? "border-dark-400" : "border-gray-200")}>
              <button onClick={() => setView("grid")} className={cn("p-2 transition-colors", view === "grid" ? isDark ? "bg-brand-900/30 text-brand-400" : "bg-blue-50 text-brand-500" : "text-theme-muted hover:text-theme-primary")}>
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setView("list")} className={cn("p-2 transition-colors border-l", isDark ? "border-dark-400" : "border-gray-200", view === "list" ? isDark ? "bg-brand-900/30 text-brand-400" : "bg-blue-50 text-brand-500" : "text-theme-muted hover:text-theme-primary")}>
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="form-input w-auto text-xs py-1.5"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {filterOpen && (
          <div className={cn("rounded border p-4 mb-4 md:hidden", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
            <FilterContent filters={filters} setFilters={setFilters} allBrands={allBrands} toggleBrand={toggleBrand} isDark={isDark} />
          </div>
        )}

        <div className="flex gap-4">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className={filterSidebarClass}>
              <div className="flex items-center justify-between">
                <h3 className="text-theme-primary font-semibold text-sm">Filters</h3>
                <button onClick={() => setFilters({ maxPrice: 300000, rating: 0, freeDelivery: false, inStock: false, brands: [] })} className="text-brand-500 text-xs hover:underline">Clear All</button>
              </div>
              <FilterContent filters={filters} setFilters={setFilters} allBrands={allBrands} toggleBrand={toggleBrand} isDark={isDark} />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <h3 className="text-theme-primary font-bold mb-1">No products found</h3>
                <p className="text-theme-muted text-sm">Try adjusting filters or search terms</p>
              </div>
            ) : (
              <div className={view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" : "grid grid-cols-1 gap-2"}>
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

function FilterContent({ filters, setFilters, allBrands, toggleBrand, isDark }: {
  filters: { maxPrice: number; rating: number; freeDelivery: boolean; inStock: boolean; brands: string[] };
  setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
  allBrands: string[];
  toggleBrand: (brand: string) => void;
  isDark: boolean;
}) {
  return (
    <>
      {/* Price */}
      <div>
        <h4 className="text-theme-secondary text-xs font-semibold mb-2">Max Price</h4>
        <input type="range" min={0} max={300000} value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: +e.target.value }))} className="w-full accent-brand-500" />
        <div className="flex justify-between text-xs text-theme-muted mt-1">
          <span>₹0</span>
          <span>₹{filters.maxPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-theme-secondary text-xs font-semibold mb-2">Min Rating</h4>
        <div className="flex gap-1.5">
          {[4, 3, 0].map((r) => (
            <button key={r} onClick={() => setFilters((f) => ({ ...f, rating: r }))} className={cn("px-2.5 py-1 rounded border text-xs transition-colors", filters.rating === r ? isDark ? "border-brand-500 text-brand-400 bg-brand-900/20" : "border-brand-500 text-brand-500 bg-blue-50" : isDark ? "border-dark-400 text-gray-400" : "border-gray-200 text-gray-500")}>
              {r === 0 ? "All" : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        {[{ label: "Free Delivery", key: "freeDelivery" }, { label: "In Stock", key: "inStock" }].map(({ label, key }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={filters[key as keyof typeof filters] as boolean} onChange={() => setFilters((f) => ({ ...f, [key]: !f[key as keyof typeof f] }))} className="w-3.5 h-3.5 accent-brand-500" />
            <span className="text-theme-secondary text-xs">{label}</span>
          </label>
        ))}
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-theme-secondary text-xs font-semibold mb-2">Brands</h4>
        <div className="space-y-1.5 max-h-36 overflow-y-auto hide-scrollbar">
          {allBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-3.5 h-3.5 accent-brand-500" />
              <span className="text-theme-secondary text-xs">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
