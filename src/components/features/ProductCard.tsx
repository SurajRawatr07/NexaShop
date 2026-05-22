import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, Star, Zap, Clock, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice, truncate } from "@/lib/utils";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [adding, setAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    await new Promise((r) => setTimeout(r, 500));
    addToCart(product);
    setAdding(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const badgeConfig: Record<string, { label: string; class: string }> = {
    new: { label: "NEW", class: "badge-new" },
    sale: { label: `${product.discount}% OFF`, class: "badge-sale" },
    trending: { label: "🔥 TRENDING", class: "badge-trending" },
    bestseller: { label: "⭐ BESTSELLER", class: "bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30" },
    limited: { label: "LIMITED", class: "bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full border border-purple-500/30" },
  };

  if (variant === "horizontal") {
    return (
      <Link to={`/product/${product.id}`} className="flex gap-4 glass rounded-xl p-3 hover:border-brand-500/30 transition-all group">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium line-clamp-2">{product.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-xs">{product.rating}</span>
            <span className="text-gray-500 text-xs">({(product.reviews / 1000).toFixed(1)}k)</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white font-bold text-sm">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <span className="text-xs text-green-400">{product.discount}% off</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="product-card group relative">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-dark-600">
          <img
            src={product.images[imgIdx] || product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            onMouseEnter={() => product.images[1] && setImgIdx(1)}
            onMouseLeave={() => setImgIdx(0)}
            loading="lazy"
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-8 group-hover:translate-x-0 transition-transform duration-300">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-200",
                inWishlist ? "bg-pink-500/30 border-pink-500/50" : "hover:bg-pink-500/20 hover:border-pink-500/40"
              )}
            >
              <Heart className={cn("w-4 h-4 transition-colors", inWishlist ? "fill-pink-400 text-pink-400" : "text-gray-300")} />
            </button>
            <button
              onClick={handleQuickView}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-brand-500/20 hover:border-brand-500/40 transition-all"
            >
              <Eye className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && badgeConfig[product.badge] && (
              <span className={badgeConfig[product.badge].class}>
                {badgeConfig[product.badge].label}
              </span>
            )}
            {product.stockCount <= 10 && product.inStock && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                Only {product.stockCount} left
              </span>
            )}
          </div>

          {/* Assured */}
          {product.assured && (
            <div className="absolute bottom-2 left-2">
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <ShieldCheck className="w-2.5 h-2.5" /> ASSURED
              </span>
            </div>
          )}

          {/* Viewers */}
          {product.viewers && product.viewers > 500 && (
            <div className="absolute bottom-2 right-2">
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-gray-300">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {product.viewers.toLocaleString()} viewing
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-gray-400 text-xs mb-0.5">{product.brand}</p>
          <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5 bg-green-600/20 rounded px-1.5 py-0.5">
              <span className="text-green-400 text-xs font-semibold">{product.rating}</span>
              <Star className="w-2.5 h-2.5 text-green-400 fill-green-400" />
            </div>
            <span className="text-gray-500 text-xs">({(product.reviews / 1000).toFixed(1)}k reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-500 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-green-400 text-xs font-semibold">{product.discount}% off</span>
              </>
            )}
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            {product.freeDelivery ? (
              <span className="text-green-400 flex items-center gap-1">
                <Truck className="w-3 h-3" /> Free delivery
              </span>
            ) : (
              <span>₹40 delivery</span>
            )}
            <span className="text-gray-600">•</span>
            <Clock className="w-2.5 h-2.5" />
            <span>{product.deliveryDays} day{product.deliveryDays > 1 ? "s" : ""}</span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-3 pb-3">
        <button
          onClick={handleAddToCart}
          disabled={adding || !product.inStock}
          className={cn(
            "w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
            product.inStock
              ? "btn-primary"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          )}
        >
          {adding ? (
            <span className="relative z-10 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Adding...
            </span>
          ) : product.inStock ? (
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </span>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>
    </div>
  );
}
