"use client";

import Link from "next/link";
import { use, useState } from "react";

export const HeaderSub = () => {
  const [productsSub, setProductsSub] = useState(false);

  const productsSubChange = () => {
    setProductsSub(!productsSub);
  };

  return (
    <div>
      <div className="p-4 md:px-8 md:py-4 flex items-center gap-4 whitespace-nowrap border-b-[1px] border-border-default">
        <Link
          href="/"
          className="px-3 py-2 rounded-lg bg-[#F5F5F5] hover:bg-[#E8E8E8]"
        >
          Home
        </Link>
        <Link
          href="/builder"
          className="px-3 py-2 rounded-lg flex gap-2 items-center bg-brand text-brand-white hover:bg-secondary"
        >
          <svg
            className="text-brand-white"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.25197 3.06807C8.17614 3.02097 8.08864 2.99604 7.99937 2.99609C7.9101 2.99604 7.8226 3.02097 7.74677 3.06807C7.67094 3.11516 7.60981 3.18255 7.5703 3.26259L6.36977 5.69488L3.68565 6.08443C3.59724 6.09716 3.51416 6.1344 3.44583 6.19193C3.37751 6.24945 3.32666 6.32497 3.29905 6.40992C3.27144 6.49487 3.26818 6.58585 3.28963 6.67256C3.31108 6.75926 3.35639 6.83823 3.42042 6.9005L5.36371 8.79342L4.90466 11.4673C4.88969 11.5553 4.89958 11.6455 4.93323 11.7281C4.96688 11.8107 5.02294 11.8822 5.09509 11.9346C5.16724 11.9869 5.25259 12.0181 5.34151 12.0246C5.43043 12.031 5.51938 12.0124 5.59833 11.971L7.99937 10.7086L10.4004 11.971C10.4794 12.0125 10.5684 12.0311 10.6574 12.0246C10.7464 12.0182 10.8319 11.9869 10.904 11.9345C10.9762 11.882 11.0322 11.8104 11.0658 11.7277C11.0994 11.645 11.1092 11.5546 11.0941 11.4667L10.6357 8.79405L12.5777 6.9005C12.6415 6.8382 12.6866 6.75928 12.708 6.67267C12.7294 6.58606 12.726 6.4952 12.6984 6.41037C12.6708 6.32554 12.6201 6.25012 12.5519 6.19263C12.4836 6.13515 12.4008 6.09789 12.3125 6.08507L9.62834 5.69488L8.42845 3.26259C8.38893 3.18255 8.3278 3.11516 8.25197 3.06807Z"
              fill="currentColor"
            />
          </svg>
          PC Builder
        </Link>
        <button
          onClick={productsSubChange}
          className={`px-3 py-2 rounded-lg flex gap-2 items-center ${
            productsSub
              ? "bg-brand hover:bg-secondary text-brand-white"
              : "bg-[#F5F5F5] hover:bg-[#E8E8E8]"
          }`}
        >
          Products
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          productsSub ? "opacity-100" : "opacity-0"
        } absolute transition-opacity p-4 md:px-8 w-full bg-brand-white border-b-[1px] border-border-default`}
      >
        <ul className="flex gap-4 flex-wrap justify-center items-center font-medium text-balance">
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Cases</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Coolers / Cooling Solutions</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Graphics Cards (GPU)</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Hard Drives</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Headphones / Headsets / Mic</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Keyboard</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Monitors</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Memory (RAM)</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Motherboards</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Mouse</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Peripherals</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Power Supply (PSU)</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Procesors (CPU)</li>
          </Link>
          <Link
            className="hover:underline decoration-brand decoration-2"
            href="#"
          >
            <li>Solid-State Drives (SSD)</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
