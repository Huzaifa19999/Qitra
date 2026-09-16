import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  image?: string;
  itemCount?: number;
}

export default function CategoryCard({ name, slug, image, itemCount }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} className="group block w-full h-full">
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#12131d] border border-white/[0.08] group-hover:border-[#d4af37]/50 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500">
        
        {/* Category Image */}
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b1c2b] to-[#0c0d14]" />
        )}

        {/* Gradient Mask for clear text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity group-hover:from-black/90" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          {/* Top Badge */}
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#f3d078] bg-black/75 px-2.5 py-1 rounded-md border border-[#d4af37]/30 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              Atelier
            </span>

            {typeof itemCount === "number" && (
              <span className="text-[10px] font-medium text-gray-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                {itemCount} Items
              </span>
            )}
          </div>

          {/* Bottom Titles & CTA */}
          <div className="space-y-1.5">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#f3d078] transition-colors">
              {name}
            </h3>
            
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f3d078] group-hover:translate-x-1 transition-transform">
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
