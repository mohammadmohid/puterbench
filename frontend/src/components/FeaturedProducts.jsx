import Link from "next/link";
import { ProductList } from "./ProductList";

export const FeaturedProducts = ({ products }) => {
  return (
    <section className="w-full p-4 md:p-8">
      <div className="relative flex justify-between items-center mb-5">
        <h2 className="text-text-default text-xl font-medium underline underline-offset-[12px] decoration-brand decoration-2">
          Featured <span className="text-brand">Products</span>
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
      <ProductList products={products} />
    </section>
  );
};
