export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  badge?: "new" | "sale" | "trending" | "bestseller" | "limited";
  inStock: boolean;
  stockCount: number;
  deliveryDays: number;
  freeDelivery: boolean;
  assured: boolean;
  description: string;
  features: string[];
  colors?: string[];
  sizes?: string[];
  sellers?: string;
  viewers?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem extends Product {}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  subcategories: string[];
  color: string;
  gradient: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  maxDiscount?: number;
}

export type SortOption = "relevance" | "price-low" | "price-high" | "rating" | "newest" | "discount";

export type FilterState = {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  freeDelivery: boolean;
  discount: number;
};
