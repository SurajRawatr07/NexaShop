import React, { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, setUser, logout: storeLogout } = useStore();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const mockUser: User = {
      id: "user_" + Date.now(),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      phone: "+91 98765 43210",
      addresses: [
        {
          id: "addr_1",
          label: "Home",
          street: "123 MG Road",
          city: "Bangalore",
          state: "Karnataka",
          zip: "560001",
          country: "India",
          isDefault: true,
        },
      ],
    };
    setUser(mockUser);
    setLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const mockUser: User = {
      id: "user_" + Date.now(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    setUser(mockUser);
    setLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = {
      id: "google_" + Date.now(),
      name: "Google User",
      email: "user@gmail.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
    };
    setUser(mockUser);
    setLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, loginWithGoogle, logout: storeLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
