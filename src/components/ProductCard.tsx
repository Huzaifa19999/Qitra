"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  id?: number;
  name?: string;
  price?: number | any;
  image?: string | null;
  category?: string;
  stock?: number;
  product?: {
    id: number;
    name: string;
    price: number | any;
    image?: string | null;
    category?: { name: string } | string;
    stock: number;
  };
}

export default function ProductCard(props: ProductCardProps) {
  const p = props.product || props;
  const id = p.id;
  const name = p.name;
  const price = typeof p.price === 'number' ? p.price : Number(p.price || 0);
  const image = p.image || null;
  const category = typeof p.category === 'object' ? p.category?.name : p.category;
  const stock = p.stock ?? 0;
  const { addToCart } = useCart();
  const isOutOfStock = stock === 0;

  const [wishlisted, setWishlisted] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart({ id, name, price, image, stock }, 1);
      setAddedAnim(true);
      setTimeout(() => setAddedAnim(false), 600);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 500);
  };

  return (
    <Link
      href={`/products/${id}`}
      className="group flex flex-col bg-white/[0.03] backdrop-blur-sm border border-white/8 rounded-2xl overflow-hidden shadow-xl shadow-black/60 transition-all duration-300 hover:border-[#d4af37]/40 hover:shadow-[0_8px_40px_rgba(212,175,55,0.12)] hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#1a1a2e]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/15">
            <span className="font-heading italic text-sm">No Image</span>
          </div>
        )}

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOutOfStock ? (
            <span className="badge badge-sold-out backdrop-blur-md shadow-lg">
              Sold Out
            </span>
          ) : (
            <>
              {category && (
                <span className="badge badge-gold backdrop-blur-md shadow-lg">
                  {category}
                </span>
              )}
              {stock <= 5 && stock > 0 && (
                <span className="badge bg-orange-500/90 text-white backdrop-blur-md shadow-lg">
                  Only {stock} left
                </span>
              )}
            </>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-lg
            ${wishlisted
              ? 'bg-rose-500/90 border-rose-400/50 text-white'
              : 'bg-black/40 border-white/10 text-white/50 opacity-0 group-hover:opacity-100 hover:border-rose-400/50 hover:text-rose-400'
            }
            ${heartAnim ? 'animate-heart-beat' : ''}
          `}
        >
          <Heart
            className={`h-3.5 w-3.5 transition-all ${wishlisted ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow gap-3">
        <div>
          <h3 className="font-heading text-base text-white truncate group-hover:text-[#d4af37] transition-colors duration-200 leading-snug">
            {name}
          </h3>
          <p className="text-[#f0c040] font-semibold text-lg mt-1">
            ₨ {price.toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-auto w-full py-2.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2
            ${isOutOfStock
              ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
              : `bg-gradient-to-r from-[#d4af37] to-[#f0c040] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-[1.03] active:scale-95 ${addedAnim ? 'scale-95' : ''}`
            }
          `}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {isOutOfStock ? 'Out of Stock' : addedAnim ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
