import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, MapPin, Package, Truck, ArrowLeft, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const STEPS = ["Delivery", "Payment", "Review"];

export default function CheckoutPage() {
  const { cartItems, cartTotal, couponDiscount, clearCart, user, theme } = useStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "", phone: "",
    address: "", city: "", state: "", zip: "",
    payment: "card", cardNum: "", cardExp: "", cardCvv: "",
  });

  const total = cartTotal();
  const delivery = total > 499 ? 0 : 40;
  const finalTotal = Math.max(0, total - couponDiscount + delivery);
  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    setOrdered(true);
    setPlacing(false);
  };

  const inputClass = cn("form-input", isDark ? "" : "");

  if (ordered) {
    return (
      <div className="pt-[96px] min-h-screen flex items-center justify-center bg-theme-secondary">
        <div className="text-center max-w-sm px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-theme-primary mb-1">Order Placed!</h2>
          <p className="text-theme-muted text-sm mb-1">Your order has been confirmed.</p>
          <p className="text-brand-500 font-semibold text-sm mb-1">Order #NX{Date.now().toString().slice(-8)}</p>
          <p className="text-theme-muted text-xs mb-6">Estimated delivery: 2–3 business days</p>
          <div className="flex gap-2 justify-center">
            <Link to="/" className="btn-flipkart px-5 py-2.5 rounded text-sm font-semibold">Continue Shopping</Link>
            <Link to="/dashboard" className={cn("px-5 py-2.5 rounded text-sm font-semibold border transition-colors", isDark ? "border-dark-400 text-gray-300 hover:bg-dark-600" : "border-gray-300 text-gray-700 hover:bg-gray-50")}>Track Order</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4 md:py-6">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => navigate(-1)} className={cn("w-8 h-8 rounded flex items-center justify-center border transition-colors", isDark ? "border-dark-400 text-gray-400 hover:bg-dark-600" : "border-gray-200 text-gray-500 hover:bg-gray-50")}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold text-theme-primary">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-5">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={cn("flex items-center gap-1.5 cursor-pointer text-xs font-medium", i <= step ? "text-brand-500" : "text-theme-muted")}
                onClick={() => i < step && setStep(i)}
              >
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", i < step ? "bg-brand-500 text-white" : i === step ? "border-2 border-brand-500 text-brand-500" : isDark ? "bg-dark-500 text-gray-500" : "bg-gray-100 text-gray-400")}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={cn("flex-1 h-0.5 rounded", i < step ? "bg-brand-500" : isDark ? "bg-dark-500" : "bg-gray-200")} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Form */}
          <div className={cn("lg:col-span-2 rounded border p-5", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
            {step === 0 && (
              <div className="space-y-3">
                <h2 className="text-theme-primary font-bold text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" /> Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "name", label: "Full Name", placeholder: "John Doe" },
                    { key: "email", label: "Email", placeholder: "you@example.com" },
                    { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
                    { key: "address", label: "Address", placeholder: "Street, Locality", full: true },
                    { key: "city", label: "City", placeholder: "Bangalore" },
                    { key: "state", label: "State", placeholder: "Karnataka" },
                    { key: "zip", label: "PIN Code", placeholder: "560001" },
                  ].map(({ key, label, placeholder, full }) => (
                    <div key={key} className={full ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-medium text-theme-secondary mb-1">{label}</label>
                      <input type="text" value={form[key as keyof typeof form]} onChange={(e) => up(key, e.target.value)} placeholder={placeholder} className={inputClass} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="btn-flipkart px-6 py-2.5 rounded text-sm font-semibold mt-1">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-3">
                <h2 className="text-theme-primary font-bold text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-500" /> Payment Method
                </h2>
                <div className="space-y-2">
                  {[
                    { value: "card", label: "Credit / Debit Card", icon: "💳" },
                    { value: "upi", label: "UPI Payment", icon: "📱" },
                    { value: "cod", label: "Cash on Delivery", icon: "💵" },
                  ].map((p) => (
                    <label key={p.value} className={cn("flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors", form.payment === p.value ? isDark ? "border-brand-500 bg-brand-900/20" : "border-brand-500 bg-blue-50" : isDark ? "border-dark-400 hover:border-dark-300" : "border-gray-200 hover:border-gray-300")}>
                      <input type="radio" name="payment" value={p.value} checked={form.payment === p.value} onChange={() => up("payment", p.value)} className="accent-brand-500 w-3.5 h-3.5" />
                      <span className="text-sm">{p.icon}</span>
                      <span className="text-theme-primary text-sm font-medium">{p.label}</span>
                    </label>
                  ))}
                </div>
                {form.payment === "card" && (
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="block text-xs font-medium text-theme-secondary mb-1">Card Number</label>
                      <input value={form.cardNum} onChange={(e) => up("cardNum", e.target.value)} placeholder="1234 5678 9012 3456" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-theme-secondary mb-1">Expiry</label>
                        <input value={form.cardExp} onChange={(e) => up("cardExp", e.target.value)} placeholder="MM/YY" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-theme-secondary mb-1">CVV</label>
                        <input value={form.cardCvv} onChange={(e) => up("cardCvv", e.target.value)} placeholder="•••" className={inputClass} type="password" />
                      </div>
                    </div>
                  </div>
                )}
                <button onClick={() => setStep(2)} className="btn-flipkart px-6 py-2.5 rounded text-sm font-semibold mt-1">
                  Review Order →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <h2 className="text-theme-primary font-bold text-base flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-500" /> Review Order
                </h2>
                <div className="space-y-2 max-h-60 overflow-y-auto hide-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className={cn("flex gap-3 p-2.5 rounded border", isDark ? "border-dark-400" : "border-gray-100")}>
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                      <div className="flex-1">
                        <p className="text-theme-primary text-xs font-medium line-clamp-1">{item.name}</p>
                        <p className="text-theme-muted text-xs">Qty: {item.quantity}</p>
                        <p className="text-brand-500 font-semibold text-xs">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handlePlaceOrder} disabled={placing} className="w-full btn-buy-now py-3 rounded font-semibold text-sm flex items-center justify-center gap-2">
                  {placing ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <>Place Order · {formatPrice(finalTotal)}</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className={cn("rounded border p-4 h-fit", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
            <h3 className="text-theme-primary font-bold text-sm mb-3">Price Details</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-theme-muted">Items ({cartItems.length})</span><span className="text-theme-primary">{formatPrice(total)}</span></div>
              {couponDiscount > 0 && <div className="flex justify-between"><span className="text-green-600">Coupon Discount</span><span className="text-green-600">-{formatPrice(couponDiscount)}</span></div>}
              <div className="flex justify-between"><span className="text-theme-muted">Delivery</span><span className={delivery === 0 ? "text-green-600 font-medium" : "text-theme-primary"}>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></div>
              <div className={cn("pt-2 border-t", isDark ? "border-dark-400" : "border-gray-100")}>
                <div className="flex justify-between font-bold text-sm"><span className="text-theme-primary">Total</span><span className="text-theme-primary">{formatPrice(finalTotal)}</span></div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-theme-muted">
              <Truck className="w-3 h-3 text-green-500" />
              <span>Estimated delivery: 2–3 business days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
