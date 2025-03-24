"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "@/utils/api";
import Image from "next/image";

export default function ProductDetails() {
  const { id } = useParams(); // Get the `id` from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId) => {
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading product:", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover rounded"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-brand">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          {product.richDescription && (
            <div className="prose max-w-none">{product.richDescription}</div>
          )}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">In Stock:</span>{" "}
              {product.countInStock}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {product.rating}/5
              ({product.numReviews} reviews)
            </p>
            <button className="flex w-52 whitespace-nowrap flex-grow group items-center font-semibold gap-2 justify-center rounded-full text-brand hover:text-brand-white border-2 border-brand hover:bg-brand p-2 md:px-1 md:py-[2px] hover:opacity-90 transition-opacity">
              <svg
                className="group-hover:text-brand-white"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 1.65772C0 1.29447 0.298477 1 0.666666 1H3.33333C3.65108 1 3.92467 1.22125 3.98703 1.52864L4.54695 3.72483H15.3333C15.532 3.72483 15.7203 3.81226 15.847 3.96329C15.9736 4.11432 16.0254 4.31321 15.9882 4.50576L14.9215 10.024L14.9206 10.0289C14.8291 10.4832 14.5786 10.8912 14.213 11.1816C13.8492 11.4705 13.3944 11.6247 12.9276 11.6174H6.45909C5.99225 11.6247 5.53747 11.4705 5.17365 11.1816C4.80816 10.8913 4.55775 10.4835 4.46622 10.0295L4.4661 10.0289L3.35253 4.53988C3.34801 4.52172 3.34425 4.50326 3.3413 4.48455L2.78688 2.31544H0.666666C0.298477 2.31544 0 2.02097 0 1.65772ZM4.66666 13.6846C4.66666 12.9581 5.26362 12.3691 6 12.3691C6.73638 12.3691 7.33333 12.9581 7.33333 13.6846C7.33333 14.4111 6.73638 15 6 15C5.26362 15 4.66666 14.4111 4.66666 13.6846ZM12 13.6846C12 12.9581 12.5969 12.3691 13.3333 12.3691C14.0697 12.3691 14.6667 12.9581 14.6667 13.6846C14.6667 14.4111 14.0697 15 13.3333 15C12.5969 15 12 14.4111 12 13.6846Z"
                  fill="currentColor"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
