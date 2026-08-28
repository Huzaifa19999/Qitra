import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = [
    { name: "Men", slug: "men", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600" },
    { name: "Women", slug: "women", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600" },
    { name: "Children", slug: "children", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600" },
    { name: "Unisex", slug: "unisex", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600" },
  ];

  let featuredProducts: any[] = [];
  try {
    featuredProducts = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (e) {
    console.error("Failed to fetch featured products", e);
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden hero-gradient hero-overlay px-6">
        <div className="absolute inset-0 bg-radial from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold uppercase tracking-widest">
            Exquisite Craftsmanship
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-tight">
            Discover Your <span className="text-gradient-gold">Signature Scent</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in our luxury collection of artisanal fragrances, curated for elegance, personality, and unforgettable impressions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products" className="btn-gold text-base px-8 py-3.5 shadow-lg shadow-[#d4af37]/20">
              Explore Collection
            </Link>
            <Link href="/category/men" className="btn-outline-gold text-base px-8 py-3.5">
              Shop Men
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Shop by Category</h2>
          <p className="text-gray-400 text-sm md:text-base">Find fragrances suited for every scent profile and occasion.</p>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} name={cat.name} slug={cat.slug} image={cat.image} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Featured Collection</h2>
            <p className="text-gray-400 text-sm md:text-base mt-1">Handpicked luxury perfumes newly arrived in store.</p>
          </div>
          <Link href="/products" className="text-[#d4af37] hover:text-[#f0c040] text-sm font-semibold transition-colors mt-4 md:mt-0 flex items-center gap-1">
            View All Products &rarr;
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
          <div className="text-center py-12 glass rounded-2xl">
            <p className="text-gray-400">Our catalog is currently being updated. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto text-xl font-bold">
              ✨
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">100% Authentic</h3>
            <p className="text-xs text-gray-400">Directly sourced from world-class perfume houses and master perfumers.</p>
          </div>
          <div className="glass p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto text-xl font-bold">
              🚀
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Fast Nationwide Delivery</h3>
            <p className="text-xs text-gray-400">Safe and speedy shipping straight to your doorstep with tracking.</p>
          </div>
          <div className="glass p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto text-xl font-bold">
              💬
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Instant WhatsApp Confirmation</h3>
            <p className="text-xs text-gray-400">Receive order details and updates directly on WhatsApp.</p>
          </div>
          <div className="glass p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mx-auto text-xl font-bold">
              🛡️
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Secure Ordering</h3>
            <p className="text-xs text-gray-400">Verified server-side calculation and safe order processing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
