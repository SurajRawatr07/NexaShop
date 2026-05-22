import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";

const RESPONSES: Record<string, string> = {
  default: "Hi! I'm NexaBot, your AI shopping assistant. I can help you find products, track orders, and answer questions!",
  help: "I can help you with:\n• Finding products\n• Tracking your orders\n• Applying coupons\n• Product comparisons\n• Return & refund queries",
  deals: "🔥 Today's top deals:\n• iPhone 16 Pro — 10% off\n• Sony WH-1000XM5 — 29% off\n• Nike Air Jordan — 13% off\nUse code NEXA20 for extra 20%!",
  coupon: "Here are active coupons:\n• NEXA20 — 20% off (min ₹5000)\n• SAVE500 — ₹500 off (min ₹2000)\n• FLASH50 — 50% off (min ₹10000)\n• NEWUSER — ₹100 off",
  order: "You can track your orders in the Dashboard → Orders section. Orders usually ship within 24 hours!",
  return: "Our return policy: 30 days easy returns. Go to Dashboard → Orders → Return Item to initiate a return.",
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("deal") || lower.includes("offer") || lower.includes("sale")) return RESPONSES.deals;
  if (lower.includes("coupon") || lower.includes("code") || lower.includes("discount")) return RESPONSES.coupon;
  if (lower.includes("order") || lower.includes("track")) return RESPONSES.order;
  if (lower.includes("return") || lower.includes("refund")) return RESPONSES.return;
  if (lower.includes("help") || lower.includes("what can")) return RESPONSES.help;
  return "Thanks for reaching out! I'll connect you with our support team. In the meantime, check our FAQ or browse deals. Use code NEXA20 for 20% off!";
}

interface Message { role: "bot" | "user"; text: string; }

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: RESPONSES.default }]);
  const [input, setInput] = useState("");
  const { isAuthenticated } = useStore();

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
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 w-80 md:w-96 glass-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-brand-600/20 to-indigo-600/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-brand-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">NexaBot</p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Online • AI Powered
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "bot" ? "bg-brand-500/20" : "bg-indigo-500/20"}`}>
                  {msg.role === "bot" ? <Bot className="w-3 h-3 text-brand-400" /> : <User className="w-3 h-3 text-indigo-400" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === "bot" ? "glass text-gray-300" : "bg-brand-600/40 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto hide-scrollbar">
            {["Deals", "Coupons", "Track Order", "Returns"].map((q) => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="glass text-xs text-gray-300 px-2.5 py-1 rounded-full whitespace-nowrap hover:border-brand-500/40 hover:text-white transition-all flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-brand-500/50"
            />
            <button
              onClick={send}
              className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center hover:bg-brand-500 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 w-12 h-12 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-full shadow-lg glow-purple flex items-center justify-center hover:scale-110 transition-transform"
        style={{ bottom: open ? "auto" : undefined }}
      >
        {open ? <X className="w-5 h-5 text-white" /> : (
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </button>
    </>
  );
}
