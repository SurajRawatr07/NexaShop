import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useStore } from "@/store/useStore";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import WishlistPage from "@/pages/WishlistPage";
import CheckoutPage from "@/pages/CheckoutPage";
import DashboardPage from "@/pages/DashboardPage";
import CategoryPage from "@/pages/CategoryPage";
import DealsPage from "@/pages/DealsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import MainLayout from "@/components/layout/MainLayout";
import CartDrawer from "@/components/features/CartDrawer";
import SearchOverlay from "@/components/features/SearchOverlay";
import QuickViewModal from "@/components/features/QuickViewModal";
import FloatingChat from "@/components/features/FloatingChat";
import LiveNotification from "@/components/features/LiveNotification";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartDrawer />
      <SearchOverlay />
      <QuickViewModal />
      <FloatingChat />
      <LiveNotification />
      <Routes>
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
