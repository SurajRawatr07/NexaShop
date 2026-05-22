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
        toast.success(`${product.name.slice(0, 25)}... added to cart!`);
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
      cartTotal: () => {
        const items = get().cartItems;
        return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
      cartCount: () => {
        return get().cartItems.reduce((sum, i) => sum + i.quantity, 0);
      },

      // Wishlist
      wishlistItems: [],
      addToWishlist: (product) => {
        set((state) => ({ wishlistItems: [...state.wishlistItems, product] }));
        toast.success("Added to wishlist ♥");
      },
      removeFromWishlist: (id) => {
        set((state) => ({ wishlistItems: state.wishlistItems.filter((i) => i.id !== id) }));
        toast("Removed from wishlist");
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
      }),
    }
  )
);
