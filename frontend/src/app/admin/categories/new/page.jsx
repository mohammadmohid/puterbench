"use client";

import CategoryForm from "@/components/categories/CategoryForm";
import { createCategory } from "@/utils/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/utils/AuthContext";

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      await createCategory(formData, user.accessToken);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </ProtectedRoute>
  );
}
