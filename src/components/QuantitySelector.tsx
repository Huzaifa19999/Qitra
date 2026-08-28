"use client";

import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange?: (qty: number) => void;
  onChange?: (qty: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  maxStock?: number;
  stock?: number;
  size?: 'sm' | 'md';
}

export default function QuantitySelector(props: QuantitySelectorProps) {
  const quantity = props.quantity;
  const maxStock = props.maxStock ?? props.stock ?? 999;
  const size = props.size || 'md';

  const isMin = quantity <= 1;
  const isMax = quantity >= maxStock;

  const btnClasses = `flex items-center justify-center rounded-full border border-[#d4af37] text-[#d4af37] transition-all duration-200 
    ${size === 'sm' ? 'h-8 w-8 text-lg' : 'h-10 w-10 text-xl'}
  `;

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onDecrease) {
      props.onDecrease();
    } else if (props.onQuantityChange && !isMin) {
      props.onQuantityChange(quantity - 1);
    } else if (props.onChange && !isMin) {
      props.onChange(quantity - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onIncrease) {
      props.onIncrease();
    } else if (props.onQuantityChange && !isMax) {
      props.onQuantityChange(quantity + 1);
    } else if (props.onChange && !isMax) {
      props.onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center space-x-3 bg-black/40 rounded-full p-1 border border-white/5 backdrop-blur-sm">
      <button
        onClick={handleDecrease}
        disabled={isMin}
        className={`${btnClasses} ${isMin ? 'opacity-50 cursor-not-allowed border-gray-600 text-gray-500' : 'hover:bg-[#d4af37]/20 hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]'}`}
        aria-label="Decrease quantity"
      >
        -
      </button>
      
      <span className={`font-medium text-white flex justify-center w-6 tabular-nums ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={isMax}
        className={`${btnClasses} ${isMax ? 'opacity-50 cursor-not-allowed border-gray-600 text-gray-500' : 'hover:bg-[#d4af37]/20 hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]'}`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
