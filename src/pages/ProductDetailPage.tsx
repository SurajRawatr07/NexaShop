import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Share2, Minus, Plus, ChevronRight, Zap } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/store/useStore";
import { formatPrice, truncate } from "@/lib/utils";
import ProductCard from "@/components/features/ProductCard";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } = useStore();

  const [selImg, setSelImg] = useState(0);
  const [selColor, setSelColor] = useState("");
  const [selSize, setSelSize] = useState("");
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "specs">("overview");

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setSelColor(product.colors?.[0] || "");
      setSelSize(product.sizes?.[0] || "");
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-36 text-center py-20">
        <h2 className="text-white text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-brand-400 mt-4 inline-block">← Back to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const savings = (product.originalPrice - product.price) * qty;

  const handleAddToCart = async () => {
    setAdding(true);
    await new Promise((r) => setTimeout(r, 600));
    addToCart(product, qty, selColor, selSize);
    setAdding(false);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    toast.success("Redirecting to checkout...");
  };

  return (
    <div className="pt-[130px] min-h-screen">
      <div className="container-custom py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/category/${product.category}`} className="hover:text-white transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300 truncate max-w-[200px]">{truncate(product.name, 30)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square glass rounded-2xl overflow-hidden group">
              <img
                src={product.images[selImg] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.assured && (
                <span className="absolute top-4 left-4 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <ShieldCheck className="w-3 h-3" /> ASSURED
                </span>
              )}
              {product.badge && (
                <span className="absolute top-4 right-4 badge-sale">{product.discount}% OFF</span>
              )}
              <div className="absolute bottom-4 right-4 flex items-center gap-1 glass rounded-full px-2 py-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-300">{product.viewers?.toLocaleString()} viewing</span>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelImg(i)}
                    className={`w-16 h-16 glass rounded-xl overflow-hidden border-2 transition-all ${i === selImg ? "border-brand-500" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-brand-400 font-semibold text-sm">{product.brand}</span>
                {product.badge && <span className="badge-trending">{product.badge.toUpperCase()}</span>}
                {product.inStock ? (
                  <span className="text-green-400 text-xs font-semibold">● In Stock</span>
                ) : (
                  <span className="text-red-400 text-xs font-semibold">● Out of Stock</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight font-grotesk">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 glass rounded-lg px-3 py-1.5">
                <span className="text-white font-bold">{product.rating}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
                  ))}
                </div>
              </div>
              <span className="text-gray-400 text-sm">{product.reviews.toLocaleString()} reviews</span>
              <span className="text-brand-400 text-sm cursor-pointer hover:underline">Write a review</span>
            </div>

            {/* Price */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
                {product.discount > 0 && (
                  <span className="text-gray-400 line-through text-lg">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {product.discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="badge-sale">{product.discount}% OFF</span>
                  <span className="text-green-400 text-sm font-semibold">Save {formatPrice(product.originalPrice - product.price)}</span>
                </div>
              )}
              {qty > 1 && (
                <p className="text-green-400 text-sm mt-1">Total savings: {formatPrice(savings)}</p>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-2">Color: <span className="text-brand-400">{selColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelColor(c)}
                      className={`glass rounded-lg px-3 py-1.5 text-sm transition-all ${selColor === c ? "border-brand-500 text-brand-400 bg-brand-500/10" : "text-gray-300 hover:border-white/30"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-2">Size: <span className="text-brand-400">{selSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelSize(s)}
                      className={`glass rounded-lg px-3 py-2 text-sm font-semibold transition-all ${selSize === s ? "border-brand-500 text-brand-400 bg-brand-500/10" : "text-gray-300 hover:border-white/30"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-gray-300 text-sm font-semibold">Quantity:</p>
              <div className="flex items-center gap-3 glass rounded-xl px-3 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-white">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-bold w-8 text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stockCount, qty + 1))} className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-white">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-500 text-sm">{product.stockCount} available</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={adding || !product.inStock}
                className="flex-1 btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {adding ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding...</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                  )}
                </span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-dark-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                <Zap className="w-5 h-5" /> Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 glass rounded-xl flex items-center justify-center transition-all ${inWishlist ? "bg-pink-500/20 border-pink-500/40" : "hover:bg-pink-500/10"}`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-pink-400 text-pink-400" : "text-gray-300"}`} />
              </button>
            </div>

            {/* Delivery check */}
            <div className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Truck className="w-4 h-4" />
                <span className="font-semibold">{product.freeDelivery ? "FREE Delivery" : "₹40 Delivery"}</span>
                <span className="text-gray-400">· {product.deliveryDays} day{product.deliveryDays > 1 ? "s" : ""}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                  placeholder="Enter pincode"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500/50"
                />
                <button className="px-4 py-2 glass rounded-lg text-brand-400 text-sm font-semibold hover:bg-brand-500/10 transition-colors">Check</button>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> 30-day Returns</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Genuine Product</span>
              </div>
            </div>

            {/* Seller */}
            {product.sellers && (
              <p className="text-gray-400 text-sm">
                Sold by: <span className="text-brand-400 font-semibold">{product.sellers}</span>
              </p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="glass rounded-2xl overflow-hidden mb-12">
          <div className="flex border-b border-white/10">
            {(["overview", "reviews", "specs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold capitalize transition-all ${activeTab === tab ? "text-brand-400 border-b-2 border-brand-500 bg-brand-500/5" : "text-gray-400 hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">{product.description}</p>
                <h4 className="text-white font-semibold mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="text-center">
                    <p className="text-5xl font-black text-white">{product.rating}</p>
                    <div className="flex justify-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((r) => {
                      const pct = r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 7 : r === 2 ? 2 : 1;
                      return (
                        <div key={r} className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-4">{r}★</span>
                          <div className="flex-1 h-1.5 bg-dark-500 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-gray-400 text-sm text-center">Verified reviews from real customers</p>
              </div>
            )}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 glass rounded-lg px-4 py-3">
                    <span className="text-brand-400 text-sm font-bold">✓</span>
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-grotesk text-white mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
