import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useStore();

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-[130px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6">Save items you love and come back to them later</p>
          <Link to="/shop" className="btn-primary px-8 py-3 rounded-xl font-semibold relative z-10">
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-grotesk text-white">
            My Wishlist <span className="text-gray-400 font-normal text-xl">({wishlistItems.length})</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-dark-600">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={(e) => { e.preventDefault(); removeFromWishlist(item.id); }}
                    className="absolute top-2 right-2 w-8 h-8 glass rounded-full flex items-center justify-center text-pink-400 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-gray-400 text-xs">{item.brand}</p>
                  <p className="text-white text-sm font-medium line-clamp-2 mt-0.5">{item.name}</p>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-white font-bold">{formatPrice(item.price)}</span>
                    {item.discount > 0 && (
                      <span className="text-green-400 text-xs">{item.discount}% off</span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="px-3 pb-3">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full btn-primary py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
