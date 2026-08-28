import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
  });
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} Fragrances | Luxury Perfumes`,
    description: `Browse our luxury collection of ${category.name} fragrances.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      products: {
        include: { category: true },
        orderBy: { createdAt: 'desc' }
      }
    },
  });

  if (!category) notFound();

  return (
    <div>
      <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] py-16 border-b border-white/10 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">
          {category.name} Fragrances
        </h1>
        <p className="text-gray-400 font-body max-w-2xl mx-auto px-4 text-sm md:text-base">
          Explore our exclusive collection of {category.name} luxury fragrances, crafted to perfection.
        </p>
        <div className="inline-block mt-4 px-4 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold">
          {category.products.length} Products Available
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
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
          <div className="text-center py-20 glass rounded-2xl">
            <h3 className="text-2xl font-heading text-gray-300 mb-4">No products available</h3>
            <p className="text-gray-500">We are currently updating our {category.name} collection. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
