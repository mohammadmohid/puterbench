"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import {
  fetchProductById,
  updateProduct,
  fetchCategories,
  deleteProductImage,
} from "@/utils/api";
import Image from "next/image";
import { useAuth } from "@/utils/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (productId) => {
    try {
      const [productData, categoriesData] = await Promise.all([
        fetchProductById(productId),
        fetchCategories(),
      ]);
      setProduct(productData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await updateProduct(id, formData, user.accessToken);
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImageDelete = async (imageIndex) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteProductImage(id, imageIndex, user.accessToken);
        loadData(id);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          Edit Product: {product.name}
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.image && (
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt="Main product image"
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleImageDelete("main")}
                >
                  Delete
                </button>
              </div>
            )}
            {product.images?.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleImageDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          initialData={product}
          categories={categories}
        />
      </div>
    </ProtectedRoute>
  );
}
