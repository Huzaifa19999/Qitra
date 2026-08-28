"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { productSchema } from '@/lib/validators';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: '',
  });

  useEffect(() => {
    // Categories list for perfume store
    setCategories([
      { id: 1, name: 'Men' },
      { id: 2, name: 'Women' },
      { id: 3, name: 'Children' },
      { id: 4, name: 'Unisex' },
    ]);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to upload image');
    }
    
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        setIsUploading(true);
        finalImageUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        categoryId: parseInt(formData.categoryId, 10),
        image: finalImageUrl || undefined,
      };

      const validation = productSchema.safeParse(dataToSubmit);
      if (!validation.success) {
        alert('Validation error: ' + (validation.error.issues[0]?.message || 'Invalid form data'));
        setLoading(false);
        return;
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/products" className="p-2 glass-gold rounded-lg hover:bg-white/5 text-[#d4af37]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-serif text-white">Add New Product</h1>
      </div>

      <div className="glass card-dark p-8 rounded-xl border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="input-dark w-full px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none text-white"
                placeholder="e.g. Royal Oud Intense"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <select
                required
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
                className="input-dark w-full px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none text-white"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-[#1a1a2e] text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Price (₨)</label>
              <input
                type="number"
                required
                min="0"
                step="1"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="input-dark w-full px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none text-white"
                placeholder="4500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Stock</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                className="input-dark w-full px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none text-white"
                placeholder="25"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="input-dark w-full px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none text-white resize-none"
              placeholder="Detailed fragrance notes, sillage, longevity description..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Product Image</label>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center relative overflow-hidden bg-[#1a1a2e]/30 group hover:border-[#d4af37] transition-colors cursor-pointer">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                ) : (
                  <>
                    <Upload size={24} className="text-gray-500 mb-2 group-hover:text-[#d4af37]" />
                    <span className="text-xs text-gray-500 group-hover:text-[#d4af37]">Upload Image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="text-sm text-gray-400">
                <p>Accepted formats: JPEG, PNG, WEBP</p>
                <p>Maximum size: 5MB</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex justify-end">
            <button
              type="submit"
              disabled={loading || isUploading}
              className="btn-gold px-8 py-3 bg-[#d4af37] hover:bg-[#b5952f] text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
            >
              {(loading || isUploading) && <Loader2 size={18} className="animate-spin" />}
              <span>{isUploading ? 'Uploading Image...' : loading ? 'Saving...' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
