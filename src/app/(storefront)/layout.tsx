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

      <main
        className="
          min-h-screen
          bg-[#070709]
          text-[#dcd8d0]
          pt-[72px]
          md:pt-[104px]
        "
      >
        {children}
      </main>

      <Footer />
    </CartProvider>
  );
}