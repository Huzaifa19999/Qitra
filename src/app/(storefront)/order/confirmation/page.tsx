"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CheckCircle2, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="rounded-3xl border border-[#c5a059]/30 bg-[#0c0c10] p-8 sm:p-14 max-w-xl w-full text-center relative z-10 animate-fade-in-up shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(197,160,89,0.12)]">
      
      {/* Icon */}
      <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </div>

      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#dfba73]">
        Order Placed Successfully
      </span>

      <h1 className="font-heading text-3xl sm:text-4xl text-white font-medium tracking-tight mt-2 mb-3">
        Thank You for Your Order
      </h1>

      <p className="text-gray-400 text-xs sm:text-sm font-light mb-8 max-w-md mx-auto leading-relaxed">
        Your bespoke selection is currently being prepared at our atelier. Your luxury journey begins here.
      </p>

      {orderNumber && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 mb-8 inline-block min-w-[260px]">
          <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1 font-medium">Order Number</p>
          <p className="font-heading text-2xl font-semibold text-[#dfba73] tracking-widest">{orderNumber}</p>
        </div>
      )}

      <div className="rounded-2xl border border-[#c5a059]/20 bg-[#c5a059]/[0.05] p-4 mb-8 flex items-center justify-center gap-2.5 text-xs text-[#dfba73]">
        <MessageCircle className="w-4 h-4 text-[#dfba73]" />
        <span>You will receive an order confirmation and live dispatch tracking via WhatsApp.</span>
      </div>

      <Link
        href="/"
        className="btn-gold text-xs px-8 py-3.5 inline-flex items-center gap-2 shadow-lg shadow-[#c5a059]/20"
      >
        <span>Return to Maison</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/[0.05] rounded-full blur-[140px] -z-10" />
      <Suspense fallback={<LoadingSpinner size="lg" />}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
