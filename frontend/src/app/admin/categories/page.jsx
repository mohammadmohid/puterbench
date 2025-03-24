"use client";

import { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading categories:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link href="categories/new">
            <button className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary">
              Add New Category
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category._id} className="border p-4 rounded-lg">
              <div className="relative w-full h-48 object-cover mb-4 rounded">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="25vw"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="text-gray-600">${category.price}</p>
              <div className="mt-4 flex space-x-2">
                <Link href={`categories/${category._id}`}>
                  <button className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary">
                    Edit
                  </button>
                </Link>
                <button onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
