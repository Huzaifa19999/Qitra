"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import { Menu, ExternalLink, Sparkles } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on admin login page, bypass layout to provide a clean full-screen experience
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Derive dynamic title & breadcrumb based on route if title wasn't explicitly overridden
  let sectionTitle = title || "Dashboard";
  let sectionSubtitle = "Real-time metrics, revenue and inventory overview";

  if (!title) {
    if (pathname === '/admin') {
      sectionTitle = "Dashboard";
      sectionSubtitle = "Real-time metrics, revenue and inventory overview";
    } else if (pathname === '/admin/products/new') {
      sectionTitle = "Add Product";
      sectionSubtitle = "Create a new luxury item in the catalog";
    } else if (pathname.startsWith('/admin/products/') && pathname.endsWith('/edit')) {
      sectionTitle = "Edit Product";
      sectionSubtitle = "Update specifications, pricing, and stock details";
    } else if (pathname.startsWith('/admin/products')) {
      sectionTitle = "Products";
      sectionSubtitle = "Manage luxury inventory, status, and pricing";
    } else if (pathname.startsWith('/admin/orders')) {
      sectionTitle = "Orders";
      sectionSubtitle = "Review and fulfill client orders";
    }
  }

  return (
    <div className="min-h-screen bg-[#07070c] text-gray-100 flex relative selection:bg-[#d4af37]/20 selection:text-white">
      {/* Ambient Lighting Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[600px] h-[500px] rounded-full bg-[#c5a059]/[0.035] blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-[#c5a059]/[0.02] blur-[130px]" />
      </div>

      {/* Admin Navigation Drawer */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-72 w-full min-w-0 flex flex-col min-h-screen relative z-10">
        {/* Sticky Top Header */}
        <header className="h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-[#090910]/80 backdrop-blur-xl sticky top-0 z-30 transition-all">
          {/* Header Left: Mobile Drawer Button + Page Header */}
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
              className="md:hidden p-2 rounded-xl text-gray-300 hover:text-[#d4af37] bg-white/[0.03] hover:bg-[#d4af37]/10 border border-white/10 hover:border-[#d4af37]/30 transition-all shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37]/80">
                  Admin Atelier
                </span>
                <span className="text-gray-600 text-xs hidden sm:inline">•</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:inline font-medium">
                  Workspace
                </span>
              </div>
              <h1 className="font-heading text-lg sm:text-xl font-semibold text-white tracking-wide truncate">
                {sectionTitle}
              </h1>
            </div>
          </div>

          {/* Header Right: Quick Shortcuts & Live Store Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-[#d4af37] px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-[#d4af37]/10 border border-white/[0.08] hover:border-[#d4af37]/30 transition-all shadow-sm group"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span>Live Store</span>
            </Link>

            {/* Quick Atelier Pill */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="w-6 h-6 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider leading-none">
                  Authenticated
                </span>
                <span className="text-[9px] text-[#d4af37] font-medium leading-tight mt-0.5">
                  Superadmin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hairline Accent Glow under Header */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent sticky top-20 z-20" />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full animate-fade-in space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
