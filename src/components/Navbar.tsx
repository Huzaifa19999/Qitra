"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/category/men' },
    { name: 'Women', href: '/category/women' },
    { name: 'Children', href: '/category/children' },
    { name: 'Unisex', href: '/category/unisex' },
    { name: 'All Products', href: '/products' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-[#d4af37]/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex flex-col leading-none select-none">
              <span className="font-heading text-2xl sm:text-3xl font-bold tracking-[0.15em] bg-gradient-to-r from-[#fce38a] via-[#d4af37] to-[#aa7c11] bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-[1.02]">
                QITRA
              </span>
              <span className="text-[7.5px] sm:text-[8px] text-gray-400 uppercase tracking-[0.3em] font-body mt-2 font-light opacity-80 group-hover:opacity-100 transition-opacity">
                Fine Fragrances
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 rounded-md group ${
                    active
                      ? 'text-[#d4af37]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Subtle hover background highlight */}
                  <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-200 pointer-events-none" />
                  
                  {/* Active / Hover Animated Underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-all duration-300 ease-out ${
                      active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/products"
              className="text-gray-300 hover:text-[#d4af37] transition-all duration-200 p-2.5 rounded-full hover:bg-white/5 active:scale-95"
              aria-label="Search products"
            >
              <Search className="h-4 sm:h-5 w-4 sm:w-5" />
            </Link>

            <Link
              href="/cart"
              className="relative text-gray-300 hover:text-[#d4af37] transition-all duration-200 p-2.5 rounded-full hover:bg-white/5 active:scale-95"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full bg-gradient-to-r from-[#f0c040] to-[#d4af37] text-[9px] font-extrabold text-black shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-transform animate-in zoom-in-50">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-[#d4af37] focus:outline-none p-2.5 rounded-full hover:bg-white/5 transition-colors active:scale-95 ml-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div
          className={`md:hidden absolute top-[72px] left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-[#d4af37]/20 transition-all duration-300 ease-in-out shadow-2xl ${
            isOpen ? 'max-h-[420px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="px-6 flex flex-col gap-1.5">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-xs font-medium uppercase tracking-[0.2em] transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-[#d4af37]/15 to-transparent text-[#d4af37] border-l-2 border-[#d4af37]'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}