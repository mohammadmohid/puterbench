"use client";

import ProductForm from "@/components/products/ProductForm";
import { createProduct, fetchCategories } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
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

  const handleSubmit = async (formData) => {
    try {
      await createProduct(formData);
      router.push("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} categories={categories} />
    </div>
  );
}
