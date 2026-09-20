import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import ProductActions from "./ProductActions";
import ProductCard from "@/components/ProductCard";
import { ShieldCheck, Truck, MessageCircle, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  if (isNaN(productId)) return { title: "Not Found" };

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} | QITRA Luxury Collection`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  if (isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    include: { category: true },
  });

  return (
    <div className="max-w-8xl mx-auto px-6 lg:px-12 py-12 space-y-16">
      {/* ================= BREADCRUMBS ================= */}
      <nav className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500">
        <Link href="/" className="hover:text-white transition-colors">
          Maison
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-white transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-[#dfba73] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* ================= MAIN PRODUCT SHOWCASE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0c0c10] shadow-2xl shadow-black/80">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#111116] to-[#07070a] flex items-center justify-center">
              <span className="text-gray-600 font-heading text-xl italic">Qitra Maison</span>
            </div>
          )}

          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#c5a059]/30 bg-black/75 backdrop-blur-md text-[#dfba73] text-[9px] font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-[#dfba73]" />
              {product.category.name}
            </span>
          </div>
        </div>

        {/* DETAILS & ACTIONS */}
        <div className="flex flex-col justify-center space-y-8 leading-10">
          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl sm:text-3xl font-sans font-semibold text-[#dfba73] tracking-wide">
              {formatCurrency(Number(product.price))}
            </p>
          </div>

          {/* STOCK STATUS */}
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                product.stock > 0
                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                  : "bg-rose-500"
              }`}
            />
            <span className="text-xs font-medium tracking-wider uppercase text-gray-300">
              {product.stock > 0 ? `In Atelier (${product.stock} available)` : "Currently Unavailable"}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="border-t border-b border-white/[0.06] py-6">
            <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* ACTIONS (QUANTITY + ADD TO CART) */}
          <ProductActions
            product={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              image: product.image,
              stock: product.stock,
            }}
          />

          {/* TRUST PERKS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06] text-xs text-gray-400">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#dfba73] shrink-0" />
              <span>100% Certified Authentic</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#dfba73] shrink-0" />
              <span>Complimentary VIP Delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#dfba73] shrink-0" />
              <span>WhatsApp Concierge Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <div className="pt-20 border-t border-white/[0.06] space-y-10">
          <div className="text-center space-y-2">
            <p className="text-[#dfba73] text-[10px] font-semibold uppercase tracking-[0.3em]">
              Complementary Pieces
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight">
              Related Creations
            </h2>
            <div className="h-[1.5px] w-12 bg-gradient-to-r from-[#dfba73] to-[#c5a059] mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={Number(p.price)}
                image={p.image}
                category={p.category.name}
                stock={p.stock}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
