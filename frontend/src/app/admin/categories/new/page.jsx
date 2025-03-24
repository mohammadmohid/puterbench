"use client";

import CategoryForm from "@/components/categories/CategoryForm";
import { createCategory } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      await createCategory(formData);
      router.push("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
