import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const RESPONSES: Record<string, string> = {
  default: "Hi! I'm NexaBot 👋 Your AI shopping assistant. I can help you find products, track orders, and answer questions!",
  deals: "🔥 Today's top deals:\n• iPhone 16 Pro — 10% off\n• Sony WH-1000XM5 — 29% off\n• Nike Air Jordan — 13% off\nUse code NEXA20 for extra 20%!",
  coupon: "Active coupons:\n• NEXA20 — 20% off (min ₹5000)\n• SAVE500 — ₹500 off (min ₹2000)\n• FLASH50 — 50% off (min ₹10000)\n• NEWUSER — ₹100 off",
  order: "Track orders in Dashboard → Orders. Orders usually ship within 24 hours!",
  return: "30-day easy returns. Go to Dashboard → Orders → Return Item.",
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("deal") || lower.includes("offer") || lower.includes("sale")) return RESPONSES.deals;
  if (lower.includes("coupon") || lower.includes("code") || lower.includes("discount")) return RESPONSES.coupon;
  if (lower.includes("order") || lower.includes("track")) return RESPONSES.order;
  if (lower.includes("return") || lower.includes("refund")) return RESPONSES.return;
  return "Thanks for reaching out! Check our FAQ or browse deals. Use code NEXA20 for 20% off!";
}

interface Message { role: "bot" | "user"; text: string; }

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: RESPONSES.default }]);
  const [input, setInput] = useState("");
  const { theme } = useStore();
  const isDark = theme === "dark";

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const botMsg: Message = { role: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 800);
    setInput("");
  };

  return (
    <>
      {open && (
        <div className={cn(
          "fixed bottom-[76px] md:bottom-6 right-4 z-50 w-72 md:w-80 rounded-lg border shadow-2xl overflow-hidden animate-scale-in",
          isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-200"
        )}>
          {/* Header */}
          <div className={cn("flex items-center justify-between px-3 py-2.5 border-b", isDark ? "bg-brand-900/30 border-dark-500" : "bg-brand-500")}>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-white" />
              <div>
                <p className="text-white text-xs font-semibold">NexaBot</p>
                <p className="text-green-200 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full" /> Online
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-52 overflow-y-auto p-3 space-y-2.5 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" && "flex-row-reverse")}>
                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", msg.role === "bot" ? isDark ? "bg-brand-900/40" : "bg-blue-100" : isDark ? "bg-dark-400" : "bg-gray-100")}>
                  {msg.role === "bot" ? <Bot className="w-3 h-3 text-brand-500" /> : <User className="w-3 h-3 text-gray-500" />}
                </div>
                <div className={cn("max-w-[80%] rounded-lg px-2.5 py-1.5 text-xs leading-relaxed whitespace-pre-line", msg.role === "bot" ? isDark ? "bg-dark-500 text-gray-300" : "bg-gray-50 text-gray-700 border border-gray-100" : "bg-brand-500 text-white")}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className={cn("px-3 py-1.5 flex gap-1.5 overflow-x-auto hide-scrollbar border-t", isDark ? "border-dark-500" : "border-gray-100")}>
            {["Deals", "Coupons", "Track Order", "Returns"].map((q) => (
              <button key={q} onClick={() => setInput(q)} className={cn("text-[10px] px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 border transition-colors", isDark ? "border-dark-400 text-gray-400 hover:border-brand-500 hover:text-white" : "border-gray-200 text-gray-500 hover:border-brand-300 hover:text-brand-600")}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={cn("flex items-center gap-2 p-2.5 border-t", isDark ? "border-dark-500" : "border-gray-100")}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="form-input text-xs py-1.5 flex-1"
            />
            <button onClick={send} className="w-7 h-7 bg-brand-500 rounded flex items-center justify-center hover:bg-brand-600 transition-colors flex-shrink-0">
              <Send className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-[76px] md:bottom-6 right-4 z-40 w-11 h-11 bg-brand-500 hover:bg-brand-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
      >
        {open ? <X className="w-4 h-4 text-white" /> : (
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full" />
          </div>
        )}
      </button>
    </>
  );
}
