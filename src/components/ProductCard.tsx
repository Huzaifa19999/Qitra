"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { ShoppingBag, Heart } from "lucide-react";

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
  const price =
    typeof p.price === "number" ? p.price : Number(p.price || 0);
  const image = p.image || null;
  const category =
    typeof p.category === "object" ? p.category?.name : p.category;
  const stock = p.stock ?? 0;

  const { addToCart } = useCart();

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const [wishlisted, setWishlisted] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOutOfStock) {
      addToCart({ id, name, price, image, stock }, 1);

      setAddedAnim(true);

      setTimeout(() => {
        setAddedAnim(false);
      }, 700);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlisted((prev) => !prev);
    setHeartAnim(true);

    setTimeout(() => {
      setHeartAnim(false);
    }, 500);
  };

  return (
    <Link
      href={`/products/${id}`}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#0d0d0f]
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        transition-all
        duration-500
        ease-out

        hover:-translate-y-1.5
        hover:border-[#d4af37]/30
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]
      "
    >
      {/* ================= IMAGE ================= */}
      <div
        className="
          relative
          aspect-square
          w-full
          overflow-hidden
          bg-[#151517]
        "
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.06]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-[#151517]
              to-[#0a0a0b]
            "
          >
            <span
              className="
                font-heading
                text-sm
                italic
                tracking-wide
                text-white/20
              "
            >
              No Image
            </span>
          </div>
        )}

        {/* Subtle image overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-transparent
            opacity-60
            transition-opacity
            duration-500
            group-hover:opacity-80
          "
        />

        {/* ================= BADGES ================= */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isOutOfStock ? (
            <span
              className="
                rounded-full
                border
                border-white/10
                bg-black/70
                px-3
                py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white/70
                backdrop-blur-md
              "
            >
              Sold Out
            </span>
          ) : (
            <>
              {category && (
                <span
                  className="
                    rounded-full
                    border
                    border-[#d4af37]/25
                    bg-black/65
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#d4af37]
                    backdrop-blur-md
                  "
                >
                  {category}
                </span>
              )}

              {isLowStock && (
                <span
                  className="
                    w-fit
                    rounded-full
                    border
                    border-orange-400/20
                    bg-orange-500/80
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-white
                    backdrop-blur-md
                  "
                >
                  Only {stock} left
                </span>
              )}
            </>
          )}
        </div>

        {/* ================= WISHLIST ================= */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className={`
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            backdrop-blur-md
            transition-all
            duration-300

            ${
              wishlisted
                ? `
                  border-rose-400/30
                  bg-rose-500/90
                  text-white
                  opacity-100
                `
                : `
                  border-white/10
                  bg-black/55
                  text-white/60
                  opacity-0
                  group-hover:opacity-100
                  hover:border-rose-400/30
                  hover:bg-rose-500/15
                  hover:text-rose-400
                `
            }

            ${heartAnim ? "scale-125" : "scale-100"}
          `}
        >
          <Heart
            className={`
              h-4
              w-4
              transition-all
              duration-300
              ${wishlisted ? "fill-current" : ""}
            `}
          />
        </button>

        {/* Bottom image fade */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            h-20
            bg-gradient-to-t
            from-black/35
            to-transparent
          "
        />
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div
        className="
          flex
          flex-1
          flex-col
          gap-4
          bg-[#0d0d0f]
          p-4
          sm:p-5
        "
      >
        <div className="min-w-0">
          {/* Product name */}
          <h3
            className="
              truncate
              font-heading
              text-[15px]
              font-medium
              leading-6
              text-white
              transition-colors
              duration-300
              group-hover:text-[#d4af37]
            "
          >
            {name}
          </h3>

          {/* Price */}
          <p
            className="
              mt-1.5
              text-lg
              font-semibold
              tracking-wide
              text-[#f0c040]
            "
          >
            ₨ {price.toLocaleString()}
          </p>
        </div>

        {/* ================= ADD TO CART ================= */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            mt-auto
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            px-4
            py-3
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.14em]
            transition-all
            duration-300

            ${
              isOutOfStock
                ? `
                  cursor-not-allowed
                  border-white/[0.06]
                  bg-white/[0.03]
                  text-white/25
                `
                : `
                  border-[#d4af37]/50
                  bg-[#d4af37]
                  text-black

                  hover:border-[#f0c040]
                  hover:bg-[#e2bd45]
                  hover:shadow-[0_8px_25px_rgba(212,175,55,0.20)]

                  active:scale-[0.97]
                `
            }

            ${addedAnim ? "scale-[0.97]" : ""}
          `}
        >
          <ShoppingBag
            className={`
              h-4
              w-4
              transition-transform
              duration-300
              ${!isOutOfStock ? "group-hover:scale-110" : ""}
            `}
          />

          {isOutOfStock
            ? "Out of Stock"
            : addedAnim
            ? "Added!"
            : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}