"use client";

import React from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title = "Admin Dashboard" }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-20 flex items-center px-8 border-b border-white/10 bg-[#0d0d1a]/80 backdrop-blur-md sticky top-0 z-30">
          <h2 className="font-playfair text-2xl font-semibold text-white tracking-wide">{title}</h2>
        </header>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
