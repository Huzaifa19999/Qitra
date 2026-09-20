import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
  });
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} Collection | QITRA`,
    description: `Browse our luxury collection of ${category.name} at QITRA.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      products: {
        include: { category: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="space-y-12 leading-5 pb-24">
      {/* ================= HERO BANNER ================= */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0e0e14] via-[#09090d] to-[#060608] py-20 text-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[#c5a059]/[0.06] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-6 space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500 mb-2">
            <Link href="/" className="hover:text-white transition-colors">
              Maison
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">
              Collection
            </Link>
            <span>/</span>
            <span className="text-[#dfba73]">{category.name}</span>
          </nav>

          <h1 className="text-4xl sm:text-6xl font-heading font-medium text-white tracking-tight">
            {category.name} Collection
          </h1>

         <p className="text-center text-gray-400 text-sm sm:text-sm font-light max-w-8xl mx-auto leading-relaxed">
  Explore our exclusive collection of {category.name}, crafted to perfection with unmatched luxury and attention to detail.
</p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/[0.06] text-[#dfba73] text-[10px] font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-[#dfba73]" />
              <span>{category.products.length} {category.products.length === 1 ? "Piece Available" : "Pieces Available"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        {category.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={Number(product.price)}
                image={product.image}
                category={product.category.name}
                stock={product.stock}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl border border-white/[0.06] bg-[#0c0c10] space-y-4 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-[#dfba73] mx-auto opacity-70" />
            <h3 className="text-xl font-heading font-medium text-white">No Pieces Currently Available</h3>
            <p className="text-gray-400 text-xs font-light">
              We are curating new arrivals for the {category.name} collection. Please check back shortly.
            </p>
            <div className="pt-2">
              <Link href="/products" className="btn-outline-gold text-xs px-6 py-2.5 inline-flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Browse All Collections</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
