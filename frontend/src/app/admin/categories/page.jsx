"use client";

import { use, useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/utils/AuthContext";
import LoadingSpinner from "@/components/Loader";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
        await deleteCategory(id, user.accessToken);
        loadCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link
            className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary"
            href="categories/new"
          >
            Add New Category
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
                    className="object-contain"
                    fill
                    sizes="25vw"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="mt-4 flex w-full gap-4">
                <Link
                  className="px-3 py-2 rounded-lg flex grow justify-center items-center transition-colors bg-brand text-brand-white hover:bg-secondary"
                  href={`categories/${category._id}`}
                >
                  Edit
                </Link>
                <button
                  className="px-3 py-2 rounded-lg flex grow items-center justify-center transition-colors border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                  onClick={() => handleDelete(category._id)}
                >
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
