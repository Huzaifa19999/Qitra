import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-gray-400 relative pt-16 pb-8 border-t border-[#d4af37]/15">
      {/* Top gold shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div>
              <h3 className="font-heading text-2xl text-[#d4af37] tracking-wider mb-1">LUXE PARFUM</h3>
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#f0c040] rounded-full" />
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Discover the essence of luxury with our curated collection of fine fragrances.
              Each scent is carefully selected to offer an unforgettable olfactory experience.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-[#d4af37] text-base mb-5 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'All Products', href: '/products' },
                { label: 'Your Cart', href: '/cart' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#d4af37]/40 group-hover:bg-[#d4af37] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-[#d4af37] text-base mb-5 uppercase tracking-widest">Categories</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Men's Fragrances", href: '/category/men' },
                { label: "Women's Fragrances", href: '/category/women' },
                { label: 'Unisex Collection', href: '/category/unisex' },
                { label: "Children's Scents", href: '/category/children' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#d4af37]/40 group-hover:bg-[#d4af37] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading text-[#d4af37] text-base mb-5 uppercase tracking-widest">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>123 Luxury Avenue, Paris, France 75008</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <a href="mailto:contact@luxeparfum.com" className="hover:text-white transition-colors">
                    contact@luxeparfum.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <a href="tel:+33123456789" className="hover:text-white transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-medium">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                />
                <button className="px-3 py-2 text-xs btn-gold rounded-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Luxe Parfum. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-600">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
