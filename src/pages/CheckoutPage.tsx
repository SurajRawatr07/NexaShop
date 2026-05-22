import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, MapPin, Package, Truck, ArrowLeft, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const STEPS = ["Delivery", "Payment", "Review", "Confirm"];

export default function CheckoutPage() {
  const { cartItems, cartTotal, couponDiscount, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "card",
    cardNum: "",
    cardExp: "",
    cardCvv: "",
  });

  const total = cartTotal();
  const delivery = total > 499 ? 0 : 40;
  const finalTotal = Math.max(0, total - couponDiscount + delivery);
  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    setOrdered(true);
    setPlacing(false);
  };

  if (ordered) {
    return (
      <div className="pt-[130px] min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-black font-grotesk text-white mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-400 mb-2">Your order has been confirmed successfully.</p>
          <p className="text-brand-400 font-semibold mb-1">Order #NX{Date.now().toString().slice(-8)}</p>
          <p className="text-gray-400 text-sm mb-8">Estimated delivery: 2-3 business days</p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="btn-primary px-6 py-3 rounded-xl font-semibold relative z-10">Continue Shopping</Link>
            <Link to="/dashboard" className="glass px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white">Track Order</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="w-9 h-9 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-2xl font-bold font-grotesk text-white">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={`flex items-center gap-2 cursor-pointer flex-shrink-0 ${i <= step ? "text-brand-400" : "text-gray-500"}`}
                onClick={() => i < step && setStep(i)}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? "bg-brand-500 text-white" : i === step ? "border-2 border-brand-500 text-brand-400" : "glass text-gray-500"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded-full min-w-[20px] ${i < step ? "bg-brand-500" : "bg-white/10"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-400" /> Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "name", label: "Full Name", placeholder: "John Doe" },
                    { key: "email", label: "Email", placeholder: "you@example.com" },
                    { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
                    { key: "address", label: "Address", placeholder: "Street, Locality" },
                    { key: "city", label: "City", placeholder: "Bangalore" },
                    { key: "state", label: "State", placeholder: "Karnataka" },
                    { key: "zip", label: "PIN Code", placeholder: "560001" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                      <label className="text-gray-300 text-sm mb-1.5 block">{label}</label>
                      <input
                        type="text"
                        value={form[key as keyof typeof form]}
                        onChange={(e) => up(key, e.target.value)}
                        placeholder={placeholder}
                        className="input-glass w-full border border-white/10"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="btn-primary px-8 py-3.5 rounded-xl font-semibold relative z-10 mt-2">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-400" /> Payment Method
                </h2>
                <div className="space-y-2">
                  {[
                    { value: "card", label: "Credit / Debit Card", icon: "💳" },
                    { value: "upi", label: "UPI Payment", icon: "📱" },
                    { value: "cod", label: "Cash on Delivery", icon: "💵" },
                    { value: "wallet", label: "NexaShop Wallet", icon: "👛" },
                  ].map((p) => (
                    <label key={p.value} className={`flex items-center gap-3 glass rounded-xl px-4 py-3.5 cursor-pointer transition-all ${form.payment === p.value ? "border-brand-500/60 bg-brand-500/5" : "hover:border-white/20"}`}>
                      <input type="radio" name="payment" value={p.value} checked={form.payment === p.value} onChange={() => up("payment", p.value)} className="accent-brand-500" />
                      <span>{p.icon}</span>
                      <span className="text-white text-sm font-medium">{p.label}</span>
                    </label>
                  ))}
                </div>
                {form.payment === "card" && (
                  <div className="space-y-3 mt-4">
                    <input value={form.cardNum} onChange={(e) => up("cardNum", e.target.value)} placeholder="Card Number" className="input-glass w-full border border-white/10" />
                    <div className="grid grid-cols-2 gap-3">
                      <input value={form.cardExp} onChange={(e) => up("cardExp", e.target.value)} placeholder="MM/YY" className="input-glass border border-white/10" />
                      <input value={form.cardCvv} onChange={(e) => up("cardCvv", e.target.value)} placeholder="CVV" className="input-glass border border-white/10" type="password" />
                    </div>
                  </div>
                )}
                <button onClick={() => setStep(2)} className="btn-primary px-8 py-3.5 rounded-xl font-semibold relative z-10 mt-2">
                  Continue to Review →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                  <Package className="w-5 h-5 text-brand-400" /> Review Order
                </h2>
                <div className="space-y-3 max-h-64 overflow-y-auto hide-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="glass rounded-xl p-3 flex gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        <p className="text-brand-400 font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handlePlaceOrder} disabled={placing} className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 mt-2">
                  <span className="relative z-10 flex items-center gap-2">
                    {placing ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                    ) : (
                      <><Zap className="w-5 h-5" /> Place Order · {formatPrice(finalTotal)}</>
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="glass rounded-2xl p-5 h-fit sticky top-36">
            <h3 className="text-white font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Items ({cartItems.length})</span><span className="text-white">{formatPrice(total)}</span></div>
              {couponDiscount > 0 && <div className="flex justify-between"><span className="text-green-400">Coupon Discount</span><span className="text-green-400">-{formatPrice(couponDiscount)}</span></div>}
              <div className="flex justify-between"><span className="text-gray-400">Delivery</span><span className={delivery === 0 ? "text-green-400" : "text-white"}>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span></div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between font-bold text-lg"><span className="text-white">Total</span><span className="text-white">{formatPrice(finalTotal)}</span></div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
              <Truck className="w-3.5 h-3.5 text-green-400" />
              <span>Estimated delivery: 2-3 business days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
