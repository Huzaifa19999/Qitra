import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { ShieldCheck, Truck, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

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

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "100% Authentic",
      desc: "Directly sourced from world-class perfume houses and master perfumers.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Nationwide Delivery",
      desc: "Safe and speedy shipping straight to your doorstep with live tracking.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp Confirmation",
      desc: "Receive order details and real-time updates directly on WhatsApp.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Ordering",
      desc: "Verified server-side calculations and safe, encrypted order processing.",
    },
  ];

  return (
    <div className="space-y-20 pb-20">

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden hero-gradient px-6">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#b76e79]/4 blur-[100px]" />
        </div>

        {/* Floating decorative orbs */}
        <div className="absolute top-20 right-16 w-3 h-3 rounded-full bg-[#d4af37]/40 animate-bounce-subtle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-1.5 h-1.5 rounded-full bg-[#d4af37]/25 animate-bounce-subtle" style={{ animationDelay: '0.7s' }} />
        <div className="absolute bottom-32 left-20 w-2 h-2 rounded-full bg-[#b76e79]/35 animate-bounce-subtle" style={{ animationDelay: '1.4s' }} />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 text-[#d4af37] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3" />
            Exquisite Craftsmanship
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1]">
            Discover Your{" "}
            <span className="text-gradient-gold">Signature Scent</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in our luxury collection of artisanal fragrances, curated for
            elegance, personality, and unforgettable impressions.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="btn-gold text-sm px-8 py-3.5 shadow-lg shadow-[#d4af37]/20 flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/category/women" className="btn-outline-gold text-sm px-8 py-3.5">
              Shop Women
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 pt-4 text-xs text-gray-600 border-t border-white/5 mt-6">
            <span className="flex items-center gap-1.5"><span className="text-[#d4af37]">✓</span> Free Delivery</span>
            <span className="flex items-center gap-1.5"><span className="text-[#d4af37]">✓</span> 100% Authentic</span>
            <span className="flex items-center gap-1.5"><span className="text-[#d4af37]">✓</span> WhatsApp Support</span>
          </div>
        </div>
      </section>

      {/* ─── Category Section ─── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[0.25em]">Browse by</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Shop by Category</h2>
          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
            Find fragrances suited for every scent profile and occasion.
          </p>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#f0c040] mx-auto rounded-full mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} name={cat.name} slug={cat.slug} image={cat.image} />
          ))}
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[#d4af37] text-xs font-semibold uppercase tracking-[0.25em] mb-2">Handpicked for you</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Featured Collection</h2>
            <p className="text-gray-500 text-sm mt-1">Luxury perfumes newly arrived in store.</p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[#d4af37] hover:text-[#f0c040] text-sm font-semibold transition-colors shrink-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent mb-10" />

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
          <div className="text-center py-16 glass rounded-2xl space-y-3">
            <p className="text-3xl">🌸</p>
            <p className="text-gray-400 text-base">Our catalog is currently being updated.</p>
            <p className="text-gray-600 text-sm">Check back soon for new arrivals!</p>
          </div>
        )}
      </section>

      {/* ─── Features Strip ─── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group glass border border-white/5 hover:border-[#d4af37]/20 p-6 rounded-2xl text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4af37]/5"
            >
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/8 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mx-auto transition-all duration-300 group-hover:bg-[#d4af37]/15 group-hover:border-[#d4af37]/40">
                {f.icon}
              </div>
              <h3 className="font-heading font-semibold text-base text-white">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
