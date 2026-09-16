"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuantitySelector from "@/components/QuantitySelector";
import { useCart } from "@/components/CartProvider";
import { ShoppingBag, Check, Zap } from "lucide-react";

interface ProductProps {
  id: number;
  name: string;
  price: number | string;
  image: string | null;
  stock: number;
}

export default function ProductActions({ product }: { product: ProductProps }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        stock: product.stock,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        stock: product.stock,
      },
      quantity
    );
    router.push("/checkout");
  };

  if (product.stock === 0) {
    return (
      <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 text-center">
        <p className="text-sm font-bold text-rose-300 uppercase tracking-wider">
          Currently Out of Stock
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Our artisans are preparing new inventory. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity Row */}
      <div className="flex items-center justify-between pb-1">
        <span className="text-md font-bold uppercase tracking-wider text-gray-400">
          Quantity
        </span>
        <QuantitySelector
          quantity={quantity}
          maxStock={product.stock}
          onQuantityChange={(q) => setQuantity(q)}
        />
      </div>

      {/* Action Buttons (Daraz / Amazon Standard: Dual Add to Cart & Buy Now) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        
        {/* 1. Add to Bag */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-3.5 px-5 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isAdded
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
              : "border border-[#d4af37]/60 bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#f3d078] hover:text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-7.5 h-7.5 text-white" />
              <span className="text-sm">Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-7.5 h-7.5" />
              <span className="text-sm">Add to Bag</span>
            </>
          )}
        </button>

        {/* 2. Buy Now (Instant Checkout) */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full py-3.5 px-5 rounded-md text-xs font-extrabold uppercase tracking-widedr bg-gradient-to-r from-[#f3d078] via-[#d4af37] to-[#b89228] hover:from-[#ffe094] hover:to-[#f3d078] text-black shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Zap className="w-7.5 h-7.5 fill-current" />
          <span className="text-sm">Buy Now</span>
        </button>
      </div>
    </div>
  );
}
