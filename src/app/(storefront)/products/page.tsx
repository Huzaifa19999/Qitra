import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  SlidersHorizontal,
  Sparkles,
  Check,
  X,
  Search,
  ChevronRight,
  Filter,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage(props: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    priceRange?: string;
    inStock?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;
  const searchFilter = searchParams.search;
  const sortFilter = searchParams.sort || "newest";
  const priceRangeFilter = searchParams.priceRange;
  const inStockFilter = searchParams.inStock;

  let whereClause: Record<string, any> = {};

  if (categoryFilter && categoryFilter !== "all") {
    whereClause.category = { slug: categoryFilter };
  }
  if (searchFilter) {
    whereClause.name = { contains: searchFilter };
  }
  if (inStockFilter === "true") {
    whereClause.stock = { gt: 0 };
  }

  if (priceRangeFilter === "under_5000") {
    whereClause.price = { lte: 5000 };
  } else if (priceRangeFilter === "5000_15000") {
    whereClause.price = { gte: 5000, lte: 15000 };
  } else if (priceRangeFilter === "above_15000") {
    whereClause.price = { gte: 15000 };
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sortFilter === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sortFilter === "price_desc") {
    orderBy = { price: "desc" };
  }

  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy,
        include: { category: true },
      }),
      prisma.category.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: "asc" },
      }),
    ]);
    products = fetchedProducts;
    categories = fetchedCategories;
  } catch (e) {
    console.error("Failed to load products", e);
  }

  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams();

    const merged = {
      category: categoryFilter,
      search: searchFilter,
      sort: sortFilter !== "newest" ? sortFilter : undefined,
      priceRange: priceRangeFilter,
      inStock: inStockFilter,
      ...newParams,
    };

    Object.entries(merged).forEach(([key, val]) => {
      if (val && val !== "all") {
        params.set(key, val);
      }
    });

    const queryString = params.toString();
    return `/products${queryString ? `?${queryString}` : ""}`;
  };

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
  ];

  const priceRanges = [
    { label: "All Prices", value: undefined },
    { label: "Under Rs. 5,000", value: "under_5000" },
    { label: "Rs. 5,000 - Rs. 15,000", value: "5000_15000" },
    { label: "Above Rs. 15,000", value: "above_15000" },
  ];

  const hasActiveFilters = Boolean(
    categoryFilter || searchFilter || priceRangeFilter || inStockFilter || (sortFilter && sortFilter !== "newest")
  );

  return (
    <div className="max-w-7sm mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8">
      
      {/* ─── BREADCRUMBS ─── */}
      <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-gray-400 overflow-x-auto whitespace-nowrap pb-1">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-600 shrink-0" />
        <Link href="/products" className="hover:text-white transition-colors">
          Collection
        </Link>
        {categoryFilter && (
          <>
            <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-600 shrink-0" />
            <span className="text-[#f3d078] capitalize truncate">
              {categories.find((c) => c.slug === categoryFilter)?.name || categoryFilter}
            </span>
          </>
        )}
      </nav>

      {/* ─── TOP HEADER / SEARCH SUMMARY BANNER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 rounded-sm sm:rounded-2sm border border-white/[0.08] bg-gradient-to-r from-[#141522] to-[#0e0f17]">
        <div>
          <h1 className="text-sm sm:text-2sm md:text-3sm font-heading font-bold text-white tracking-tight">
            {searchFilter ? `Search results for "${searchFilter}"` : "Maison Luxury Catalog"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Showing <span className="text-white font-bold">{products.length}</span>{" "}
            {products.length === 1 ? "creation" : "creations"} with nationwide express delivery.
          </p>
        </div>

        {/* Top Sort Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <span className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            Sort By:
          </span>
          <div className="flex items-center gap-1 bg-[#1a1c2c] p-1 rounded-xs border border-white/10 overflow-x-auto w-full sm:w-auto">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={buildUrl({ sort: opt.value })}
                className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 rounded-sm text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
                  sortFilter === opt.value
                    ? "bg-[#d4af37] text-black shadow-sm"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ACTIVE FILTER CHIPS ─── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-[11px] sm:text-xs text-gray-400 font-medium mr-1">Active filters:</span>
          {categoryFilter && (
            <Link
              href={buildUrl({ category: undefined })}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#d4af37]/20 text-[#f3d078] border border-[#d4af37]/40 hover:bg-[#d4af37]/30 transition-colors"
            >
              <span>Category: {categories.find((c) => c.slug === categoryFilter)?.name || categoryFilter}</span>
              <X className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </Link>
          )}

          {searchFilter && (
            <Link
              href={buildUrl({ search: undefined })}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#d4af37]/20 text-[#f3d078] border border-[#d4af37]/40 hover:bg-[#d4af37]/30 transition-colors"
            >
              <span>Search: &ldquo;{searchFilter}&rdquo;</span>
              <X className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </Link>
          )}

          {priceRangeFilter && (
            <Link
              href={buildUrl({ priceRange: undefined })}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#d4af37]/20 text-[#f3d078] border border-[#d4af37]/40 hover:bg-[#d4af37]/30 transition-colors"
            >
              <span>Price: {priceRanges.find((p) => p.value === priceRangeFilter)?.label}</span>
              <X className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </Link>
          )}

          {inStockFilter === "true" && (
            <Link
              href={buildUrl({ inStock: undefined })}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60 transition-colors"
            >
              <span>In Stock Only</span>
              <X className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </Link>
          )}

          <Link
            href="/products"
            className="text-[11px] sm:text-xs font-semibold text-rose-400 hover:text-rose-300 ml-2 hover:underline"
          >
            Clear All
          </Link>
        </div>
      )}

      {/* ─── MAIN MARKETPLACE LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ─── LEFT COLUMN: FILTER SIDEBAR ─── */}
        <aside className="lg:col-span-3 space-y-6 rounded-sm sm:rounded-2sm border border-white/[0.08] bg-[#12131d] p-4 sm:p-5 shadow-lg">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Filter className="w-4 h-4 text-[#d4af37]" />
              <span>Filter Creations</span>
            </div>
            {hasActiveFilters && (
              <Link href="/products" className="text-[11px] font-semibold text-[#f3d078] hover:underline">
                Reset
              </Link>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#f3d078]">
              Departments
            </h3>
            <div className="flex lg:flex-col gap-1.5 lg:gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              <Link
                href={buildUrl({ category: undefined })}
                className={`flex items-center justify-between px-3 py-2 rounded-sm text-xs font-medium transition-colors shrink-0 lg:shrink ${
                  !categoryFilter
                    ? "bg-[#d4af37]/20 text-[#f3d078] font-bold border border-[#d4af37]/35"
                    : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>All Departments</span>
              </Link>

              {categories.map((cat) => {
                const active = categoryFilter === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={buildUrl({ category: cat.slug })}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-sm text-xs font-medium transition-colors shrink-0 lg:shrink ${
                      active
                        ? "bg-[#d4af37]/20 text-[#f3d078] font-bold border border-[#d4af37]/35"
                        : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                      {cat._count?.products ?? 0}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 2. Price Range Filter */}
          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#f3d078]">
              Price Range
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 lg:gap-1">
              {priceRanges.map((pr) => {
                const active = priceRangeFilter === pr.value;
                return (
                  <Link
                    key={pr.label}
                    href={buildUrl({ priceRange: pr.value })}
                    className={`flex items-center justify-between px-3 py-2 rounded-sm text-xs font-medium transition-colors ${
                      active
                        ? "bg-[#d4af37]/20 text-[#f3d078] font-bold border border-[#d4af37]/35"
                        : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="truncate">{pr.label}</span>
                    {active && <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 3. Availability Filter */}
          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#f3d078]">
              Availability
            </h3>
            <Link
              href={buildUrl({ inStock: inStockFilter === "true" ? undefined : "true" })}
              className={`flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium border transition-all ${
                inStockFilter === "true"
                  ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40"
                  : "bg-white/[0.02] text-gray-300 border-white/[0.08] hover:border-white/20"
              }`}
            >
              <span>In Stock Only</span>
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border ${
                  inStockFilter === "true"
                    ? "bg-emerald-500 border-emerald-400 text-black"
                    : "border-gray-500"
                }`}
              >
                {inStockFilter === "true" && <Check className="w-3 h-3 text-black stroke-[3]" />}
              </div>
            </Link>
          </div>

          {/* Delivery Promise Badge */}
          <div className="hidden lg:block pt-4 border-t border-white/[0.08] text-xs text-gray-400 space-y-2">
            <p className="font-semibold text-white">Guaranteed Delivery</p>
            <p className="text-[11px] leading-relaxed text-gray-400">
              Orders confirmed before 3 PM dispatch same-day with safe Cash on Delivery across Pakistan.
            </p>
          </div>
        </aside>

        {/* ─── RIGHT COLUMN: PRODUCT CATALOG GRID ─── */}
        <main className="lg:col-span-9 space-y-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
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
            <div className="text-center py-12 sm:py-20 rounded-sm sm:rounded-2sm border border-white/[0.08] bg-[#12131d] p-6 sm:p-8 space-y-4 max-w-md mx-auto">
              <Search className="w-8 sm:w-10 h-8 sm:h-10 text-gray-500 mx-auto" />
              <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                No matching creations found
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                We couldn&apos;t find any items matching your selected criteria. Try adjusting your filters or search keywords.
              </p>
              <div className="pt-2">
                <Link href="/products" className="btn-gold text-xs px-6 py-2.5 inline-block">
                  Clear All Filters
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}