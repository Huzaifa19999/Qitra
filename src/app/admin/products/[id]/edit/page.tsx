"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { productSchema } from "@/lib/validators";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Trash2,
  ImageIcon,
  Package,
  Tag,
  Layers3,
} from "lucide-react";
import Image from "next/image";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [categories, setCategories] = useState<
    { id: number; name: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
  });

  useEffect(() => {
    setCategories([
      { id: 1, name: "Men" },
      { id: 2, name: "Women" },
      { id: 3, name: "Children" },
      { id: 4, name: "Unisex" },
    ]);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price ? data.price.toString() : "",
          stock: data.stock ? data.stock.toString() : "",
          categoryId: data.categoryId ? data.categoryId.toString() : "",
          image: data.image || "",
        });

        if (data.image) {
          setImagePreview(data.image);
        }
      } catch (error) {
        alert("Error loading product");
      } finally {
        setInitialLoad(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const uploadData = new FormData();

    uploadData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to upload image");
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
        alert(
          "Validation error: " +
            (validation.error.issues[0]?.message ||
              "Invalid form data")
        );

        setLoading(false);
        return;
      }

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!res.ok) {
        const error = await res.json();

        throw new Error(
          error.error || "Failed to update product"
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "An error occurred");

      setLoading(false);
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">
            <Loader2
              size={26}
              className="animate-spin text-[#d4af37]"
            />
          </div>

          <p className="text-sm tracking-wide text-white/40">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="mx-auto mb-8 flex w-full max-w-4xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <Link
              href="/admin/products"
              aria-label="Back to products"
              className="
                group
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.03]
                text-white/60
                transition-all
                duration-300
                hover:border-[#d4af37]/40
                hover:bg-[#d4af37]/10
                hover:text-[#d4af37]
              "
            >
              <ArrowLeft
                size={19}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </Link>

            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[#d4af37]/70">
                Product Management
              </p>

              <h1 className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Edit Product
              </h1>

              <p className="mt-1 text-sm text-white/35">
                Update your product information and inventory.
              </p>
            </div>
          </div>

          {/* Delete */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="
              group
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              self-start
              rounded-xl
              border
              border-red-500/20
              bg-red-500/[0.06]
              px-5
              text-sm
              font-medium
              text-red-400
              transition-all
              duration-300
              hover:border-red-500/50
              hover:bg-red-500/10
              hover:text-red-300
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:self-auto
            "
          >
            {isDeleting ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Trash2
                size={16}
                className="transition-transform group-hover:scale-110"
              />
            )}

            <span>
              {isDeleting
                ? "Deleting..."
                : "Delete Product"}
            </span>
          </button>
        </div>

        {/* ===================================================== */}
        {/* MAIN CARD */}
        {/* ===================================================== */}

        <div
          className="
            mx-auto
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#0c0c0e]
            shadow-[0_25px_80px_rgba(0,0,0,0.35)]
          "
        >
          {/* Gold accent */}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

          <form onSubmit={handleSubmit}>

            {/* ================================================= */}
            {/* BASIC INFORMATION */}
            {/* ================================================= */}

            <section className="mx-auto w-full max-w-4xl p-6 sm:p-8 lg:p-10">

              {/* Section Heading */}

              <div className="mb-8 flex items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06]">
                  <Package
                    size={18}
                    className="text-[#d4af37]"
                  />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white">
                    Basic Information
                  </h2>

                  <p className="mt-0.5 text-xs text-white/35">
                    Essential details about your product
                  </p>
                </div>
              </div>

              {/* Form Grid */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Product Name */}

                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                    Product Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter product name"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.09]
                      bg-white/[0.025]
                      px-4
                      text-sm
                      text-white
                      placeholder:text-white/20
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.15]
                      focus:border-[#d4af37]/60
                      focus:bg-[#d4af37]/[0.025]
                      focus:ring-4
                      focus:ring-[#d4af37]/[0.06]
                    "
                  />
                </div>

                {/* Category */}

                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                    Category
                  </label>

                  <div className="relative">

                    <Tag
                      size={16}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-white/25
                      "
                    />

                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          categoryId: e.target.value,
                        })
                      }
                      className="
                        h-12
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-white/[0.09]
                        bg-white/[0.025]
                        px-11
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.15]
                        focus:border-[#d4af37]/60
                        focus:ring-4
                        focus:ring-[#d4af37]/[0.06]
                      "
                    >
                      <option
                        value=""
                        className="bg-[#101012]"
                      >
                        Select a category
                      </option>

                      {categories.map((cat) => (
                        <option
                          key={cat.id}
                          value={cat.id}
                          className="bg-[#101012] text-white"
                        >
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price */}

                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                    Price
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]/70">
                      ₨
                    </span>

                    <input
                      type="number"
                      required
                      min="0"
                      step="1"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-white/[0.09]
                        bg-white/[0.025]
                        pl-10
                        pr-4
                        text-sm
                        text-white
                        placeholder:text-white/20
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.15]
                        focus:border-[#d4af37]/60
                        focus:bg-[#d4af37]/[0.025]
                        focus:ring-4
                        focus:ring-[#d4af37]/[0.06]
                      "
                    />
                  </div>
                </div>

                {/* Stock */}

                <div className="space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                    Stock Quantity
                  </label>

                  <div className="relative">

                    <Layers3
                      size={16}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-white/25
                      "
                    />

                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-white/[0.09]
                        bg-white/[0.025]
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        placeholder:text-white/20
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.15]
                        focus:border-[#d4af37]/60
                        focus:bg-[#d4af37]/[0.025]
                        focus:ring-4
                        focus:ring-[#d4af37]/[0.06]
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Description */}

              <div className="mt-6 space-y-2">

                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                    Description
                  </label>

                  <span className="text-[10px] text-white/20">
                    Product details
                  </span>
                </div>

                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write a detailed description of your product..."
                  className="
                    min-h-[150px]
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/[0.09]
                    bg-white/[0.025]
                    px-4
                    py-4
                    text-sm
                    leading-6
                    text-white
                    placeholder:text-white/20
                    outline-none
                    transition-all
                    duration-300
                    hover:border-white/[0.15]
                    focus:border-[#d4af37]/60
                    focus:bg-[#d4af37]/[0.025]
                    focus:ring-4
                    focus:ring-[#d4af37]/[0.06]
                  "
                />
              </div>
            </section>

            {/* ================================================= */}
            {/* IMAGE SECTION */}
            {/* ================================================= */}

            <section className="border-t border-white/[0.06]">

              <div className="mx-auto w-full max-w-4xl p-6 sm:p-8 lg:p-10">

                {/* Section Heading */}

                <div className="mb-8 flex items-center gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06]">
                    <ImageIcon
                      size={18}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Product Image
                    </h2>

                    <p className="mt-0.5 text-xs text-white/35">
                      Upload a high-quality product image
                    </p>
                  </div>
                </div>

                {/* Image Upload */}

                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">

                  {/* Upload Box */}

                  <div
                    className="
                      group
                      relative
                      h-48
                      w-48
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-dashed
                      border-white/[0.14]
                      bg-white/[0.02]
                      transition-all
                      duration-500
                      hover:border-[#d4af37]/60
                      hover:bg-[#d4af37]/[0.025]
                    "
                  >
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                          <div className="flex flex-col items-center gap-2">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-black">
                              <Upload size={17} />
                            </div>

                            <span className="text-xs font-medium text-white">
                              Change Image
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center">

                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/[0.07]">
                          <Upload
                            size={21}
                            className="text-[#d4af37]"
                          />
                        </div>

                        <p className="text-sm font-medium text-white/60">
                          Upload Image
                        </p>

                        <p className="mt-1 text-[10px] text-white/25">
                          Click to browse
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    />
                  </div>

                  {/* Upload Information */}

                  <div className="w-full max-w-md text-center sm:text-left">

                    <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">

                      <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />

                      <span className="text-sm font-medium text-white/70">
                        Recommended image
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-white/35">
                      Use a clear, high-resolution image with good
                      lighting. Square images work best for product
                      listings.
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">

                      {["JPEG", "PNG", "WEBP"].map((format) => (
                        <span
                          key={format}
                          className="
                            rounded-lg
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            px-2.5
                            py-1.5
                            text-[10px]
                            font-medium
                            tracking-wide
                            text-white/35
                          "
                        >
                          {format}
                        </span>
                      ))}

                      <span
                        className="
                          rounded-lg
                          border
                          border-[#d4af37]/10
                          bg-[#d4af37]/[0.04]
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-medium
                          tracking-wide
                          text-[#d4af37]/60
                        "
                      >
                        MAX 5MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* FOOTER ACTIONS */}
            {/* ================================================= */}

            <section className="border-t border-white/[0.06] bg-white/[0.012]">

              <div className="mx-auto flex w-full max-w-4xl flex-col-reverse gap-3 p-6 sm:flex-row sm:items-center sm:justify-end sm:p-8 lg:p-10">

                <Link
                  href="/admin/products"
                  className="
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.09]
                    bg-white/[0.025]
                    px-6
                    text-sm
                    font-medium
                    text-white/60
                    transition-all
                    duration-300
                    hover:border-white/[0.16]
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading || isUploading}
                  className="
                    group
                    relative
                    inline-flex
                    h-12
                    min-w-[160px]
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    bg-[#d4af37]
                    px-7
                    text-sm
                    font-semibold
                    text-[#080808]
                    shadow-[0_8px_30px_rgba(212,175,55,0.12)]
                    transition-all
                    duration-300
                    hover:bg-[#e0bd4e]
                    hover:shadow-[0_10px_35px_rgba(212,175,55,0.2)]
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    disabled:hover:bg-[#d4af37]
                  "
                >
                  {loading || isUploading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : null}

                  <span>
                    {isUploading
                      ? "Uploading..."
                      : loading
                      ? "Saving..."
                      : "Save Changes"}
                  </span>
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </main>
  );
}
