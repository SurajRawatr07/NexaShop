import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Eye, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice, truncate } from "@/lib/utils";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, theme } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const isDark = theme === "dark";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    await new Promise((r) => setTimeout(r, 400));
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

  if (variant === "horizontal") {
    return (
      <Link
        to={`/product/${product.id}`}
        className={cn(
          "flex gap-3 p-3 rounded border transition-all hover:shadow-card-hover",
          isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100"
        )}
      >
        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium line-clamp-2 leading-snug", isDark ? "text-gray-200" : "text-gray-800")}>
            {truncate(product.name, 45)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="rating-chip text-[10px]">
              {product.rating} ★
            </span>
            <span className="text-theme-muted text-[10px]">({(product.reviews / 1000).toFixed(1)}k)</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <span className="text-green-600 text-xs font-semibold">{product.discount}% off</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={cn(
      "shop-card rounded overflow-hidden group relative flex flex-col",
      isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100"
    )}>
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className={cn("relative overflow-hidden", "aspect-square", isDark ? "bg-dark-500" : "bg-gray-50")}>
          <img
            src={product.images[imgIdx] || product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            onMouseEnter={() => product.images[1] && setImgIdx(1)}
            onMouseLeave={() => setImgIdx(0)}
            loading="lazy"
          />

          {/* Hover Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-200">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all",
                inWishlist
                  ? "bg-red-50 text-red-500 border border-red-200"
                  : isDark ? "bg-dark-500 text-gray-400 border border-dark-400" : "bg-white text-gray-400 border border-gray-200 hover:text-red-400"
              )}
            >
              <Heart className={cn("w-3.5 h-3.5", inWishlist && "fill-red-500")} />
            </button>
            <button
              onClick={handleQuickView}
              className={cn(
                "w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all",
                isDark ? "bg-dark-500 text-gray-400 border border-dark-400 hover:text-white" : "bg-white text-gray-400 border border-gray-200 hover:text-brand-500"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount >= 20 && (
              <span className="badge-sale">{product.discount}% OFF</span>
            )}
            {product.badge === "new" && (
              <span className="badge-new">NEW</span>
            )}
            {product.badge === "trending" && (
              <span className="badge-trending">HOT</span>
            )}
          </div>

          {/* Assured */}
          {product.assured && (
            <div className="absolute bottom-1.5 left-2">
              <span className={cn(
                "flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded",
                isDark ? "bg-blue-900/60 text-blue-300" : "bg-blue-50 text-blue-600 border border-blue-100"
              )}>
                <ShieldCheck className="w-2.5 h-2.5" /> Assured
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2.5 pb-0">
          <p className={cn("text-[10px] font-medium mb-0.5", isDark ? "text-gray-400" : "text-gray-400")}>{product.brand}</p>
          <h3 className={cn("text-xs font-medium line-clamp-2 leading-snug mb-1.5", isDark ? "text-gray-200" : "text-gray-800")}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="rating-chip">
              {product.rating} ★
            </span>
            <span className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-400")}>
              ({product.reviews >= 1000 ? `${(product.reviews / 1000).toFixed(1)}k` : product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className={cn("font-bold text-sm", isDark ? "text-white" : "text-gray-900")}>{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className={cn("text-[10px] line-through", isDark ? "text-gray-500" : "text-gray-400")}>{formatPrice(product.originalPrice)}</span>
                <span className="text-green-600 text-[10px] font-semibold">{product.discount}% off</span>
              </>
            )}
          </div>

          {/* Delivery */}
          <div className={cn("flex items-center gap-1 text-[10px] mb-2", isDark ? "text-gray-400" : "text-gray-500")}>
            {product.freeDelivery ? (
              <span className="text-green-600 flex items-center gap-0.5 font-medium">
                <Truck className="w-2.5 h-2.5" /> Free Delivery
              </span>
            ) : (
              <span>₹40 delivery</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="p-2.5 pt-0 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={adding || !product.inStock}
          className={cn(
            "w-full py-2 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
            product.inStock
              ? isDark
                ? "bg-brand-600 hover:bg-brand-500 text-white"
                : "bg-brand-500 hover:bg-brand-600 text-white"
              : isDark ? "bg-dark-400 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          {adding ? (
            <>
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Adding...
            </>
          ) : product.inStock ? (
            <>
              <ShoppingCart className="w-3 h-3" />
              Add to Cart
            </>
          ) : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
