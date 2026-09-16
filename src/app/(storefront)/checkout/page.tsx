"use client";

import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";
import { checkoutFormSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Truck, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    const result = checkoutFormSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: formData.customerName,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        address: formData.address,
        city: formData.city,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      clearCart();
      router.push(`/order/confirmation?orderNumber=${data.orderNumber}`);
    } catch (error: any) {
      setApiError(error.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-1 border-b border-white/[0.06] pb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#dfba73]">
          Maison Atelier
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-medium text-white tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-gray-400 text-xs font-light">
          Complete your delivery details for complimentary VIP dispatch.
        </p>
      </div>

      {apiError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {apiError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* ================= FORM COLUMN ================= */}
        <div className="flex-1 w-full">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c10] p-7 sm:p-10 space-y-8 shadow-2xl shadow-black/60">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="font-heading text-xl font-medium text-white tracking-wide">
                Delivery & Client Details
              </h2>
              <p className="text-gray-400 text-xs font-light mt-1">
                Your order will be verified and tracked via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="e.g. Fatima Ali"
                  />
                  {errors.customerName && (
                    <p className="text-rose-400 text-[11px] mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="+92 300 1234567"
                  />
                  {errors.phone && (
                    <p className="text-rose-400 text-[11px] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                  WhatsApp Number * <span className="text-[#dfba73] normal-case lowercase text-[10px]">(for real-time order updates)</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="+92 300 1234567"
                />
                {errors.whatsapp && (
                  <p className="text-rose-400 text-[11px] mt-1">{errors.whatsapp}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="input-dark"
                  placeholder="Complete street address, House/Apartment No, Sector/Phase"
                />
                {errors.address && (
                  <p className="text-rose-400 text-[11px] mt-1">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-dark"
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                />
                {errors.city && (
                  <p className="text-rose-400 text-[11px] mt-1">{errors.city}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 text-xs font-semibold uppercase tracking-[0.22em] shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Confirming Your Order...</span>
                    </>
                  ) : (
                    <span>Confirm Order • Cash on Delivery</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ================= SUMMARY COLUMN ================= */}
        <div className="w-full lg:w-[420px] shrink-0 sticky top-28 space-y-6">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c10] p-7 space-y-6 shadow-2xl shadow-black/80">
            <h2 className="font-heading text-2xl font-medium text-white tracking-tight">
              Order Summary
            </h2>

            {/* Items list */}
            <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b border-white/[0.04] last:border-0">
                  <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-[#111116] shrink-0 border border-white/[0.08]">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-600">
                        Qitra
                      </div>
                    )}
                    <span className="absolute top-1 right-1 bg-[#c5a059] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-[#dfba73] font-sans font-semibold mt-0.5">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-white/[0.06] pt-4 space-y-3 text-xs text-gray-400 font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>VIP Nationwide Delivery</span>
                <span className="text-[#dfba73] font-semibold text-[10px] uppercase tracking-wider">Complimentary</span>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-4 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest text-gray-300 font-medium">Total Amount</span>
              <span className="text-xl font-semibold text-[#dfba73]">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfba73]" />
              <span>Safe & Verified Order Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
