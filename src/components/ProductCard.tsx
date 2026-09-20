"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { ShoppingBag, Heart, Check, Star, Truck, Sparkles } from "lucide-react";

interface ProductCardProps {
  id?: number;
  name?: string;
  price?: number | string;
  image?: string | null;
  category?: string;
  stock?: number;
  product?: {
    id: number;
    name: string;
    price: number | string;
    image?: string | null;
    category?: { name: string } | string;
    stock: number;
  };
}

export default function ProductCard(props: ProductCardProps) {
  const p = props.product || props;

  const id = p.id ?? 0;
  const name = p.name ?? "Luxury Creation";
  const price = typeof p.price === "number" ? p.price : Number(p.price || 0);
  const image = p.image || null;
  const category = typeof p.category === "object" ? p.category?.name : p.category;
  const stock = p.stock ?? 0;

  const { addToCart } = useCart();

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const comparePrice = Math.round(price * 1.18);

  const [wishlisted, setWishlisted] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOutOfStock) {
      addToCart({ id, name, price, image, stock }, 1);
      setAddedAnim(true);
      setTimeout(() => setAddedAnim(false), 1200);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11121c]/90 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8),0_0_24px_rgba(212,175,55,0.12)]">
      {/* ─── IMAGE CONTAINER ─── */}
      <Link
        href={`/products/${id}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[#161824]"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1b1c2e] via-[#12131f] to-[#0a0b12]">
            <span className="font-heading text-xs font-semibold tracking-[0.3em] text-amber-100/30 uppercase">
              QITRA
            </span>
          </div>
        )}

        {/* Ambient Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11121c] via-transparent to-black/30 opacity-70 transition-opacity group-hover:opacity-40" />

        {/* BADGES (TOP-LEFT) */}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {category && (
            <span className="inline-flex items-center gap-1 rounded-sm border border-[#d4af37]/30 bg-black/70 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-widest text-[#f3d078] shadow-sm backdrop-blur-md">
              <Sparkles className="h-2.5 w-2.5 text-[#f3d078]" />
              {category}
            </span>
          )}
          {isOutOfStock ? (
            <span className="rounded-sm border border-rose-500/40 bg-rose-950/80 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-rose-200 backdrop-blur-md shadow-sm">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="rounded-sm border border-amber-500/40 bg-amber-950/80 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md shadow-sm">
              Only {stock} Left
            </span>
          ) : null}
        </div>

        {/* WISHLIST BUTTON (TOP-RIGHT) */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-md ${
            wishlisted
              ? "border-rose-500/80 bg-rose-600 text-white shadow-lg shadow-rose-950/50 scale-105"
              : "border-white/15 bg-black/40 text-gray-300 hover:border-[#d4af37] hover:bg-black/80 hover:text-[#f3d078] hover:scale-110"
          }`}
        >
          <Heart className={`h-6 w-6 transition-transform ${wishlisted ? "fill-current text-white scale-110" : ""}`} />
        </button>
      </Link>

      {/* ─── PRODUCT INFORMATION & ACTIONS ─── */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-2">
          {/* RATINGS & REVIEWS */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-200">4.9</span>
            <span className="text-[10px] text-gray-400 font-medium">(18)</span>
          </div>

          {/* TITLE */}
          <Link href={`/products/${id}`} className="block group/title">
            <h3 className="line-clamp-2 text-sm font-medium text-gray-100 group-hover/title:text-[#f3d078] transition-colors leading-snug tracking-tight">
              {name}
            </h3>
          </Link>

          {/* PRICING */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-base font-bold text-[#f3d078] tracking-tight">
              Rs. {price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400/80 line-through font-normal">
              Rs. {comparePrice.toLocaleString()}
            </span>
          </div>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30 backdrop-blur-sm">
              <Truck className="h-3 w-3 text-emerald-400" />
              Free Delivery
            </span>
            <span className="inline-flex items-center text-[10px] font-medium text-gray-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
              Cash on Delivery
            </span>
          </div>
        </div>

        {/* ─── ACTION BUTTON ─── */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
              isOutOfStock
                ? "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                : addedAnim
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 scale-[0.98]"
                : "bg-gradient-to-r from-[#f3d078] via-[#d4af37] to-[#b89228] text-black hover:brightness-110 shadow-md shadow-[#d4af37]/15 hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-[0.98] cursor-pointer"
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="h-4 w-4 text-white stroke-[3]" />
                <span className="text-white text-xs font-bold">Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>{isOutOfStock ? "Sold Out" : "Add to Bag"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}