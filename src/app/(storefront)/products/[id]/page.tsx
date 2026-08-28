import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import ProductActions from "./ProductActions";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  if (isNaN(productId)) return { title: "Not Found" };

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} | Luxury Perfumes`,
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
      id: { not: product.id }
    },
    take: 4,
    include: { category: true }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="text-sm text-gray-400 mb-8 font-body">
        <Link href="/" className="hover:text-[#d4af37]">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-[#d4af37]">{product.category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-200">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="aspect-square relative rounded-xl overflow-hidden glass-gold border border-white/10">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center">
              <span className="text-gray-600 font-heading text-2xl">No Image</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <span className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider text-[#d4af37] border border-[#d4af37]/40 rounded-full uppercase mb-3">
              {product.category.name}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">{product.name}</h1>
            <p className="text-3xl text-[#f0c040] font-semibold">{formatCurrency(Number(product.price))}</p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed font-body text-base">{product.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"}`}></div>
              <span className="text-sm text-gray-300">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>
          </div>

          <ProductActions product={{ id: product.id, name: product.name, price: Number(product.price), image: product.image, stock: product.stock }} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-white/10">
          <h2 className="font-heading text-3xl mb-8 text-center text-gradient-gold">Related Fragrances</h2>
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
