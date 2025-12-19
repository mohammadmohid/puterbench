"use client";

import LoadingSpinner from "@/components/Loader";
import { ProductCard } from "@/components/ProductCard";
import { fetchCategories, fetchProducts } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ProductListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    brandName: "",
    priceRange: [0, 1000000],
  });
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [products, categories]);

  const loadProducts = async () => {
    try {
      const productsData = await fetchProducts();
      const categoriesData = await fetchCategories();
      const [categories, products] = await Promise.all([
        categoriesData,
        productsData,
      ]);
      setProducts(products);
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      console.error("Error loading products and categories:", error);
      setLoading(false);
    }
  };

  const handleBrandNameChange = (e) => {
    const brand = e.target.value;
    if (brand && !selectedFilters.includes("Brand Name")) {
      setSelectedFilters([...selectedFilters, "Brand Name"]);
    } else if (!brand) {
      setSelectedFilters(selectedFilters.filter((f) => f !== "Brand Name"));
    }
    setFilters({ ...filters, brandName: brand });
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    if (filter === "Brand Name") {
      setFilters({ ...filters, brandName: "" });
    } else if (filter === "Price") {
      setFilters({ ...filters, priceRange: [0, 1000000] });
    }
  };

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (categoryQuery && product.category !== categoryQuery) {
      return false;
    }

    if (
      filters.brandName &&
      !product.brand?.toLowerCase().includes(filters.brandName.toLowerCase())
    ) {
      return false;
    }

    if (product.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Filters sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 border border-border-default p-4 rounded-lg h-fit">
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Selected Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.length === 0 && (
              <span className="text-gray-500 text-sm">No filters selected</span>
            )}
            {selectedFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => removeFilter(filter)}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                {filter}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 1L1 15M1 1L15 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Brand</h3>
            <input
              type="text"
              placeholder="Enter brand name"
              value={filters.brandName}
              onChange={handleBrandNameChange}
              className="w-full p-2 border rounded-lg focus:outline-brand"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex flex-col gap-2">
              <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  if (!selectedFilters.includes("Price")) {
                    setSelectedFilters([...selectedFilters, "Price"]);
                  }
                  setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value)],
                  });
                }}
                className="accent-brand bg-brand w-full cursor-pointer"
              />
              <div className="flex justify-between text-sm">
                <span>Rs. 0</span>
                <span>Rs. {filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex gap-2 items-center">
            <span className="text-gray-600">Sort By:</span>
            <select className="p-2 border rounded-lg focus:outline-brand bg-white">
              <option value="latest">Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                discountPercent={product.discountPercent}
                description={product.description}
                imageSrc={product.image}
                productId={product._id}
                onClick={() => router.push(`products/${product._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductListing() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductListingContent />
    </Suspense>
  );
}
