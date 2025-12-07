"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";

export default function AdminsPage() {
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
