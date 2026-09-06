"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Image from "next/image";
import QuantitySelector from "@/components/QuantitySelector";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowLeft, Package } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-sm mx-auto space-y-6 animate-fade-in-up">
          {/* Icon */}
          <div className="relative inline-flex">
            <div className="w-28 h-28 rounded-full bg-[#d4af37]/8 border border-[#d4af37]/15 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-[#d4af37]/60" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center">
              <Package className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-3xl text-white">Your cart is empty</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover our exclusive fragrances and find your signature scent.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="btn-gold px-8 py-3 rounded-lg uppercase tracking-wide inline-block text-sm">
              Shop Now
            </Link>
            <Link href="/category/women" className="btn-outline-gold px-8 py-3 rounded-lg uppercase tracking-wide inline-block text-sm">
              Women's Collection
            </Link>
          </div>

          {/* Category quick links */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-gray-600">
            {['men', 'women', 'unisex', 'children'].map((slug) => (
              <Link key={slug} href={`/category/${slug}`} className="hover:text-[#d4af37] transition-colors capitalize">
                {slug}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading text-4xl mb-1 text-gradient-gold">Shopping Cart</h1>
        <p className="text-gray-500 text-sm">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in your bag
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group glass border border-white/5 hover:border-[#d4af37]/15 p-4 rounded-2xl flex items-center gap-5 relative transition-all duration-300"
            >
              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                aria-label="Remove item"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Product image */}
              <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-[#0a0a0a] shrink-0 border border-white/8">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-700">No Img</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
                <div className="min-w-0">
                  <h3 className="font-heading text-lg text-white truncate leading-snug">{item.name}</h3>
                  <p className="text-[#d4af37] font-medium text-sm mt-0.5">{formatCurrency(item.price)}</p>
                </div>

                <div className="flex items-center gap-5 shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-600 uppercase tracking-wider">Qty</span>
                    <QuantitySelector
                      quantity={item.quantity}
                      maxStock={item.stock}
                      onQuantityChange={(q) => updateQuantity(item.id, q)}
                    />
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="text-[10px] text-gray-600 uppercase tracking-wider block mb-1">Subtotal</span>
                    <span className="text-base text-white font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue shopping */}
          <div className="pt-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-[#d4af37] hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="glass-gold p-7 rounded-2xl sticky top-24 space-y-6">
            <h2 className="font-heading text-2xl text-white">Order Summary</h2>

            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                <span className="text-white">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400 font-semibold text-xs">Free</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />

            <div className="flex justify-between text-lg text-white font-semibold">
              <span>Total</span>
              <span className="text-[#d4af37] text-xl">{formatCurrency(totalAmount)}</span>
            </div>

            <Link
              href="/checkout"
              className="btn-gold w-full block text-center py-4 rounded-xl uppercase tracking-wider font-semibold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-[#d4af37]/20"
            >
              Proceed to Checkout
            </Link>

            <p className="text-center text-[11px] text-gray-600 flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              Order confirmation via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
