import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, Star } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart, theme } = useStore();
  const isDark = theme === "dark";

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-[96px] min-h-screen flex items-center justify-center bg-theme-secondary">
        <div className="text-center">
          <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4", isDark ? "bg-dark-600" : "bg-gray-100")}>
            <Heart className="w-10 h-10 text-theme-muted" />
          </div>
          <h2 className="text-xl font-bold text-theme-primary mb-2">Your wishlist is empty</h2>
          <p className="text-theme-muted text-sm mb-5">Save items you love to shop later</p>
          <Link to="/shop" className="btn-flipkart px-8 py-3 rounded text-sm font-semibold inline-block">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4 md:py-6">
        <h1 className="text-lg font-bold text-theme-primary mb-4">
          My Wishlist ({wishlistItems.length})
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {wishlistItems.map((item) => (
            <div key={item.id} className={cn("rounded border overflow-hidden transition-all hover:shadow-card-hover group", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100")}>
              <Link to={`/product/${item.id}`} className="block">
                <div className={cn("aspect-square p-2 relative", isDark ? "bg-dark-500" : "bg-gray-50")}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  <button
                    onClick={(e) => { e.preventDefault(); removeFromWishlist(item.id); }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
                <div className="p-2.5">
                  <p className="text-theme-muted text-[10px]">{item.brand}</p>
                  <h3 className="text-theme-primary text-xs font-medium line-clamp-2 mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="rating-chip text-[10px]">{item.rating} ★</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-theme-primary font-bold text-sm">{formatPrice(item.price)}</span>
                    {item.discount > 0 && <span className="text-green-600 text-[10px]">{item.discount}% off</span>}
                  </div>
                </div>
              </Link>
              <div className="px-2.5 pb-2.5">
                <button
                  onClick={() => { addToCart(item); removeFromWishlist(item.id); }}
                  className="w-full btn-flipkart py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3 h-3" /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
