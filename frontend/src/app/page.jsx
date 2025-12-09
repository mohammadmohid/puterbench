import Link from "next/link";
import InfoCarousel from "@/components/Carousel";
import { CircularCard } from "@/components/CircularCard";
import { ProductList } from "@/components/ProductList";
import { fetchCategories, fetchProducts } from "@/utils/api";
import { ChevronRight } from "lucide-react";

export default async function HomePage() {
  const categoriesData = fetchCategories();
  const productsData = fetchProducts();

  const [categories, products] = await Promise.all([
    categoriesData,
    productsData,
  ]);

  const slides = [
    { title: "Build your PC in realtime", image: "/Illustration.png" },
    { title: "Custom Gaming Rigs", image: "/Illustration.png" },
    { title: "High Performance Parts", image: "/Illustration.png" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      <InfoCarousel slides={slides} interval={5000} />

      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-6 border-b border-border-default pb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Shop <span className="text-brand">Top Categories</span>
          </h2>
          <Link
            href="/products"
            className="group flex items-center text-sm font-medium text-gray-600 hover:text-brand transition-colors"
          >
            View All
            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <CircularCard
                key={category._id}
                name={category.name}
                imageSrc={category.image}
                href={`/products?category=${category._id}`}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-8">
              No categories found.
            </p>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-6 border-b border-border-default pb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured <span className="text-brand">Products</span>
          </h2>
          <Link
            href="/products"
            className="group flex items-center text-sm font-medium text-gray-600 hover:text-brand transition-colors"
          >
            View All
            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductList products={products} />
      </section>
    </div>
  );
}
