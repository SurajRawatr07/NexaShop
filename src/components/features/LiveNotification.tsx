import React, { useState, useEffect } from "react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function LiveNotification() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const { theme } = useStore();
  const isDark = theme === "dark";

  const names = ["Rahul", "Priya", "Alex", "Sneha", "Arjun", "Meera", "Dev", "Ananya"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"];
  const actions = ["just bought", "added to cart", "purchased", "is viewing"];

  useEffect(() => {
    const show = () => {
      setCurrent(Math.floor(Math.random() * PRODUCTS.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 3500);
    };
    const interval = setInterval(show, 8000);
    const initial = setTimeout(show, 4000);
    return () => { clearInterval(interval); clearTimeout(initial); };
  }, []);

  const product = PRODUCTS[current];
  const name = names[Math.floor(Math.random() * names.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];

  return (
    <div className={cn(
      "fixed bottom-[76px] md:bottom-6 left-4 z-40 transition-all duration-400",
      visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
    )}>
      <div className={cn(
        "flex items-center gap-2.5 p-2.5 rounded-lg border shadow-lg max-w-xs",
        isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-200"
      )}>
        <img src={product?.image} alt="" className="w-10 h-10 object-contain rounded flex-shrink-0" />
        <div className="min-w-0">
          <p className={cn("text-xs font-semibold", isDark ? "text-gray-200" : "text-gray-800")}>
            {name} from {city}
          </p>
          <p className={cn("text-[10px]", isDark ? "text-gray-400" : "text-gray-500")}>
            {action} <span className="text-brand-500 font-medium">{product?.name?.slice(0, 22)}...</span>
          </p>
          <p className="text-green-600 text-[10px] font-bold">{product && formatPrice(product.price)}</p>
        </div>
      </div>
    </div>
  );
}
