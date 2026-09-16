import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#050507] pt-20 pb-10 text-gray-400">
      {/* Top subtle champagne gold hairline glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">

          {/* BRAND COLUMN */}
          <div className="space-y-5 lg:col-span-1">
            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-[0.25em] text-white">
                QITRA
              </h3>
              <p className="text-[8.5px] uppercase tracking-[0.35em] text-[#c5a059] mt-1 font-medium">
                Maison de Luxe
              </p>
              <div className="mt-3 h-[1.5px] w-8 bg-gradient-to-r from-[#dfba73] to-[#c5a059] rounded-full" />
            </div>

            <p className="text-xs leading-relaxed text-gray-400/90 font-light">
              Curators of haute couture apparel, high-performance cosmetics, handcrafted fine jewellery,
              and artisanal fragrances. Defined by timeless craftsmanship and effortless elegance.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/10 hover:text-[#dfba73]"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/10 hover:text-[#dfba73]"
              >
                <svg className="h-10.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/10 hover:text-[#dfba73]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dfba73] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: "Home", href: "/" },
                { label: "Complete Collection", href: "/products" },
                { label: "Shopping Bag", href: "/cart" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c5a059]/40 transition-colors group-hover:bg-[#dfba73]" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dfba73] mb-6">
              Maison Categories
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: "Luxury Clothes", href: "/category/clothes" },
                { label: "Makeup & Cosmetics", href: "/category/makeup" },
                { label: "Fine Jewellery", href: "/category/jewellery" },
                { label: "Artisanal Perfumes", href: "/category/perfume" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c5a059]/40 transition-colors group-hover:bg-[#dfba73]" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONCIERGE & NEWSLETTER */}
          <div className="space-y-2">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dfba73] mb-6">
                Client Concierge
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-1 text-gray-400">
                  <MapPin className="h-3.5 w-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Haute Atelier, Gulberg III, Lahore, Pakistan</span>
                </li>
                <li className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-[#c5a059] shrink-0" />
                  <a href="mailto:concierge@qitra.com" className="text-gray-400 hover:text-white transition-colors">
                    concierge@qitra.com
                  </a>
                </li>
                <li className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-[#c5a059] shrink-0" />
                  <a href="tel:+923000000000" className="text-gray-400 hover:text-white transition-colors">
                    +92 (300) 000-00000
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
                Private Newsletter
              </p>
              <div className="flex rounded-full border border-white/10 bg-white/[0.02] p-1 focus-within:border-[#c5a059]/50 transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-3 text-xs text-white placeholder:text-gray-600 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a059] text-black transition-transform hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>&copy; {new Date().getFullYear()} QITRA Luxury Maison. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/10">•</span>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
