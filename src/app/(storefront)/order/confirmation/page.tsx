"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="glass-gold p-10 md:p-16 rounded-2xl max-w-2xl w-full text-center relative z-10 animate-fade-in-up border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
        <svg className="w-12 h-12 text-green-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
        Order Placed Successfully!
      </h1>
      
      <p className="text-gray-400 font-body text-lg mb-8 max-w-md mx-auto">
        Thank you for your purchase. Your luxury fragrance journey begins here.
      </p>

      {orderNumber && (
        <div className="bg-[#111] border border-white/10 rounded-lg p-6 mb-8 inline-block min-w-[300px]">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Order Number</p>
          <p className="font-heading text-3xl text-[#d4af37] tracking-wider">{orderNumber}</p>
        </div>
      )}

      <div className="glass p-4 rounded-lg mb-10 flex items-center justify-center gap-3 text-sm text-gray-300">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        You will receive a WhatsApp confirmation shortly.
      </div>

      <Link href="/" className="btn-outline-gold px-8 py-3 rounded-md uppercase tracking-wide inline-block transition-all hover:bg-[#d4af37] hover:text-black">
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[100px] -z-10"></div>
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
