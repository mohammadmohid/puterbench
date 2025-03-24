"use client";

import { useState } from "react";

export default function CategoryForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    ...initialData,
  });
  const [mainImage, setMainImage] = useState(null);
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
          Category Name
        </label>
        <input
          className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          type="text"
          placeholder="Enter category name."
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-medium self-start text-lg whitespace-nowrap">
          Category Image
        </label>
        <input
          type="file"
          onChange={(e) => setMainImage(e.target.files[0])}
          accept="image/*"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium text-lg whitespace-nowrap">
          Color (optional)
        </label>
        <input
          className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
          type="text"
          placeholder="Enter category color."
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          required
        />
      </div>

      <button
        className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Category"
          : "Create Category"}
      </button>
    </form>
  );
}
