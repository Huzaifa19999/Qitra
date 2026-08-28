"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/category/men' },
    { name: 'Women', href: '/category/women' },
    { name: 'Children', href: '/category/children' },
    { name: 'Unisex', href: '/category/unisex' },
    { name: 'All Products', href: '/products' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-black/60 backdrop-blur-xl border-b border-[#d4af37]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="font-playfair text-2xl font-bold text-[#d4af37] tracking-wider">
            LUXE PARFUM
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[#d4af37] text-sm uppercase tracking-widest transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side - Cart & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative text-gray-300 hover:text-[#d4af37] transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {mounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-[#d4af37] focus:outline-none p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[70px] left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#d4af37]/20 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-[#d4af37] block px-3 py-3 rounded-md text-base font-medium uppercase tracking-widest text-center border-b border-white/5 last:border-0"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
