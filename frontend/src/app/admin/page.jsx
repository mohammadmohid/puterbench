"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { fetchProducts, fetchCategories, fetchAllOrders } from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function AdminsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (user?.isAdmin) {
      Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchAllOrders(user.accessToken),
      ]).then(([products, categories, orders]) => {
        const revenue = orders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
        setStats({
          products: products.length,
          categories: categories.length,
          orders: orders.length,
          revenue,
        });
      });
    }
  }, [user]);

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/admin/products/new">
              <button className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary">
                Add New Product
              </button>
            </Link>
            <Link href="/admin/categories/new">
              <button className="px-3 py-2 rounded-lg flex gap-2 items-center transition-colors bg-brand text-brand-white hover:bg-secondary">
                Add New Category
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">{stats.products}</h3>
            <p className="text-gray-600">Total Products</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">{stats.categories}</h3>
            <p className="text-gray-600">Categories</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">{stats.orders}</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">Rs. {stats.revenue}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border p-4 rounded-lg">
            <div className="relative w-full h-48 object-cover mb-4 rounded">
              <Image
                src="/product.png"
                alt="Products Image"
                fill
                sizes="25vw"
              />
            </div>
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Products</h2>
              <Link
                href="/admin/products"
                className="flex items-center text-text-default hover:text-brand transition-colors"
              >
                View All
                <svg
                  className="text-brand ml-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="border p-4 rounded-lg">
            <div className="relative w-full h-48 object-cover mb-4 rounded">
              <Image
                src="/category.png"
                alt="Categories Image"
                fill
                sizes="25vw"
              />
            </div>
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Categories</h2>
              <Link
                href="/admin/categories"
                className="flex items-center text-text-default hover:text-brand transition-colors"
              >
                View All
                <svg
                  className="text-brand ml-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
