import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const {
    cartOpen, setCartOpen, cartItems, removeFromCart, updateQuantity,
    cartTotal, cartCount, appliedCoupon, couponDiscount, theme,
  } = useStore();
  const isDark = theme === "dark";

  const total = cartTotal();
  const delivery = total > 499 ? 0 : 40;
  const finalTotal = total - couponDiscount + delivery;
  const savings = cartItems.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0);

  return (
    <>
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)} />
      )}
      <div className={cn(
        "fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 flex flex-col transition-transform duration-300 ease-out shadow-2xl",
        isDark ? "bg-dark-700 border-l border-dark-500" : "bg-white border-l border-gray-200",
        cartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className={cn("flex items-center justify-between px-4 py-3 border-b", isDark ? "border-dark-500" : "border-gray-100")}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-500" />
            <h2 className="text-theme-primary font-bold text-base">My Cart</h2>
            <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", isDark ? "bg-brand-900/30 text-brand-400" : "bg-blue-50 text-brand-500")}>
              {cartCount()}
            </span>
          </div>
          <button onClick={() => setCartOpen(false)} className={cn("w-8 h-8 rounded flex items-center justify-center transition-colors", isDark ? "text-gray-400 hover:bg-dark-500" : "text-gray-500 hover:bg-gray-100")}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", isDark ? "bg-dark-500" : "bg-gray-100")}>
                <ShoppingBag className="w-8 h-8 text-theme-muted" />
              </div>
              <p className="text-theme-primary font-medium text-sm">Your cart is empty</p>
              <p className="text-theme-muted text-xs">Add products to get started</p>
              <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-flipkart px-5 py-2 rounded text-sm">Start Shopping</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={cn("flex gap-2.5 p-2.5 rounded border group", isDark ? "border-dark-400" : "border-gray-100")}>
                <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)} className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-theme-primary text-xs font-medium line-clamp-2 leading-snug">{item.name}</p>
                  {item.selectedColor && <p className="text-theme-muted text-[10px]">{item.selectedColor}</p>}
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-theme-primary font-bold text-sm">{formatPrice(item.price)}</span>
                    <div className={cn("flex items-center rounded border overflow-hidden", isDark ? "border-dark-400" : "border-gray-200")}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={cn("w-6 h-6 flex items-center justify-center text-xs", isDark ? "hover:bg-dark-400 text-gray-300" : "hover:bg-gray-50 text-gray-600")}>
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-theme-primary text-xs font-semibold w-7 text-center border-x border-inherit">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={cn("w-6 h-6 flex items-center justify-center text-xs", isDark ? "hover:bg-dark-400 text-gray-300" : "hover:bg-gray-50 text-gray-600")}>
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity self-start pt-0.5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={cn("p-4 border-t space-y-3", isDark ? "border-dark-500" : "border-gray-100")}>
            {delivery === 0 && (
              <div className={cn("flex items-center gap-1.5 text-xs font-medium", isDark ? "text-green-400" : "text-green-600")}>
                <Truck className="w-3.5 h-3.5" /> Free delivery on this order!
              </div>
            )}

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-theme-muted">Subtotal</span>
                <span className="text-theme-primary font-medium">{formatPrice(total)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-600">Savings</span>
                  <span className="text-green-600">-{formatPrice(savings)}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-600">Coupon ({appliedCoupon})</span>
                  <span className="text-green-600">-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-theme-muted">Delivery</span>
                <span className={delivery === 0 ? "text-green-600 font-medium" : "text-theme-primary"}>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span>
              </div>
              <div className={cn("flex justify-between font-bold text-base pt-2 border-t", isDark ? "border-dark-400" : "border-gray-100")}>
                <span className="text-theme-primary">Total</span>
                <span className="text-theme-primary">{formatPrice(Math.max(0, finalTotal))}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full btn-buy-now py-3 rounded text-sm font-semibold flex items-center justify-center gap-1.5"
            >
              Place Order <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="block text-center text-brand-500 text-xs hover:underline"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
