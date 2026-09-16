import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Star,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const defaultCategories = [
    {
      name: "Clothes",
      slug: "clothes",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    },
    {
      name: "Makeup",
      slug: "makeup",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    },
    {
      name: "Jewellery",
      slug: "jewellery",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    },
    {
      name: "Perfume",
      slug: "perfume",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800",
    },
  ];

  let categories = defaultCategories;
  let categoryCounts: Record<string, number> = {};

  try {
    const dbCategories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
        image:
          cat.image ||
          defaultCategories.find((d) => d.slug === cat.slug)?.image ||
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      }));

      dbCategories.forEach((cat) => {
        categoryCounts[cat.slug] = cat._count.products;
      });
    }
  } catch (e) {
    console.error("Failed to fetch categories", e);
  }

  let featuredProducts: Array<{
    id: number;
    name: string;
    price: number | string;
    image: string | null;
    stock: number;
    category?: { name: string } | null;
  }> = [];

  try {
    const dbProducts = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    featuredProducts = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      image: p.image,
      stock: p.stock,
      category: p.category,
    }));
  } catch (e) {
    console.error("Failed to fetch featured products", e);
  }

  const benefits = [
    {
      icon: <Truck className="w-6 h-6 text-[#d4af37]" />,
      title: "Free Express Shipping",
      desc: "Free nationwide delivery in 2-4 days across Pakistan.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
      title: "Cash on Delivery",
      desc: "Pay securely at your doorstep with verified COD.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#d4af37]" />,
      title: "100% Authentic Ateliers",
      desc: "Certified original luxury cosmetics, fashion & perfumes.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#d4af37]" />,
      title: "WhatsApp Concierge",
      desc: "Instant sizing guidance and live order tracking 24/7.",
    },
  ];

  const testimonials = [
    {
      name: "Ayesha Malik",
      city: "Lahore",
      comment:
        "The perfume arrived in pristine atelier packaging within 2 days. 100% authentic fragrance and the cash on delivery process was seamless!",
      rating: 5,
    },
    {
      name: "Zainab Tariq",
      city: "Karachi",
      comment:
        "Ordered jewellery for an event. The craftsmanship and shine exceeded expectations. WhatsApp concierge helped confirm my delivery time quickly.",
      rating: 5,
    },
    {
      name: "Hamza Rehman",
      city: "Islamabad",
      comment:
        "Top-tier luxury experience. Fast dispatch, great customer service, and the quality of clothes is exceptional.",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ─── 1. HERO PROMOTIONAL BANNER (Amazon/Daraz High Impact) ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#11121c] via-[#0c0d15] to-[#090a0f] border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Ambient Gold Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#d4af37]/[0.08] blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f3d078] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Pakistan&apos;s Luxury Maison • Cash on Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
              Haute Couture, Fine Jewellery &{" "}
              <span className="text-gradient-gold">Artisanal Fragrance</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Explore our curated collections of designer fashion, certified fine jewellery,
              high-performance makeup, and signature luxury fragrances with complimentary nationwide express shipping.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="btn-gold w-full sm:w-auto text-xs px-8 py-3.5 shadow-xl shadow-[#d4af37]/25 flex items-center justify-center gap-2 group"
              >
                <span>Shop All Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/products?category=perfume"
                className="btn-outline-gold w-full sm:w-auto text-xs px-8 py-3.5 flex items-center justify-center"
              >
                Explore Perfumes
              </Link>
            </div>

            {/* Micro value badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-xs font-medium text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> 2-4 Days Fast Delivery
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4" /> 100% Original Sealed Box
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4" /> Cash on Delivery (COD)
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1b1c2b] to-[#12131e] p-2 shadow-2xl">
              <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900"
                  alt="Qitra Fragrance Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#f3d078] font-bold">
                      Signature Scent
                    </span>
                    <span className="text-xs font-bold text-white">In Stock</span>
                  </div>
                  <p className="text-base font-bold text-white">Artisanal Oud & Royal Amber</p>
                  <p className="text-xs text-gray-300">Complimentary nationwide packaging included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. AMAZON/DARAZ 4-PILLAR VALUE PROPOSITION STRIP ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.08] bg-[#12131d] hover:border-[#d4af37]/40 hover:bg-[#151624] transition-all"
            >
              <div className="p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 shrink-0">
                {b.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-white">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. SHOP BY DEPARTMENT (Categories) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f3d078]">
              Maison Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-[#f3d078] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              image={cat.image}
              itemCount={categoryCounts[cat.slug]}
            />
          ))}
        </div>
      </section>

      {/* ─── 4. FLASH DEALS & TRENDING PIECES (Amazon/Daraz Showcase Grid) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f3d078]">
                Featured Boutique
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Trending & Best Sellers
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Top curated creations with cash on delivery & express nationwide dispatch.
            </p>
          </div>

          <Link
            href="/products?sort=newest"
            className="text-xs font-bold uppercase tracking-wider text-[#f3d078] hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>View All ({featuredProducts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category?.name}
                stock={product.stock}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-white/[0.08] bg-[#12131d] space-y-3">
            <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto opacity-80" />
            <p className="text-white text-base font-semibold">Our boutique inventory is being updated</p>
            <p className="text-gray-400 text-xs">Please check back shortly for newly added creations.</p>
          </div>
        )}
      </section>

      {/* ─── 5. VERIFIED CUSTOMER REVIEWS & SOCIAL PROOF ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-cente space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#f3d078]">
            Verified Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            What Our Patrons Say
          </h2>
          <p className="text-xs text-gray-400 font-light">
            Real reviews from our esteemed patrons across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#12131d] space-y-4 shadow-lg hover:border-[#d4af37]/35 transition-all"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-light italic">
                &ldquo;{t.comment}&rdquo;
              </p>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-gray-400">{t.city}, Pakistan</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
