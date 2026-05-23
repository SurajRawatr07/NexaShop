import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Minus, Plus, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/store/useStore";
import { formatPrice, truncate } from "@/lib/utils";
import ProductCard from "@/components/features/ProductCard";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, theme } = useStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();

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
      <div className="pt-[96px] text-center py-20 bg-theme-secondary min-h-screen">
        <h2 className="text-theme-primary text-xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-brand-500 mt-3 inline-block text-sm">← Back to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);

  const handleAddToCart = async () => {
    setAdding(true);
    await new Promise((r) => setTimeout(r, 500));
    addToCart(product, qty, selColor, selSize);
    setAdding(false);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  const cardClass = cn("rounded border", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card");
  const chipClass = (active: boolean) => cn(
    "px-3 py-1.5 rounded border text-xs font-medium transition-colors cursor-pointer",
    active
      ? isDark ? "border-brand-500 text-brand-400 bg-brand-900/20" : "border-brand-500 text-brand-500 bg-blue-50"
      : isDark ? "border-dark-400 text-gray-300 hover:border-dark-300" : "border-gray-200 text-gray-700 hover:border-gray-300"
  );

  return (
    <div className="pt-[96px] min-h-screen bg-theme-secondary">
      <div className="container-custom py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-theme-muted mb-4 flex-wrap">
          <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-brand-500 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/category/${product.category}`} className="hover:text-brand-500 transition-colors capitalize">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-theme-secondary truncate max-w-[180px]">{truncate(product.name, 30)}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Image Gallery */}
          <div className={cn("rounded border p-4", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
            <div className={cn("aspect-square rounded overflow-hidden flex items-center justify-center relative", isDark ? "bg-dark-500" : "bg-gray-50")}>
              <img
                src={product.images[selImg] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
              {product.assured && (
                <span className={cn("absolute top-2 left-2 flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded", isDark ? "bg-blue-900/60 text-blue-300" : "bg-blue-50 text-blue-600 border border-blue-100")}>
                  <ShieldCheck className="w-2.5 h-2.5" /> Assured
                </span>
              )}
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 badge-sale">{product.discount}% OFF</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelImg(i)}
                    className={cn("w-14 h-14 rounded border overflow-hidden flex-shrink-0 transition-all", i === selImg ? "border-brand-500" : isDark ? "border-dark-400" : "border-gray-200")}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <div className={cn("rounded border p-4", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-brand-500 text-xs font-semibold">{product.brand}</span>
                {product.badge && <span className="badge-sale text-[10px]">{product.badge.toUpperCase()}</span>}
                {product.inStock
                  ? <span className="text-green-600 text-xs font-semibold">● In Stock</span>
                  : <span className="text-red-500 text-xs font-semibold">● Out of Stock</span>}
              </div>
              <h1 className="text-lg md:text-xl font-bold text-theme-primary leading-snug mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="rating-chip">{product.rating} ★</span>
                <span className="text-theme-muted text-xs">{product.reviews.toLocaleString()} reviews</span>
                {product.viewers && <span className="text-xs text-theme-muted">· {product.viewers.toLocaleString()} viewing</span>}
              </div>

              {/* Price */}
              <div className={cn("rounded p-3 border mb-3", isDark ? "border-dark-400 bg-dark-500" : "border-gray-100 bg-gray-50")}>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-theme-primary">{formatPrice(product.price)}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-theme-muted line-through text-sm">{formatPrice(product.originalPrice)}</span>
                      <span className="text-green-600 font-bold text-sm">{product.discount}% off</span>
                    </>
                  )}
                </div>
                {product.discount > 0 && (
                  <p className="text-green-600 text-xs mt-0.5">You save {formatPrice(product.originalPrice - product.price)}</p>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-3">
                  <p className="text-theme-secondary text-xs font-semibold mb-1.5">Color: <span className="text-brand-500">{selColor}</span></p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((c) => (
                      <button key={c} onClick={() => setSelColor(c)} className={chipClass(selColor === c)}>{c}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-3">
                  <p className="text-theme-secondary text-xs font-semibold mb-1.5">Size: <span className="text-brand-500">{selSize}</span></p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button key={s} onClick={() => setSelSize(s)} className={chipClass(selSize === s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-3">
                <p className="text-theme-secondary text-xs font-semibold">Qty:</p>
                <div className={cn("flex items-center rounded border overflow-hidden", isDark ? "border-dark-400" : "border-gray-200")}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className={cn("w-8 h-8 flex items-center justify-center", isDark ? "hover:bg-dark-400 text-gray-300" : "hover:bg-gray-50 text-gray-600")}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-theme-primary font-bold w-10 text-center text-sm border-x border-inherit">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stockCount, qty + 1))} className={cn("w-8 h-8 flex items-center justify-center", isDark ? "hover:bg-dark-400 text-gray-300" : "hover:bg-gray-50 text-gray-600")}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-theme-muted text-xs">{product.stockCount} available</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || !product.inStock}
                  className="flex-1 btn-flipkart py-2.5 rounded font-semibold flex items-center justify-center gap-1.5 text-sm"
                >
                  {adding ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Adding...</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" />Add to Cart</>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 btn-buy-now py-2.5 rounded font-semibold text-sm"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn("w-10 h-10 rounded border flex items-center justify-center transition-colors flex-shrink-0", inWishlist ? isDark ? "border-red-800 bg-red-900/20" : "border-red-200 bg-red-50" : isDark ? "border-dark-400 hover:border-dark-300" : "border-gray-200 hover:border-gray-300")}
                >
                  <Heart className={cn("w-4 h-4", inWishlist ? "fill-red-500 text-red-500" : "text-theme-muted")} />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className={cn("rounded border p-4 space-y-2.5", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
              <div className="flex items-center gap-2 text-xs">
                <Truck className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600 font-semibold">{product.freeDelivery ? "FREE Delivery" : "₹40 Delivery"}</span>
                <span className="text-theme-muted">· {product.deliveryDays} day{product.deliveryDays > 1 ? "s" : ""}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                  placeholder="Enter Pincode"
                  className="form-input flex-1 text-xs py-1.5"
                />
                <button className="btn-flipkart px-3 py-1.5 rounded text-xs">Check</button>
              </div>
              <div className="flex items-center gap-4 text-xs text-theme-muted">
                <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> 30-day Returns</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Genuine Product</span>
              </div>
              {product.sellers && (
                <p className="text-xs text-theme-muted">Sold by: <span className="text-brand-500 font-medium">{product.sellers}</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={cn("rounded border mb-6 overflow-hidden", isDark ? "bg-dark-600 border-dark-400" : "bg-white border-gray-100 shadow-card")}>
          <div className={cn("flex border-b", isDark ? "border-dark-400" : "border-gray-100")}>
            {(["overview", "reviews", "specs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn("flex-1 py-3 text-xs font-semibold capitalize transition-colors border-b-2", activeTab === tab ? isDark ? "text-brand-400 border-brand-500" : "text-brand-500 border-brand-500" : "text-theme-muted border-transparent hover:text-theme-primary")}
              >
                {tab === "overview" ? "Overview" : tab === "reviews" ? "Reviews" : "Specifications"}
              </button>
            ))}
          </div>
          <div className="p-4">
            {activeTab === "overview" && (
              <div>
                <p className="text-theme-secondary text-sm leading-relaxed mb-3">{product.description}</p>
                <h4 className="text-theme-primary font-semibold text-sm mb-2">Key Features</h4>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-theme-secondary text-xs">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-3">
                <div className={cn("flex items-center gap-4 p-3 rounded border", isDark ? "border-dark-400 bg-dark-500" : "border-gray-100 bg-gray-50")}>
                  <div className="text-center">
                    <p className="text-4xl font-black text-theme-primary">{product.rating}</p>
                    <div className="flex justify-center mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
                      ))}
                    </div>
                    <p className="text-theme-muted text-xs mt-0.5">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((r) => {
                      const pct = r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 7 : r === 2 ? 2 : 1;
                      return (
                        <div key={r} className="flex items-center gap-2">
                          <span className="text-xs text-theme-muted w-4">{r}★</span>
                          <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", isDark ? "bg-dark-400" : "bg-gray-200")}>
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-theme-muted w-7">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className={cn("flex items-center gap-2 p-2.5 rounded border text-xs", isDark ? "border-dark-400" : "border-gray-100")}>
                    <span className="text-brand-500 font-bold">✓</span>
                    <span className="text-theme-secondary">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className={cn("rounded border p-4", isDark ? "bg-dark-700 border-dark-500" : "bg-white border-gray-100 shadow-card")}>
            <h2 className="text-theme-primary font-bold text-base mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
