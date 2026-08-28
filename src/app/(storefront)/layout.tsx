import React from "react";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen pt-[70px] bg-[#0a0a0a] text-gray-100">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
