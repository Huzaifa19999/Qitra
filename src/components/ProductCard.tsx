"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart({ id, name, price, image, stock }, 1);
    }
  };

  return (
    <Link 
      href={`/products/${id}`}
      className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg shadow-black/50 transition-all duration-300 hover:border-[#d4af37]/50 hover:shadow-[#d4af37]/10"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-[#1a1a2e]">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            <span className="font-playfair italic">No Image</span>
          </div>
        )}
        
        {isOutOfStock && (
          <div className="absolute top-3 right-3 bg-red-500/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg border border-red-400/50">
            OUT OF STOCK
          </div>
        )}
        
        {category && !isOutOfStock && (
          <div className="absolute top-3 left-3 bg-[#d4af37]/90 text-black text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
            {category}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-playfair text-lg text-white mb-2 truncate group-hover:text-[#d4af37] transition-colors">{name}</h3>
        <p className="text-[#f0c040] font-semibold text-xl mb-4 flex-grow">
          ₨ {price.toLocaleString()}
        </p>
        
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 text-sm uppercase tracking-wider
            ${isOutOfStock 
              ? 'bg-white/10 text-white/40 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#d4af37] to-[#f0c040] text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-[1.02]'
            }
          `}
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
