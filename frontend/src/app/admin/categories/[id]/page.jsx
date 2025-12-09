"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deleteCategory, fetchCategoryById, updateCategory } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/utils/AuthContext";
import CategoryForm from "@/components/categories/CategoryForm";
import LoadingSpinner from "@/components/Loader";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { user } = useAuth();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (categoryId) => {
    try {
      const categoryData = await fetchCategoryById(categoryId);
      setCategory(categoryData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await updateCategory(id, formData, user.accessToken);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id, user.accessToken);
        router.push("/admin/categories");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!category) return <div>Category not found</div>;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container space-y-4 mx-auto p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">
            Edit Category: <span className="font-normal">{category.name}</span>
          </h1>
          <div className="flex gap-2">
            <button
              className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:text-white hover:bg-red-500"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
            <Link
              className="px-4 py-2 rounded-lg bg-secondary self-center text-white hover:bg-secondary"
              href="/admin/categories"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {category.image && (
              <div className="relative aspect-square">
                <Image
                  src={category.image}
                  alt="Main category image"
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        </div>

        <CategoryForm onSubmit={handleSubmit} initialData={category} />
      </div>
    </ProtectedRoute>
  );
}
