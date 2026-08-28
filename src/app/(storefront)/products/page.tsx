import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;
  const searchFilter = searchParams.search;
  const sortFilter = searchParams.sort || "newest";

  let whereClause: any = {};
  if (categoryFilter) {
    whereClause.category = { slug: categoryFilter };
  }
  if (searchFilter) {
    whereClause.name = { contains: searchFilter };
  }

  let orderBy: any = { createdAt: "desc" };
  if (sortFilter === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sortFilter === "price_desc") {
    orderBy = { price: "desc" };
  }

  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy,
        include: { category: true },
      }),
      prisma.category.findMany(),
    ]);
  } catch (e) {
    console.error("Failed to load products", e);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">Our Fragrance Collection</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Browse through our full catalog of perfumes curated across all categories.
        </p>
        <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full mt-2" />
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-4">
        <Link
          href="/products"
          className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
            !categoryFilter
              ? "bg-[#d4af37] text-black border-[#d4af37]"
              : "bg-white/5 text-gray-300 border-white/10 hover:border-[#d4af37]/40"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              categoryFilter === cat.slug
                ? "bg-[#d4af37] text-black border-[#d4af37]"
                : "bg-white/5 text-gray-300 border-white/10 hover:border-[#d4af37]/40"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Products Count */}
      <div className="flex justify-between items-center text-sm text-gray-400 border-b border-white/10 pb-4">
        <span>Showing {products.length} product{products.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              image={product.image}
              category={product.category?.name}
              stock={product.stock}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-2xl space-y-4">
          <p className="text-gray-300 text-lg">No perfumes found matching your request.</p>
          <Link href="/products" className="btn-outline-gold inline-block">
            Clear Filters
          </Link>
        </div>
      )}
    </div>
  );
}
