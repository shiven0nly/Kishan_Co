"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number; // per kg
  quantity: number; // in kg
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "kishancoCart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);

  const persist = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      const updated = exists
        ? prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item];
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    const updated = cartItems.filter((i) => i.productId !== productId);
    persist(updated);
  };

  const clearCart = () => persist([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
