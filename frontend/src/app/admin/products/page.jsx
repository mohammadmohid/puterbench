"use client";

import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/utils/AuthContext";
import LoadingSpinner from "@/components/Loader";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id, user.accessToken);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link
            className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary"
            href="products/new"
          >
            Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg">
              <div className="relative w-full h-48 object-cover mb-4 rounded">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-contain"
                    fill
                    sizes="25vw"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Rs. {product.price}</p>
              <div className="mt-4 flex w-full space-x-2">
                <Link
                  className="px-3 py-2 rounded-lg flex grow gap-2 justify-center items-center transition-colors bg-brand text-brand-white hover:bg-secondary"
                  href={`products/${product._id}`}
                >
                  Edit
                </Link>
                <button
                  className="px-3 py-2 rounded-lg flex grow gap-2 justify-center items-center transition-colors border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDelete(product._id)}
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
