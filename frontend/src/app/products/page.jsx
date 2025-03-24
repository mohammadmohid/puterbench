"use client";

import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductListing() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    brandName: "",
    priceRange: [0, 100000],
    otherFilters: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleBrandNameChange = (e) => {
    const brand = e.target.value;
    if (brand && !selectedFilters.includes("Brand Name")) {
      setSelectedFilters([...selectedFilters, "Brand Name"]);
    }
    setFilters({ ...filters, brandName: brand });
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    if (filter === "Brand Name") {
      setFilters({ ...filters, brandName: "" });
    } else if (filter === "Price") {
      setFilters({ ...filters, priceRange: [0, 10000000] });
    } else {
      setFilters({
        ...filters,
        otherFilters: filters.otherFilters.filter((f) => f !== filter),
      });
    }
  };

  return (
    <div className="flex gap-8 p-8">
      {/* Filters sidebar */}
      <div className="flex-shrink-0 border border-border-default p-4 rounded-lg">
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Selected Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => removeFilter(filter)}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                {filter}{" "}
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
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex items-center">
              <span>Rs. 0</span>
              <input
                type="range"
                min="0"
                max="100000"
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
                className="accent-brand bg-brand flex-grow"
              />
              <span>Rs. {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <select className="p-2 bg-brand text-brand-white rounded-lg">
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-2 bg-brand hover:bg-secondary text-brand-white rounded-lg">
              Latest
            </button>
            <button className="px-4 bg-[#F5F5F5] hover:bg-[#E8E8E8] py-2 rounded-lg">
              Price ascending
            </button>
            <button className="px-4 bg-[#F5F5F5] hover:bg-[#E8E8E8] py-2 rounded-lg">
              Price descending
            </button>
            <button className="px-4 bg-[#F5F5F5] hover:bg-[#E8E8E8] py-2 rounded-lg">
              Rating
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageSrc={product.image}
                onClick={() => router.push(`products/${product._id}`)}
              />
            ))
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-2 items-center">
            <button className="px-4 py-2 hover:bg-[#F5F5F5] rounded-lg">
              Previous
            </button>
            {[1, 2, 3, "...", 9, 10].map((page, i) => (
              <button
                key={i}
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  page === 1 ? "bg-[#F5F5F5]" : "hover:bg-[#F5F5F5]"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 hover:bg-[#F5F5F5] rounded-lg">
              Next
            </button>
          </div>

          <div className="text-sm text-text-secondary">
            Showing 1-12 rows of 150 Results.
          </div>
        </div>
      </div>
    </div>
  );
}
