"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    { name: "Collection", href: "/products" },
    { name: "Men", href: "/category/men" },
    { name: "Women", href: "/category/women" },
    { name: "Unisex", href: "/category/unisex" },
    { name: "Children", href: "/category/children" },
  ];

  const isActive = (href: string) => {
    if (href === "/products") {
      return pathname === "/products";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="fixed inset-x-0 top-0 z-50">
        {/* =======================================================
            ANNOUNCEMENT BAR
        ======================================================= */}
        <div
          className="
            hidden h-8
            items-center justify-center
            border-b border-white/[0.06]
            bg-[#070707]
            px-4
            md:flex
          "
        >
          <div
            className="
              flex items-center gap-2.5
              text-[9px]
              font-medium
              uppercase
              tracking-[0.24em]
              text-[#c8ae7b]
            "
          >
            <Sparkles className="h-3 w-3 text-[#d8b875]" />

            <span>Complimentary VIP Delivery Across Pakistan</span>

            <span className="text-white/15">•</span>

            <span className="text-white/50">
              Pure Extrait Formulations
            </span>

            <Sparkles className="h-3 w-3 text-[#d8b875]" />
          </div>
        </div>

        {/* =======================================================
            MAIN NAVBAR
        ======================================================= */}
        <nav
          className={`
            relative
            h-[72px]
            border-b
            transition-all
            duration-500
            ease-out

            ${
              scrolled
                ? `
                  border-white/[0.09]
                  bg-[#070707]/96
                  shadow-[0_12px_45px_rgba(0,0,0,0.45)]
                  backdrop-blur-2xl
                `
                : `
                  border-white/[0.045]
                  bg-[#070707]/90
                  backdrop-blur-xl
                `
            }
          `}
        >
          {/* =====================================================
              NAV INNER
          ===================================================== */}
          <div
            className="
              mx-auto
              flex
              h-full
              max-w-[1500px]
              items-center
              justify-around
              px-5
              sm:px-8
              lg:px-10
              xl:px-12
            "
          >
            {/* =================================================
                LOGO — LEFT
            ================================================= */}
            <div className="shrink-0">
              <Link
                href="/"
                aria-label="Qitra Home"
                className="group flex flex-col items-start"
              >
                <span
                  className="
                    font-heading
                    text-[25px]
                    font-medium
                    leading-none
                    tracking-[0.30em]
                    text-white
                    transition-all
                    duration-500
                    group-hover:text-[#d8b875]
                    group-hover:tracking-[0.34em]
                    sm:text-[27px]
                  "
                >
                  QITRA
                </span>

                <span
                  className="
                    mt-2
                    text-[6.5px]
                    font-medium
                    uppercase
                    tracking-[0.42em]
                    text-[#bda477]/70
                    transition-colors
                    duration-300
                    group-hover:text-[#d8b875]/90
                    sm:text-[7px]
                  "
                >
                  Haute Parfumerie
                </span>
              </Link>
            </div>

            {/* =================================================
                CATEGORIES — CENTER
            ================================================= */}
            <div
              className="
                hidden
                items-center
                justify-around
                gap-6
                lg:flex
                xl:gap-8
                2xl:gap-10
              "
            >
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`
                      group
                      relative
                      whitespace-nowrap
                      px-2
                      py-3
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.20em]
                      transition-all
                      duration-300

                      ${
                        active
                          ? "text-[#d8b875]"
                          : "text-white/55 hover:text-white"
                      }
                    `}
                  >
                    {link.name}

                    {/* Active / Hover underline */}
                    <span
                      className={`
                        absolute
                        bottom-0
                        left-1/2
                        h-px
                        -translate-x-1/2
                        bg-[#d8b875]
                        transition-all
                        duration-300

                        ${
                          active
                            ? "w-6 opacity-100"
                            : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* =================================================
                ACTIONS — RIGHT
            ================================================= */}
            <div
              className="
                hidden
                items-center
                gap-2
                lg:flex
              "
            >
              {/* Divider */}
              <span className="mr-2 h-5 w-px bg-white/[0.10]" />

              {/* Search */}
              <Link
                href="/products"
                aria-label="Search Fragrances"
                className="
                  group
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-transparent
                  text-white/55
                  transition-all
                  duration-300
                  hover:border-white/[0.08]
                  hover:bg-white/[0.04]
                  hover:text-[#d8b875]
                "
              >
                <Search
                  className="
                    h-[15px]
                    w-[15px]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Shopping Bag"
                className="
                  group
                  relative
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-transparent
                  text-white/55
                  transition-all
                  duration-300
                  hover:border-white/[0.08]
                  hover:bg-white/[0.04]
                  hover:text-[#d8b875]
                "
              >
                <ShoppingBag
                  className="
                    h-[15px]
                    w-[15px]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                {mounted && totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-[16px]
                      min-w-[16px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#070707]
                      bg-[#d8b875]
                      px-1
                      text-[8px]
                      font-bold
                      leading-none
                      text-[#070707]
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* =================================================
                MOBILE ACTIONS
            ================================================= */}
            <div className="ml-auto flex items-center gap-0.5 lg:hidden">
              {/* Mobile Search */}
              <Link
                href="/products"
                aria-label="Search Fragrances"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-white/65
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  hover:text-[#d8b875]
                  active:scale-95
                "
              >
                <Search className="h-[18px] w-[18px]" />
              </Link>

              {/* Mobile Cart */}
              <Link
                href="/cart"
                aria-label="Shopping Bag"
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-white/65
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  hover:text-[#d8b875]
                  active:scale-95
                "
              >
                <ShoppingBag className="h-[18px] w-[18px]" />

                {mounted && totalItems > 0 && (
                  <span
                    className="
                      absolute
                      right-1
                      top-1
                      flex
                      h-4
                      min-w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-[#d8b875]
                      px-1
                      text-[8px]
                      font-bold
                      leading-none
                      text-[#070707]
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-white/65
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  hover:text-[#d8b875]
                  active:scale-95
                "
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* =======================================================
              MOBILE MENU
          ======================================================= */}
          <div
            className={`
              absolute
              left-0
              right-0
              top-full
              overflow-hidden
              border-b
              border-white/[0.08]
              bg-[#080808]/98
              shadow-[0_20px_50px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
              transition-all
              duration-500
              ease-out
              lg:hidden

              ${
                isOpen
                  ? "pointer-events-auto max-h-[600px] translate-y-0 opacity-100"
                  : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
              }
            `}
          >
            <div className="px-6 py-6 sm:px-8">
              {/* Mobile Menu Header */}
              <div className="mb-5 flex items-center justify-between border-b border-white/[0.07] pb-4">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#d8b875]">
                    Explore
                  </p>

                  <p className="mt-1 font-heading text-lg text-white">
                    Our Collection
                  </p>
                </div>

                <Sparkles className="h-4 w-4 text-[#d8b875]/70" />
              </div>

              {/* Mobile Links */}
              <div className="space-y-1">
                {links.map((link, index) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`
                        group
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        px-3
                        py-4
                        transition-all
                        duration-300

                        ${
                          active
                            ? "bg-[#d8b875]/[0.07] text-[#d8b875]"
                            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="
                            text-[8px]
                            font-medium
                            tracking-[0.15em]
                            text-white/20
                          "
                        >
                          0{index + 1}
                        </span>

                        <span
                          className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.22em]
                          "
                        >
                          {link.name}
                        </span>
                      </div>

                      <ArrowRight
                        className={`
                          h-4
                          w-4
                          transition-all
                          duration-300
                          ${
                            active
                              ? "translate-x-0 text-[#d8b875]"
                              : "-translate-x-2 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:text-[#d8b875] group-hover:opacity-100"
                          }
                        `}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Bottom Detail */}
              <div className="mt-5 border-t border-white/[0.07] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                    Haute Parfumerie
                  </span>

                  <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-[#c8ae7b]/70">
                    Pakistan
                    <Sparkles className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* =========================================================
          MOBILE BACKDROP
      ========================================================= */}
      <div
        className={`
          fixed
          inset-0
          z-40
          bg-black/60
          backdrop-blur-[2px]
          transition-all
          duration-500
          lg:hidden

          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}