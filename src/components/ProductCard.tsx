"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { ShoppingBag, Heart, Check, Star, Truck } from "lucide-react";

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

  // Strikethrough comparison price (approx 18% higher to show Daraz/Amazon style value)
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
    <div className="group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#12131d] hover:border-[#d4af37]/45 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 overflow-hidden">
      {/* ─── IMAGE CONTAINER ─── */}
      <Link href={`/products/${id}`} className="relative block aspect-[4/5] w-full overflow-hidden bg-[#181a26]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1b1c2b] to-[#10111a]">
            <span className="font-heading text-sm text-gray-500 font-medium tracking-widest uppercase">
              QITRA
            </span>
          </div>
        )}

        {/* Soft bottom vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12131d]/90 via-transparent to-transparent opacity-60" />

        {/* BADGES (TOP-LEFT) */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {category && (
            <span className="rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f3d078] border border-[#d4af37]/30 backdrop-blur-md">
              {category}
            </span>
          )}
          {isOutOfStock ? (
            <span className="rounded-md bg-rose-950/90 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-rose-300 border border-rose-500/30 backdrop-blur-md">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="rounded-md bg-amber-950/90 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30 backdrop-blur-md">
              Only {stock} Left
            </span>
          ) : null}
        </div>

        {/* WISHLIST BUTTON (TOP-RIGHT) */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
            wishlisted
              ? "border-rose-500 bg-rose-600 text-white shadow-md"
              : "border-white/15 bg-black/60 text-gray-300 hover:border-[#d4af37] hover:text-[#f3d078] hover:scale-110"
          }`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-current text-white" : ""}`} />
        </button>
      </Link>

      {/* ─── PRODUCT INFORMATION & ACTIONS ─── */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-1.5">
          {/* STAR RATINGS (Daraz/Amazon Credibility Standard) */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">4.9</span>
            <span className="text-[10px] text-gray-500">(18)</span>
          </div>

          {/* TITLE */}
          <Link href={`/products/${id}`} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-[#f3d078] transition-colors leading-snug">
              {name}
            </h3>
          </Link>

          {/* PRICING (PKR with strikethrough comparison) */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-bold text-[#f3d078]">
              Rs. {price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 line-through">
              Rs. {comparePrice.toLocaleString()}
            </span>
          </div>

          {/* TRUST BADGE: FREE DELIVERY / COD */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
              <Truck className="w-3 h-3" />
              Free Delivery
            </span>
            <span className="text-[10px] font-medium text-gray-400">
              Cash on Delivery
            </span>
          </div>
        </div>

        {/* ─── ADD TO CART ACTION BUTTON ─── */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isOutOfStock
                ? "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                : addedAnim
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/50 scale-[0.98]"
                : "bg-gradient-to-r from-[#f3d078] via-[#d4af37] to-[#b89228] hover:from-[#ffe094] hover:to-[#f3d078] text-black font-extrabold shadow-md shadow-[#d4af37]/20 hover:shadow-lg hover:shadow-[#d4af37]/35 active:scale-[0.98]"
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-7.5 h-7.5 text-white" />
                <span className="text-white text-sm">Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-7.5 h-7.5" />
                <span className="text-sm">{isOutOfStock ? "Sold Out" : "Add to Bag"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}