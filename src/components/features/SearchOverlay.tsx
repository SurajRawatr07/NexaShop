import React, { useState, useEffect, useRef } from "react";
import { X, Search, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";
import { formatPrice, debounce } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TRENDING = ["iPhone 16 Pro", "PS5 Console", "Nike Air Jordan", "MacBook Pro M4", "AirPods Pro"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, theme } = useStore();
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof PRODUCTS>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const stored = localStorage.getItem("nexashop_recent");
      if (stored) setRecentSearches(JSON.parse(stored));
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const search = debounce((q: string) => {
      if (!q.trim()) { setResults([]); return; }
      const r = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 5);
      setResults(r);
    }, 200);
    search(query);
  }, [query]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    const recent = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(recent);
    localStorage.setItem("nexashop_recent", JSON.stringify(recent));
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => setSearchOpen(false)} />
      <div className={cn(
        "relative w-full max-w-xl rounded-lg border shadow-2xl overflow-hidden animate-scale-in",
        isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-200"
      )}>
        {/* Search Input */}
        <div className={cn("flex items-center gap-2.5 px-4 py-3 border-b", isDark ? "border-dark-500" : "border-gray-100")}>
          <Search className="w-4 h-4 text-theme-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Search products, brands, categories..."
            className="flex-1 bg-transparent text-theme-primary placeholder-theme-muted outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-theme-muted hover:text-theme-primary">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={() => setSearchOpen(false)} className="text-theme-muted hover:text-theme-primary ml-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              <p className={cn("px-2 py-1.5 text-xs font-semibold uppercase tracking-wide", isDark ? "text-gray-500" : "text-gray-400")}>Products</p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => { setSearchOpen(false); handleSearch(query); }}
                  className={cn("flex items-center gap-3 px-2 py-2.5 rounded transition-colors group", isDark ? "hover:bg-dark-600" : "hover:bg-gray-50")}
                >
                  <img src={product.image} alt="" className="w-10 h-10 object-contain rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-theme-primary text-sm font-medium truncate">{product.name}</p>
                    <p className="text-theme-muted text-xs">{product.brand} · {formatPrice(product.price)}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-brand-500 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <p className={cn("text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1", isDark ? "text-gray-500" : "text-gray-400")}>
                    <Clock className="w-3 h-3" /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setQuery(s); handleSearch(s); }}
                        className={cn("px-3 py-1.5 rounded-full text-xs border transition-colors", isDark ? "border-dark-400 text-gray-300 hover:border-dark-300 hover:text-white" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800")}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className={cn("text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1", isDark ? "text-gray-500" : "text-gray-400")}>
                  <TrendingUp className="w-3 h-3" /> Trending Searches
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TRENDING.map((t, i) => (
                    <button
                      key={t}
                      onClick={() => { setQuery(t); handleSearch(t); }}
                      className={cn("px-3 py-1.5 rounded-full text-xs border transition-colors flex items-center gap-1", isDark ? "border-dark-400 text-gray-300 hover:border-brand-500 hover:text-white" : "border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600")}
                    >
                      <span className="text-brand-500 font-bold text-[10px]">{i + 1}</span>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={cn("px-4 py-2 border-t flex items-center justify-between", isDark ? "border-dark-500" : "border-gray-100")}>
          <p className="text-theme-muted text-[10px]">Press Esc to close</p>
          <p className="text-theme-muted text-[10px]">Press Enter to search</p>
        </div>
      </div>
    </div>
  );
}
