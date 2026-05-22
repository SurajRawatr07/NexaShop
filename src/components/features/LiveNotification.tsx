import React, { useState, useEffect } from "react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

const MESSAGES = [
  "just bought",
  "added to cart",
  "is viewing",
  "purchased",
];

export default function LiveNotification() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  const names = ["Rahul", "Priya", "Alex", "Sneha", "Arjun", "Meera", "Dev", "Ananya", "Rohan", "Nisha"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"];

  useEffect(() => {
    const show = () => {
      setCurrent(Math.floor(Math.random() * PRODUCTS.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const interval = setInterval(show, 8000);
    const initial = setTimeout(show, 3000);

    return () => { clearInterval(interval); clearTimeout(initial); };
  }, []);

  const product = PRODUCTS[current];
  const name = names[Math.floor(Math.random() * names.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const action = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-4 z-40 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="glass-dark border border-white/10 rounded-2xl p-3 flex items-center gap-3 max-w-xs shadow-2xl">
        <img src={product?.image} alt="" className="w-12 h-12 object-cover rounded-xl flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-white text-xs font-semibold">
            {name} from {city}
          </p>
          <p className="text-gray-400 text-xs">{action} <span className="text-brand-400">{product?.name?.slice(0, 20)}...</span></p>
          <p className="text-green-400 text-xs font-bold">{product && formatPrice(product.price)}</p>
        </div>
        <div className="w-8 h-8 bg-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-4 h-4 text-brand-400" />
        </div>
      </div>
    </div>
  );
}
