import React, { Suspense } from "react";
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
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="w-full flex justify-center items-center min-h-screen bg-[#090a0f] text-[#e2e8f0] pt-[130px] sm:pt-[150px]">
        {children}
      </main>

      <Footer />
    </CartProvider>
//  <>
//  <Footer/>
//  </>
  
  
  );
}