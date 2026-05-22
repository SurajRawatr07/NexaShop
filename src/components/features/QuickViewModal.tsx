import React from "react";
import { X, ShoppingCart, Heart, Star, Truck, ShieldCheck, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function QuickViewModal() {
  const { quickViewProduct: product, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setQuickViewProduct(null)} />
      <div className="relative w-full max-w-3xl glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-dark-600">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.assured && (
              <span className="absolute top-3 left-3 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <ShieldCheck className="w-3 h-3" /> ASSURED
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col">
            <p className="text-brand-400 text-sm font-semibold mb-1">{product.brand}</p>
            <h2 className="text-white font-bold text-xl leading-snug mb-3">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-green-600/20 rounded px-2 py-1">
                <span className="text-green-400 font-bold">{product.rating}</span>
                <Star className="w-3.5 h-3.5 text-green-400 fill-green-400" />
              </div>
              <span className="text-gray-400 text-sm">({(product.reviews / 1000).toFixed(1)}k reviews)</span>
              {product.badge && (
                <span className="badge-trending text-xs">{product.badge.toUpperCase()}</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-white font-black text-3xl">{formatPrice(product.price)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-green-400 font-bold">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.slice(0, 4).map((f) => (
                <span key={f} className="glass text-gray-300 text-xs px-2.5 py-1 rounded-full border border-white/10">
                  {f}
                </span>
              ))}
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Truck className="w-4 h-4 text-green-400" />
              <span className="text-green-400">
                {product.freeDelivery ? "Free Delivery" : "₹40 Delivery"} · {product.deliveryDays} day{product.deliveryDays > 1 ? "s" : ""}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => { addToCart(product); setQuickViewProduct(null); }}
                className="flex-1 btn-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </span>
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 glass rounded-xl flex items-center justify-center transition-all ${inWishlist ? "bg-pink-500/20 border-pink-500/40" : "hover:bg-pink-500/10"}`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-pink-400 text-pink-400" : "text-gray-300"}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="text-center text-brand-400 hover:text-brand-300 text-sm mt-3 transition-colors"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
