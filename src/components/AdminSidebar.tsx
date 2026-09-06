"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ExternalLink,
  LogOut,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route changes on mobile
  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [pathname]);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
      badge: null,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBag,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 z-50 flex flex-col bg-gradient-to-b from-[#0c0c16] via-[#090910] to-[#06060b] border-r border-white/[0.08] shadow-2xl shadow-black/80 transition-transform duration-300 ease-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-radial from-[#d4af37]/10 to-transparent pointer-events-none" />

        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/[0.06] relative z-10">
          <Link href="/admin" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/20 via-[#d4af37]/10 to-transparent border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-lg shadow-[#d4af37]/10 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-widest text-gradient-gold">
                QITRA
              </span>
              <span className="text-[9px] font-medium tracking-[0.25em] text-gray-400 uppercase">
                Admin Atelier
              </span>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar relative z-10">
          <div className="px-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              Management
            </p>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-transparent text-[#d4af37] border border-[#d4af37]/30 shadow-md shadow-[#d4af37]/5'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                {/* Active left indicator */}
                {isActive && (
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-[#f0c040] to-[#d4af37] rounded-r-full shadow-[0_0_12px_#d4af37]" />
                )}

                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-[#d4af37]' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  />
                  <span className="tracking-wide">{item.name}</span>
                </div>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
                )}
              </Link>
            );
          })}

          {/* Quick Links Section */}
          <div className="pt-6 px-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              Quick Shortcuts
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200 border border-white/[0.04]"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-[#d4af37]/70 group-hover:text-[#d4af37]" />
              <span>Live Storefront</span>
            </div>
            <span className="text-[10px] uppercase font-semibold text-gray-500 bg-white/[0.05] px-2 py-0.5 rounded-md">
              Preview
            </span>
          </Link>
        </div>

        {/* Admin Footer & Logout */}
        <div className="p-4 border-t border-white/[0.06] bg-black/30 relative z-10 space-y-3">
          {/* Admin Identity Card */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-200 truncate">Administrator</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center justify-center gap-2.5 w-full px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/[0.07] hover:bg-rose-500/15 border border-rose-500/20 hover:border-rose-500/40 rounded-xl transition-all duration-200 shadow-sm group"
          >
            <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}