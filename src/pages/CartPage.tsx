import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, Shield, Truck, RotateCcw } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { COUPONS } from "@/data/products";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, appliedCoupon, couponDiscount, applyCoupon, removeCoupon, theme } = useStore();
  const [couponInput, setCouponInput] = useState("");
  const isDark = theme === "dark";

  const total = cartTotal();
  const delivery = total > 499 ? 0 : 40;
  const finalTotal = total - couponDiscount + delivery;
  const savings = cartItems.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0);

  const handleCoupon = () => {
    const c = COUPONS[couponInput.toUpperCase()];
    if (!c) { toast.error("Invalid coupon code"); return; }
    if (total < c.minOrder) { toast.error(`Min order ₹${c.minOrder.toLocaleString()} required`); return; }
    const disc = c.type === "percentage" ? Math.min(total * c.discount / 100, c.maxDiscount || Infinity) : c.discount;
    applyCoupon(couponInput.toUpperCase(), Math.round(disc));
    toast.success(`Coupon applied! Saving ₹${Math.round(disc).toLocaleString()}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-[96px] min-h-screen flex items-center justify-center bg-theme-secondary">
        <div className="text-center">
          <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4", isDark ? "bg-dark-600" : "bg-gray-100")}>
            <ShoppingCart className="w-10 h-10 text-theme-muted" />
          </div>
          <h2 className="text-theme-primary text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-theme-muted text-sm mb-5">Add items to get started</p>
          <Link to="/shop" className="btn-flipkart px-8 py-3 rounded font-semibold text-sm inline-block">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4 md:py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-theme-primary">Shopping Cart ({cartItems.length})</h1>
          <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-xs flex items-center gap-1 transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Delivery Strip */}
            {delivery === 0 && (
              <div className={cn("flex items-center gap-2 p-3 rounded text-xs font-medium", isDark ? "bg-green-900/20 text-green-400 border border-green-900/30" : "bg-green-50 text-green-700 border border-green-100")}>
                <Truck className="w-4 h-4" />
                Your order qualifies for FREE delivery!
              </div>
            )}

            {cartItems.map((item) => (
              <div key={item.id} className={cn("rounded border p-3 flex gap-3", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-theme-primary font-medium text-sm hover:text-brand-500 transition-colors line-clamp-2">{item.name}</h3>
                  </Link>
                  <p className="text-theme-muted text-xs mt-0.5">{item.brand}</p>
                  {item.selectedColor && <p className="text-theme-muted text-xs">Color: {item.selectedColor}</p>}
                  {item.selectedSize && <p className="text-theme-muted text-xs">Size: {item.selectedSize}</p>}

                  <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-theme-primary font-bold text-base">{formatPrice(item.price)}</span>
                      {item.discount > 0 && (
                        <>
                          <span className="text-theme-muted line-through text-xs">{formatPrice(item.originalPrice)}</span>
                          <span className="text-green-600 text-xs font-semibold">{item.discount}% off</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn("flex items-center rounded border overflow-hidden", isDark ? "border-dark-400" : "border-gray-200")}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={cn("w-7 h-7 flex items-center justify-center text-theme-secondary transition-colors", isDark ? "hover:bg-dark-400" : "hover:bg-gray-50")}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-theme-primary font-semibold w-8 text-center text-sm border-x border-inherit">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={cn("w-7 h-7 flex items-center justify-center text-theme-secondary transition-colors", isDark ? "hover:bg-dark-400" : "hover:bg-gray-50")}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 flex items-center justify-center text-red-400 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, text: "Free Delivery over ₹499" },
                { icon: RotateCcw, text: "30-day Easy Returns" },
                { icon: Shield, text: "100% Secure Checkout" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className={cn("p-2.5 rounded border text-center", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100")}>
                  <Icon className="w-4 h-4 text-brand-500 mx-auto mb-1" />
                  <span className="text-theme-muted text-[10px]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            {/* Coupon */}
            <div className={cn("rounded border p-4", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
              <h3 className="text-theme-primary font-semibold text-sm mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brand-500" /> Apply Coupon
              </h3>
              {appliedCoupon ? (
                <div className={cn("flex items-center justify-between p-2.5 rounded border text-xs", isDark ? "border-green-800 bg-green-900/20" : "border-green-200 bg-green-50")}>
                  <span className="text-green-600 font-semibold">{appliedCoupon} applied!</span>
                  <button onClick={removeCoupon} className="text-red-500 hover:underline text-xs">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="form-input flex-1 text-xs py-2"
                  />
                  <button onClick={handleCoupon} className="btn-flipkart px-3 py-2 rounded text-xs">Apply</button>
                </div>
              )}
              <p className="text-theme-muted text-[10px] mt-2">
                Try: <span className="text-brand-500 cursor-pointer" onClick={() => setCouponInput("NEXA20")}>NEXA20</span>,{" "}
                <span className="text-brand-500 cursor-pointer" onClick={() => setCouponInput("SAVE500")}>SAVE500</span>
              </p>
            </div>

            {/* Order Summary */}
            <div className={cn("rounded border p-4", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
              <h3 className="text-theme-primary font-semibold text-sm mb-3">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-theme-muted text-xs">Price ({cartItems.length} items)</span>
                  <span className="text-theme-primary text-xs">{formatPrice(total)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600 text-xs">Discount</span>
                    <span className="text-green-600 text-xs">-{formatPrice(savings)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600 text-xs">Coupon ({appliedCoupon})</span>
                    <span className="text-green-600 text-xs">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-theme-muted text-xs">Delivery</span>
                  <span className={cn("text-xs font-medium", delivery === 0 ? "text-green-600" : "text-theme-primary")}>
                    {delivery === 0 ? "FREE" : formatPrice(delivery)}
                  </span>
                </div>
                <div className={cn("pt-2 border-t", isDark ? "border-dark-400" : "border-gray-100")}>
                  <div className="flex justify-between font-bold">
                    <span className="text-theme-primary text-sm">Total Amount</span>
                    <span className="text-theme-primary text-sm">{formatPrice(Math.max(0, finalTotal))}</span>
                  </div>
                  {savings + couponDiscount > 0 && (
                    <p className="text-green-600 text-xs mt-1">You will save {formatPrice(savings + couponDiscount)} on this order</p>
                  )}
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-buy-now py-3 rounded font-semibold flex items-center justify-center gap-2 mt-4 text-sm"
              >
                Place Order <ArrowRight className="w-4 h-4" />
              </Link>

              <Link to="/shop" className="block text-center text-brand-500 text-xs mt-3 hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
