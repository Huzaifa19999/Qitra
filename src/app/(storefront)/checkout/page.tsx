"use client";

import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";
import { checkoutFormSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
    city: ""
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      result.error.issues.forEach(issue => {
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
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-heading text-4xl mb-10 text-gradient-gold">Secure Checkout</h1>
      
      {apiError && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {apiError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="glass p-8 rounded-xl">
            <h2 className="font-heading text-2xl text-white mb-6 border-b border-white/10 pb-4">Delivery & Contact Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Full Name</label>
                  <input 
                    type="text" name="customerName" value={formData.customerName} onChange={handleChange}
                    className="input-dark" 
                    placeholder="John Doe"
                  />
                  {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Phone Number</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="input-dark" 
                    placeholder="+92 300 1234567"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                  WhatsApp Number <span className="text-xs text-[#d4af37] lowercase normal-case">(For order updates)</span>
                </label>
                <input 
                  type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange}
                  className="input-dark" 
                  placeholder="+92 300 1234567"
                />
                {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Delivery Address</label>
                <textarea 
                  name="address" value={formData.address} onChange={handleChange} rows={3}
                  className="input-dark" 
                  placeholder="Street address, Apartment / House No."
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">City</label>
                <input 
                  type="text" name="city" value={formData.city} onChange={handleChange}
                  className="input-dark" 
                  placeholder="Lahore / Karachi / Islamabad"
                />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-gold w-full py-4 mt-8 rounded-md text-lg uppercase tracking-wider font-semibold hover:scale-[1.01] transition-transform flex justify-center items-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Creating Order...
                  </>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-[450px] shrink-0">
          <div className="glass-gold p-8 rounded-xl sticky top-24">
            <h2 className="font-heading text-2xl text-white mb-6">Your Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded bg-[#0a0a0a] flex items-center justify-center shrink-0 border border-white/10 overflow-hidden relative">
                       {item.image && <img src={item.image} alt={item.name} className="object-cover w-full h-full" />}
                       <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                         {item.quantity}
                       </span>
                    </div>
                    <div>
                      <p className="text-sm text-white line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(item.price)} each</p>
                    </div>
                  </div>
                  <div className="text-white font-medium ml-4 text-sm">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-4 font-body">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Delivery Charge</span>
                <span className="text-emerald-400 font-semibold">Free Delivery</span>
              </div>
              <div className="flex justify-between text-xl text-white font-medium mt-4 pt-4 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-[#d4af37]">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
