import React, { useState, useEffect, useRef } from "react";
import { X, Search, Clock, TrendingUp, Mic, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";
import { formatPrice, debounce } from "@/lib/utils";

const TRENDING = ["iPhone 16 Pro", "PS5 Console", "Nike Air Jordan", "MacBook Pro M4", "AirPods Pro"];
const RECENT_KEY = "nexashop_recent_searches";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof PRODUCTS>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const search = debounce((q: string) => {
      if (!q.trim()) { setResults([]); return; }
      const r = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.brand.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 6);
      setResults(r);
    }, 200);
    search(query);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    const recent = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(recent);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
      <div className="relative w-full max-w-2xl glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="Search products, brands, categories..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button className="text-gray-400 hover:text-brand-400 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-gray-400 hover:text-white transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Live Results */}
          {results.length > 0 ? (
            <div className="p-3">
              <p className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-2">Results</p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => { setSearchOpen(false); handleSearch(query); }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <img src={product.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{product.name}</p>
                    <p className="text-gray-500 text-xs">{product.brand} · {formatPrice(product.price)}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-brand-400 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Recent
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setQuery(s); handleSearch(s); }}
                        className="glass rounded-full px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:border-brand-500/40 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((t, i) => (
                    <button
                      key={t}
                      onClick={() => { setQuery(t); handleSearch(t); }}
                      className="glass rounded-full px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:border-brand-500/40 transition-all flex items-center gap-1"
                    >
                      <span className="text-brand-400 font-bold">{i + 1}</span>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-gray-500 text-xs">Press <kbd className="glass px-1.5 py-0.5 rounded text-gray-400 text-xs">⌘K</kbd> to open</p>
          <p className="text-gray-500 text-xs">Press <kbd className="glass px-1.5 py-0.5 rounded text-gray-400 text-xs">Enter</kbd> to search</p>
        </div>
      </div>
    </div>
  );
}
