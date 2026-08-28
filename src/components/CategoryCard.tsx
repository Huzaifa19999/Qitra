import React from 'react';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  slug: string;
  image?: string;
}

export default function CategoryCard({ name, slug, image }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group block w-full h-full">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-[#16213e] border border-transparent transition-all duration-500 group-hover:border-[#d4af37]/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
        
        {/* Background Image or Fallback Gradient */}
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] transition-transform duration-700 group-hover:scale-105" />
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
          <h2 className="font-playfair text-3xl md:text-4xl text-white font-bold tracking-wider transform transition-transform duration-500 group-hover:-translate-y-2 text-center drop-shadow-lg">
            {name}
          </h2>
          <div className="h-0.5 w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-16 mt-4" />
        </div>
      </div>
    </Link>
  );
}
