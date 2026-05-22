import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    cartOpen, setCartOpen, cartItems, removeFromCart, updateQuantity,
    cartTotal, cartCount, appliedCoupon, couponDiscount,
  } = useStore();

  const total = cartTotal();
  const finalTotal = total - couponDiscount;
  const savings = cartItems.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col glass-dark border-l border-white/10 transition-transform duration-400 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-400" />
            <h2 className="text-white font-bold text-lg">My Cart</h2>
            <span className="glass text-brand-400 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount()} items
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm text-center">Add products to get started</p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold relative z-10"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="glass rounded-xl p-3 flex gap-3 group">
                <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0 hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{item.name}</p>
                  {item.selectedColor && (
                    <p className="text-gray-500 text-xs mt-0.5">{item.selectedColor}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white font-bold">{formatPrice(item.price)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-300" />
                      </button>
                      <span className="text-white text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-white/10 space-y-3">
            {savings > 0 && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Tag className="w-4 h-4" />
                <span>You save {formatPrice(savings)}!</span>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Coupon ({appliedCoupon})</span>
                  <span className="text-green-400">-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/10 pt-2 mt-2">
                <span className="text-white text-lg">Total</span>
                <span className="text-white text-lg">{formatPrice(Math.max(0, finalTotal))}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="btn-primary w-full py-3.5 rounded-xl text-center font-semibold flex items-center justify-center gap-2 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="block text-center text-brand-400 hover:text-brand-300 text-sm transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
