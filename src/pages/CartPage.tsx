import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { COUPONS } from "@/data/products";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, appliedCoupon, couponDiscount, applyCoupon, removeCoupon } = useStore();
  const [couponInput, setCouponInput] = useState("");

  const total = cartTotal();
  const delivery = total > 499 ? 0 : 40;
  const finalTotal = total - couponDiscount + delivery;
  const savings = cartItems.reduce((s, i) => s + (i.originalPrice - i.price) * i.quantity, 0);

  const handleCoupon = () => {
    const c = COUPONS[couponInput.toUpperCase()];
    if (!c) { toast.error("Invalid coupon code"); return; }
    if (total < c.minOrder) { toast.error(`Min order ₹${c.minOrder.toLocaleString()} required`); return; }
    const disc = c.type === "percentage"
      ? Math.min(total * c.discount / 100, c.maxDiscount || Infinity)
      : c.discount;
    applyCoupon(couponInput.toUpperCase(), Math.round(disc));
    toast.success(`Coupon applied! You save ₹${Math.round(disc).toLocaleString()}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-[130px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Looks like you haven't added anything yet</p>
          <Link to="/shop" className="btn-primary px-8 py-3 rounded-xl font-semibold relative z-10">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-grotesk text-white">Shopping Cart</h1>
          <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm transition-colors flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="glass rounded-2xl p-4 flex gap-4 group">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition-transform" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-white font-semibold hover:text-brand-400 transition-colors line-clamp-2">{item.name}</h3>
                  </Link>
                  <p className="text-gray-400 text-sm mt-0.5">{item.brand}</p>
                  {item.selectedColor && <p className="text-gray-500 text-xs mt-0.5">Color: {item.selectedColor}</p>}
                  {item.selectedSize && <p className="text-gray-500 text-xs">Size: {item.selectedSize}</p>}
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-bold text-lg">{formatPrice(item.price)}</span>
                      {item.discount > 0 && (
                        <span className="text-gray-500 line-through text-sm">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 glass rounded-lg px-2 py-1.5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: RotateCcw, text: "30-day Returns" },
                { icon: ShieldCheck, text: "Secure Checkout" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="glass rounded-xl p-3 flex flex-col items-center gap-1 text-center">
                  <Icon className="w-5 h-5 text-brand-400" />
                  <span className="text-gray-400 text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-400" /> Apply Coupon
              </h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between glass rounded-xl px-4 py-3 border border-green-500/30">
                  <span className="text-green-400 font-semibold">{appliedCoupon} applied!</span>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-red-400 transition-colors text-sm">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500/50"
                  />
                  <button onClick={handleCoupon} className="btn-primary px-4 py-2.5 rounded-xl text-sm font-semibold relative z-10">Apply</button>
                </div>
              )}
              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p>Try: <span className="text-brand-400 cursor-pointer" onClick={() => setCouponInput("NEXA20")}>NEXA20</span>, <span className="text-brand-400 cursor-pointer" onClick={() => setCouponInput("SAVE500")}>SAVE500</span></p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({cartItems.length} items)</span>
                  <span className="text-white">{formatPrice(total)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">You Save</span>
                    <span className="text-green-400">-{formatPrice(savings)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Coupon Discount</span>
                    <span className="text-green-400">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery</span>
                  <span className={delivery === 0 ? "text-green-400" : "text-white"}>
                    {delivery === 0 ? "FREE" : formatPrice(delivery)}
                  </span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-white">{formatPrice(Math.max(0, finalTotal))}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mt-4 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link to="/shop" className="block text-center text-brand-400 hover:text-brand-300 text-sm mt-3 transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
