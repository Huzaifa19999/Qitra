"use client";

import { useState } from "react";
import QuantitySelector from "@/components/QuantitySelector";
import { useCart } from "@/components/CartProvider";

interface ProductProps {
  id: number;
  name: string;
  price: number | any;
  image: string | null;
  stock: number;
}

export default function ProductActions({ product }: { product: ProductProps }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

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
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (product.stock === 0) {
    return (
      <button disabled className="w-full py-4 bg-gray-800 text-gray-500 font-semibold rounded-md cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-gray-400 font-body">Quantity:</span>
        <QuantitySelector 
          quantity={quantity} 
          maxStock={product.stock}
          onQuantityChange={(q) => setQuantity(q)}
        />
      </div>
      
      <button 
        onClick={handleAddToCart}
        className={`w-full py-4 text-lg font-semibold uppercase tracking-wider rounded-md transition-all ${
          isAdded 
            ? "bg-green-600 text-white" 
            : "btn-gold hover:scale-[1.02]"
        }`}
      >
        {isAdded ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
