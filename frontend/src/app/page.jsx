"use client";

import Link from "next/link";
import InfoCarousel from "@/components/Carousel";
import { CircularCard } from "@/components/CircularCard";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { fetchCategories, fetchProducts } from "@/utils/api";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/Loader";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadProducts();
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

  const slides = [
    {
      title: "Build your PC in realtime",
      image: "/Illustration.png",
    },
    {
      title: "Lol",
      image: "/Illustration.png",
    },
    {
      title: "More Lol",
      image: "/Illustration.png",
    },
  ];
  return (
    <div className="">
      <InfoCarousel slides={slides} interval={5000} />
      <section className="w-full p-4 md:p-8">
        <div className="relative flex justify-between items-center mb-5">
          <h2 className="text-text-default text-xl font-medium underline underline-offset-[12px] decoration-brand decoration-2">
            Shop <span className="text-brand">Top Categories</span>
          </h2>
          <Link
            href="/products"
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
          <div className="absolute bottom-0 translate-y-2 h-[1px] w-full bg-border-default rounded-md"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            categories.map((category) => (
              <CircularCard
                key={category._id}
                name={category.name}
                imageSrc={category.image}
                href="/products"
              />
            ))
          )}
        </div>
      </section>
      {loading ? <LoadingSpinner /> : <FeaturedProducts products={products} />}
    </div>
  );
};

export default HomePage;
