"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { CartItem, CartContextType } from '@/types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

type AddProductInput = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  stock: number;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('luxe_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('luxe_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (product: AddProductInput | CartItem, quantity = 1) => {
    setItems((prev) => {
      const pId = 'id' in product ? product.id : (product as any).id;
      const existing = prev.find((item) => item.id === pId);
      if (existing) {
        return prev.map((item) =>
          item.id === pId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          stock: product.stock,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const clamped = Math.max(1, Math.min(quantity, item.stock));
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalAmount = useMemo(() => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, addItem: addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
