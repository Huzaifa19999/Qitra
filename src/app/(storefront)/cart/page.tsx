"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Image from "next/image";
import QuantitySelector from "@/components/QuantitySelector";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="glass inline-block p-12 rounded-2xl mb-8">
          <svg className="w-24 h-24 text-[#d4af37] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="font-heading text-3xl mb-4 text-white">Your cart is empty</h1>
          <p className="text-gray-400 mb-8 font-body">Discover our exclusive fragrances and find your signature scent.</p>
          <Link href="/products" className="btn-gold px-8 py-3 rounded-md uppercase tracking-wide inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-heading text-4xl mb-2 text-gradient-gold">Shopping Cart</h1>
      <p className="text-gray-400 mb-10 font-body">{totalItems} item{totalItems !== 1 ? "s" : ""} in your bag</p>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="glass p-4 rounded-xl flex items-center gap-6 relative group transition-all hover:bg-[#1a1a2e]/50">
              <button 
                onClick={() => removeFromCart(item.id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="w-24 h-24 relative rounded-md overflow-hidden bg-[#0a0a0a] shrink-0 border border-white/10">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Img</div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl text-white mb-1">{item.name}</h3>
                  <p className="text-[#d4af37] font-medium">{formatCurrency(item.price)}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 uppercase">Qty</span>
                    <QuantitySelector 
                      quantity={item.quantity} 
                      maxStock={item.stock}
                      onQuantityChange={(q) => updateQuantity(item.id, q)}
                    />
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <span className="text-xs text-gray-500 uppercase block mb-1">Total</span>
                    <span className="text-lg text-white font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-6">
            <Link href="/products" className="text-[#d4af37] hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-wide">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[400px] shrink-0">
          <div className="glass-gold p-8 rounded-xl sticky top-24">
            <h2 className="font-heading text-2xl text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-300 font-body">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Delivery</span>
                <span>Standard Delivery</span>
              </div>
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between text-xl text-white font-medium">
                <span>Total</span>
                <span className="text-[#d4af37]">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="btn-gold w-full block text-center py-4 rounded-md uppercase tracking-wider font-semibold hover:scale-[1.02] transition-transform">
              Proceed to Checkout
            </Link>
            
            <p className="text-center text-xs text-gray-500 mt-4">Order confirmation sent instantly via WhatsApp.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
