import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

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

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low → High", value: "price_asc" },
    { label: "Price: High → Low", value: "price_desc" },
  ];

  const buildUrl = (params: Record<string, string | undefined>) => {
    const base = new URLSearchParams();
    if (params.category) base.set("category", params.category);
    if (params.sort && params.sort !== "newest") base.set("sort", params.sort);
    if (params.search) base.set("search", params.search);
    const q = base.toString();
    return `/products${q ? `?${q}` : ""}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl glass border border-white/5 px-8 py-10 text-center space-y-3">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#d4af37]/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#b76e79]/4 blur-[60px]" />
        </div>
        <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[0.25em] relative z-10">
          The Full Collection
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white relative z-10">
          Our Fragrance Collection
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base relative z-10">
          Browse our full catalog of perfumes curated across all categories.
        </p>
        <div className="w-12 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#f0c040] mx-auto rounded-full mt-2 relative z-10" />
      </div>

      {/* Category Pills — horizontally scrollable on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
        <Link
          href={buildUrl({ sort: sortFilter })}
          className={`shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border whitespace-nowrap ${
            !categoryFilter
              ? "bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
              : "bg-white/5 text-gray-400 border-white/10 hover:border-[#d4af37]/40 hover:text-white"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={buildUrl({ category: cat.slug, sort: sortFilter })}
            className={`shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border whitespace-nowrap ${
              categoryFilter === cat.slug
                ? "bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
                : "bg-white/5 text-gray-400 border-white/10 hover:border-[#d4af37]/40 hover:text-white"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Products bar: count + sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-5">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="text-white font-medium">{products.length}</span>{" "}
          product{products.length !== 1 ? "s" : ""}
          {categoryFilter && (
            <span className="text-[#d4af37]"> in {categories.find(c => c.slug === categoryFilter)?.name ?? categoryFilter}</span>
          )}
        </p>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500 shrink-0" />
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={buildUrl({ category: categoryFilter, sort: opt.value })}
                className={`px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  sortFilter === opt.value
                    ? "bg-[#d4af37] text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>
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
        <div className="text-center py-24 glass rounded-2xl space-y-4">
          <p className="text-5xl">🔍</p>
          <p className="text-gray-300 text-xl font-heading">No perfumes found</p>
          <p className="text-gray-600 text-sm">Try adjusting your filters</p>
          <Link href="/products" className="btn-outline-gold inline-block mt-2">
            Clear Filters
          </Link>
        </div>
      )}
    </div>
  );
}
