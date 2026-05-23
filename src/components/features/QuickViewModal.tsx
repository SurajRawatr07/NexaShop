import React from "react";
import { X, ShoppingCart, Heart, Star, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function QuickViewModal() {
  const { quickViewProduct: product, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, theme } = useStore();
  const isDark = theme === "dark";

  if (!product) return null;
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => setQuickViewProduct(null)} />
      <div className={cn(
        "relative w-full max-w-2xl rounded-lg border shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto",
        isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-200"
      )}>
        <button
          onClick={() => setQuickViewProduct(null)}
          className={cn("absolute top-3 right-3 z-10 w-8 h-8 rounded flex items-center justify-center transition-colors", isDark ? "bg-dark-500 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700")}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className={cn("aspect-square relative flex items-center justify-center p-4", isDark ? "bg-dark-600" : "bg-gray-50")}>
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            {product.assured && (
              <span className={cn("absolute top-3 left-3 flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded", isDark ? "bg-blue-900/60 text-blue-300" : "bg-blue-50 text-blue-600 border border-blue-100")}>
                <ShieldCheck className="w-2.5 h-2.5" /> Assured
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col">
            <p className="text-brand-500 text-xs font-semibold mb-0.5">{product.brand}</p>
            <h2 className="text-theme-primary font-bold text-lg leading-snug mb-2">{product.name}</h2>

            <div className="flex items-center gap-2 mb-3">
              <span className="rating-chip">{product.rating} ★</span>
              <span className="text-theme-muted text-xs">({(product.reviews / 1000).toFixed(1)}k reviews)</span>
              {product.badge && (
                <span className="badge-sale text-[10px]">{product.badge.toUpperCase()}</span>
              )}
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-theme-primary font-black text-2xl">{formatPrice(product.price)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-theme-muted line-through text-sm">{formatPrice(product.originalPrice)}</span>
                  <span className="text-green-600 font-bold text-sm">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-theme-secondary text-xs leading-relaxed mb-3">{product.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.features.slice(0, 4).map((f) => (
                <span key={f} className={cn("text-xs px-2 py-1 rounded border", isDark ? "border-dark-400 text-gray-400" : "border-gray-200 text-gray-600")}>
                  {f}
                </span>
              ))}
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-1.5 text-xs mb-4">
              <Truck className="w-3.5 h-3.5 text-green-600" />
              <span className={product.freeDelivery ? "text-green-600 font-medium" : "text-theme-muted"}>
                {product.freeDelivery ? "Free Delivery" : "₹40 Delivery"} · {product.deliveryDays} day{product.deliveryDays > 1 ? "s" : ""}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => { addToCart(product); setQuickViewProduct(null); }}
                className="flex-1 btn-flipkart py-2.5 rounded font-semibold flex items-center justify-center gap-1.5 text-sm"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={cn("w-10 h-10 rounded border flex items-center justify-center transition-colors", inWishlist ? isDark ? "border-red-800 bg-red-900/20" : "border-red-200 bg-red-50" : isDark ? "border-dark-400 hover:border-dark-300" : "border-gray-200 hover:border-gray-300")}
              >
                <Heart className={cn("w-4 h-4", inWishlist ? "fill-red-500 text-red-500" : "text-theme-muted")} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="text-center text-brand-500 hover:underline text-xs mt-3"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
