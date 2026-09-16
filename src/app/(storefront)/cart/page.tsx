"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Image from "next/image";
import QuantitySelector from "@/components/QuantitySelector";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowLeft, Trash2, Sparkles } from "lucide-react";

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
        <div className="text-center max-w-md mx-auto space-y-6 animate-fade-in-up">
          <div className="relative inline-flex">
            <div className="w-24 h-24 rounded-full bg-[#c5a059]/[0.08] border border-[#c5a059]/20 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#dfba73]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-3xl md:text-4xl text-white font-medium">
              Your Bag is Empty
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
              Explore our luxury collections of Clothes, Makeup, Fine Jewellery, and Artisanal Perfumes to discover your signature pieces.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="btn-gold text-xs px-8 py-3.5">
              Explore Collection
            </Link>
            <Link href="/category/clothes" className="btn-outline-gold text-xs px-8 py-3.5">
              Browse Couture
            </Link>
          </div>

          {/* Quick category pills */}
          <div className="pt-4 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            {["clothes", "makeup", "jewellery", "perfume"].map((slug) => (
              <Link key={slug} href={`/category/${slug}`} className="hover:text-[#dfba73] transition-colors">
                {slug}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2.5 border-b border-white/[0.06] pb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#dfba73]">
          Maison Atelier
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-medium text-white tracking-tight">
          Shopping Bag
        </h1>
        <p className="text-gray-400 text-xs font-light">
          {totalItems} {totalItems === 1 ? "creation" : "creations"} in your bag
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Cart items list */}
        <div className="flex-1 w-full space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-white/[0.06] bg-[#0b0b0f] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-300 hover:border-[#c5a059]/30"
            >
              {/* Product Thumbnail */}
              <div className="w-20 h-24 relative rounded-xl overflow-hidden bg-[#111116] shrink-0 border border-white/[0.06]">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600 font-heading">
                    Qitra
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-heading text-base font-medium text-white truncate">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-[#dfba73]">
                  {formatCurrency(item.price)}
                </p>
              </div>

              {/* Controls: Quantity + Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                <QuantitySelector
                  quantity={item.quantity}
                  maxStock={item.stock}
                  size="md"
                  onQuantityChange={(q) => updateQuantity(item.id, q)}
                />

                <div className="text-right min-w-[80px]">
                  <span className="text-[14px] uppercase tracking-widest text-gray-500 block">Total</span>
                  <span className="text-[15px] font-semibold text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="text-gray-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-500/10"
                >
                  <Trash2 className="w-12 h-7" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#dfba73] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Browsing</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0 sticky top-28">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c10] p-7 space-y-6 shadow-2xl shadow-black/80">
            <h2 className="font-heading text-2xl font-medium text-white tracking-tight">
              Order Summary
            </h2>

            <div className="space-y-3.5 text-xs text-gray-400 font-light">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span className="text-white font-medium">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Complimentary Delivery</span>
                <span className="text-[#dfba73] font-semibold text-[10px] uppercase tracking-wider">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Authenticity Certificate</span>
                <span className="text-[#dfba73] font-semibold text-[10px] uppercase tracking-wider">Included</span>
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.06]" />

            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest text-gray-300 font-medium">Estimated Total</span>
              <span className="text-xl font-semibold text-[#dfba73]">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="btn-gold w-full text-center py-4 text-xs font-semibold uppercase tracking-[0.2em] shadow-xl shadow-[#c5a059]/20"
            >
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-gray-500 pt-1">
              <Sparkles className="w-3 h-3 text-[#dfba73]" />
              <span>Personalized WhatsApp Concierge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
