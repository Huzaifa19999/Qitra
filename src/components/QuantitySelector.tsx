"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange?: (qty: number) => void;
  onChange?: (qty: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  maxStock?: number;
  stock?: number;
  size?: "sm" | "md";
}

export default function QuantitySelector(props: QuantitySelectorProps) {
  const quantity = props.quantity;
  const maxStock = props.maxStock ?? props.stock ?? 999;
  const size = props.size || "md";

  const isMin = quantity <= 1;
  const isMax = quantity >= maxStock;

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
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md transition-colors ${
        size === "sm" ? "p-0.5 gap-1.5" : "p-1 gap-2.5"
      }`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isMin}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-full text-white/70 transition-all duration-200 ${
          size === "sm" ? "h-6 w-6" : "h-7 w-7"
        } ${
          isMin
            ? "cursor-not-allowed opacity-25 text-white/30"
            : "hover:bg-[#c5a059]/20 hover:text-[#dfba73] active:scale-95"
        }`}
      >
        <Minus className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </button>

      <span
        className={`font-sans font-semibold text-white tabular-nums text-center select-none ${
          size === "sm" ? "w-5 text-xs" : "w-7 text-sm"
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={isMax}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-full text-white/70 transition-all duration-200 ${
          size === "sm" ? "h-6 w-6" : "h-7 w-7"
        } ${
          isMax
            ? "cursor-not-allowed opacity-25 text-white/30"
            : "hover:bg-[#c5a059]/20 hover:text-[#dfba73] active:scale-95"
        }`}
      >
        <Plus className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </button>
    </div>
  );
}
