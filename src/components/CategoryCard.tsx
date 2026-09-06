import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  slug: string;
  image?: string;
}

export default function CategoryCard({ name, slug, image }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group block w-full h-full">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#16213e] border border-white/5 transition-all duration-500 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] group-hover:-translate-y-1">

        {/* Background Image or Fallback Gradient */}
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]" />
        )}

        {/* Layered dark overlay — deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />

        {/* Gold shimmer edge on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.3)' }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-7 px-4 gap-3">
          <h2 className="font-heading text-3xl md:text-4xl text-white font-bold tracking-wider text-center drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-3">
            {name}
          </h2>

          {/* Gold underline */}
          <div className="h-[2px] w-0 bg-gradient-to-r from-[#d4af37] to-[#f0c040] rounded-full transition-all duration-500 group-hover:w-12" />

          {/* "Shop Now" CTA — slides up from invisible */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span
              className="text-[#d4af37] text-xs font-semibold uppercase tracking-[0.15em] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75"
            >
              Shop Now
            </span>
            <ArrowRight
              className="h-3 w-3 text-[#d4af37] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 delay-100"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
