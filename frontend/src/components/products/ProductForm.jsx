"use client";

import { useState } from "react";

export default function ProductForm({
  onSubmit,
  initialData = null,
  categories,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    isFeatured: false,
    ...initialData,
  });
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (mainImage) formDataToSend.append("image", mainImage);
      additionalImages.forEach((img) => {
        formDataToSend.append("images", img);
      });
      await onSubmit(formDataToSend);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border-default p-4 rounded-lg space-y-4"
    >
      <div className="flex items-center gap-4">
        <label className="font-medium text-lg whitespace-nowrap">
          Product Name
        </label>
        <input
          className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          type="text"
          placeholder="Enter product name."
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium  self-start text-lg whitespace-nowrap">
          Description
        </label>
        <textarea
          rows={1}
          placeholder="Enter product description."
          className="w-full px-4 py-2 min-h-5 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium  self-start text-lg whitespace-nowrap">
          Brand Name
        </label>
        <input
          type="text"
          placeholder="Enter brand name."
          className="w-full px-4 py-2 min-h-5 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium  self-start text-lg whitespace-nowrap">
          Price
        </label>
        <input
          type="number"
          placeholder="Enter price in Rs."
          className="w-full px-4 py-2 min-h-5 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium  self-start text-lg whitespace-nowrap">
          Category
        </label>
        <select
          value={formData.category}
          className="w-full px-4 py-2 min-h-5 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="" disabled>
            Select Category
          </option>{" "}
          {/* Placeholder */}
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium  self-start text-lg whitespace-nowrap">
          Count in Stock
        </label>
        <input
          type="number"
          placeholder="Enter stock number"
          className="w-full px-4 py-2 min-h-5 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          value={formData.countInStock}
          onChange={(e) =>
            setFormData({ ...formData, countInStock: e.target.value })
          }
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-medium self-start text-lg whitespace-nowrap">
          Main Image
        </label>
        <input
          type="file"
          onChange={(e) => setMainImage(e.target.files[0])}
          accept="image/*"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-medium self-start text-lg whitespace-nowrap">
          Additional Images
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => setAdditionalImages(Array.from(e.target.files))}
          accept="image/*"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="accent-brand active:accent-secondary text-brand-white"
          checked={formData.isFeatured}
          onChange={(e) =>
            setFormData({ ...formData, isFeatured: e.target.checked })
          }
        />
        <label className="font-medium self-start text-lg whitespace-nowrap">
          Featured Product
        </label>
      </div>

      <button
        className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}
