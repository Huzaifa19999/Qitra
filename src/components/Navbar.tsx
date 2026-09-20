"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  Phone,
  Truck,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { totalItems, totalAmount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync search input with URL search param if present
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearchQuery(query);
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() && selectedCategory === "all") {
      router.push("/products");
      return;
    }

    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    router.push(`/products?${params.toString()}`);
    setIsOpen(false);
  };

  const navCategories = [
    { name: "All Products", href: "/products" },
    { name: "Clothes", href: "/category/clothes" },
    { name: "Makeup", href: "/category/makeup" },
    { name: "Jewellery", href: "/category/jewellery" },
    { name: "Perfume", href: "/category/perfume" },
  ];

  const isActive = (href: string) => {
    if (href === "/products") return pathname === "/products" && !searchParams.get("category");
    return pathname.startsWith(href);
  };

  return (
    <header className="fixe inset-x-0 top-0 z-50 flex justify-center flex-col items-cente w-full transition-all duration-300">
      {/* ─── 1. TOP ANNOUNCEMENT & UTILITY BAR ─── */}
      <div className="hidden sm:block w-full bg-[#050609] border-b border-white/[0.08] text-[11px] text-gray-400 py px-4">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-gray-300 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
              Free Express Delivery Nationwide on Orders Over Rs. 3,000
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-[#f3d078]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              Cash on Delivery (COD) Available
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/923343451617"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#f3d078] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>WhatsApp Concierge: +92 300 0000000</span>
            </a>
            <span className="text-white/20">|</span>
            <Link href="/products" className="hover:text-white transition-colors">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN NAVIGATION & SEARCH BAR ─── */}
      <div
        className={`w-full transition-all duration-300 border-b border-white/[0.08] ${
          scrolled ? "bg-[#090a0f]/95 backdrop-blur-md shadow-2xl" : "bg-[#0c0d14]"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* LOGO */}
          <Link href="/" className="flex flex-col shrink-0 focus:outline-none group">
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white group-hover:text-[#f3d078] transition-colors">
                QITRA
              </span>
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37] opacity-80" />
            </div>
            <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#d4af37]/90 font-medium -mt-1">
              Haute Maison
            </span>
          </Link>

          {/* CENTRAL SEARCH BAR (DESKTOP) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl h-11 items-center rounded-lg border border-white/15 bg-[#141522] focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37] transition-all shadow-inner overflow-hidden"
          >
            {/* Category Select Dropdown */}
            <div className="relative h-full flex items-center border-r border-white/10 shrink-0 bg-white/[0.02]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-full bg-transparent pl-3 pr-8 text-xs text-gray-300 font-medium focus:outline-none cursor-pointer appearance-none"
              >
                <option value="all" className="bg-[#141522] text-white">All Departments</option>
                <option value="clothes" className="bg-[#141522] text-white">Clothes</option>
                <option value="makeup" className="bg-[#141522] text-white">Makeup</option>
                <option value="jewellery" className="bg-[#141522] text-white">Fine Jewellery</option>
                <option value="perfume" className="bg-[#141522] text-white">Perfumes</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clothes, makeup, artisanal perfumes, fine jewellery..."
              className="flex-1 h-full bg-transparent px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              aria-label="Search"
              className="h-full rounded-r-sm px-5 bg-gradient-to-r from-[#f3d078] to-[#d4af37] hover:from-[#ffe094] hover:to-[#f3d078] text-black font-semibold flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <Search className="w-12 h-7 text-black" />
            </button>
          </form>

          {/* USER ACTIONS & CART (RIGHT) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* WhatsApp Quick Chat */}
            <a
              href="https://wa.me/923343451617"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#d4af37]/40 bg-white/[0.02] hover:bg-[#d4af37]/10 transition-all text-xs text-gray-300 hover:text-white"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="block text-[9.5px] uppercase tracking-wider text-gray-400">Order Help</span>
                <span className="block font-semibold text-[#f3d078]">WhatsApp</span>
              </div>
            </a>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-3 px-3 sm:px-4 py-2 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-all group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#f3d078] transition-transform group-hover:scale-110" />
                {mounted && (
                  <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-[#f3d078] to-[#d4af37] text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-[10px] uppercase tracking-wider text-gray-400">Bag Total</span>
                <span className="block text-xs font-bold text-white">
                  Rs. {mounted ? totalAmount.toLocaleString() : "0"}
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              className="p-2 rounded-lg border border-white/10 bg-white/[0.04] text-gray-300 hover:text-white md:hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="px-4 pb-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex h-10 items-center rounded-sm border border-white/15 bg-[#141522] focus-within:border-[#d4af37] overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clothes, perfumes, makeup..."
              className="flex-1 h-full bg-transparent px-3 text-xs text-white placeholder:text-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="h-full px-4 rounded-r-sm bg-[#d4af37] text-black font-semibold flex items-center justify-center shrink-0"
            >
              <Search className="w-8 rounded-r-md h-6 text-black" />
            </button>
          </form>
        </div>
      </div>

      {/* ─── 3. SECONDARY CATEGORY BAR ─── */}
      <div className="hidden md:block w-full bg-[#10111a] border-b border-white/[0.07] px-4">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
            {navCategories.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    active
                      ? "bg-[#d4af37]/15 text-[#f3d078] border border-[#d4af37]/30 shadow-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/products?sort=newest"
              className="flex items-center gap-1 text-[#f3d078] hover:text-white font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>New Atelier Arrivals</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 4. MOBILE DRAWER NAVIGATION ─── */}
      {isOpen && (
        <div className="w-full md:hidden bg-[#0e0f17] border-b border-white/10 shadow-2xl p-5 space-y-4 animate-fade-in-up">
          <div className="space-y-1 pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
              Maison Departments
            </span>
            <div className="grid grid-cols-1 gap-1 pt-2">
              {navCategories.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${
                      active
                        ? "bg-[#d4af37]/15 text-[#f3d078] border border-[#d4af37]/30"
                        : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-gray-400">
            <a
              href="https://wa.me/923343451617"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-400 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="text-[#f3d078] font-semibold hover:underline"
            >
              View Bag ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}