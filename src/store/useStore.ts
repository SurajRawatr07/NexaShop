import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, WishlistItem, User } from "@/types";
import toast from "react-hot-toast";

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (t: "light" | "dark") => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;

  // UI State
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Coupon
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        set({ user: null, isAuthenticated: false });
        toast.success("Logged out successfully");
      },

      // Theme
      theme: "light",
      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        set({ theme: next });
        document.documentElement.classList.toggle("dark", next === "dark");
      },
      setTheme: (t) => {
        set({ theme: t });
        document.documentElement.classList.toggle("dark", t === "dark");
      },

      // Cart
      cartItems: [],
      addToCart: (product, quantity = 1, color, size) => {
        const existing = get().cartItems.find((i) => i.id === product.id);
        if (existing) {
          set((state) => ({
            cartItems: state.cartItems.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...product, quantity, selectedColor: color, selectedSize: size }],
          }));
        }
        toast.success(`Added to cart!`, { icon: "🛒", duration: 1800 });
      },
      removeFromCart: (id) => {
        set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) }));
      },
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          cartItems: state.cartItems.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },
      clearCart: () => set({ cartItems: [], appliedCoupon: null, couponDiscount: 0 }),
      cartTotal: () => get().cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      cartCount: () => get().cartItems.reduce((sum, i) => sum + i.quantity, 0),

      // Wishlist
      wishlistItems: [],
      addToWishlist: (product) => {
        set((state) => ({ wishlistItems: [...state.wishlistItems, product] }));
        toast.success("Saved to wishlist", { icon: "♥" });
      },
      removeFromWishlist: (id) => {
        set((state) => ({ wishlistItems: state.wishlistItems.filter((i) => i.id !== id) }));
      },
      isInWishlist: (id) => get().wishlistItems.some((i) => i.id === id),
      toggleWishlist: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      // UI
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      quickViewProduct: null,
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // Recently Viewed
      recentlyViewed: [],
      addToRecentlyViewed: (product) => {
        set((state) => ({
          recentlyViewed: [product, ...state.recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 10),
        }));
      },

      // Coupon
      appliedCoupon: null,
      couponDiscount: 0,
      applyCoupon: (code, discount) => set({ appliedCoupon: code, couponDiscount: discount }),
      removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),
    }),
    {
      name: "nexashop-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        recentlyViewed: state.recentlyViewed,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle("dark", state.theme === "dark");
        }
      },
    }
  )
);
