"use client";

import Image from "next/image";
import { SearchField } from "./SearchField";
import Link from "next/link";
import { useState } from "react";

export const HeaderTop = () => {
  const [authMenu, setAuthMenu] = useState(false);

  const toggleAuthMenu = () => {
    setAuthMenu(!authMenu);
  };

  return (
    <div className="p-4 md:px-8 md:py-4 border-b-[1px] border-border-default flex-wrap lg:flex-nowrap flex gap-4 justify-between items-center">
      <div className="flex gap-2 flex-shrink-0 items-center">
        <div className="relative md:hidden">
          <button
            onClick={toggleAuthMenu}
            className={`relative rounded-full ring-inset focus:ring-1 focus:ring-brand focus:outline-none min-w-6 min-h-6 ${
              !authMenu ? "hover:bg-[#E8E8E8]" : "bg-brand"
            }`}
          >
            {!authMenu && (
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5H13M1 1.5H13M1 9.5H13"
                  stroke="#2F2E41"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {authMenu && (
              <svg
                className="text-brand-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1L1 15M1 1L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <div
            className={`mt-2 absolute z-10 flex flex-col ${
              authMenu ? "opacity-100" : "opacity-0"
            } gap-2 rounded-xl p-4 bg-[#F5F5F5] border-[1px] border-border-default transition-opacity ease-in-out [box-shadow:0px_15px_24px_0px_rgba(0,0,0,0.15)]`}
          >
            <Link
              href="/login"
              className="px-3 py-2 min-w-full rounded-lg bg-[#F5F5F5] hover:bg-[#E8E8E8]"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3 py-2 w-full rounded-lg bg-brand text-brand-white hover:bg-secondary"
            >
              Register
            </Link>
          </div>
        </div>
        <Link href="/">
          <Image src="/logo.png" alt="Puterbench" width={220} height={36} />
        </Link>
      </div>
      <div className="order-1 lg:order-[0] w-full">
        <SearchField placeholder="Search Products..." />
      </div>
      <div className="flex whitespace-nowrap gap-4 items-center">
        <Link
          href="/login"
          className="px-3 py-2 rounded-lg bg-[#F5F5F5] hover:bg-[#E8E8E8] hidden md:block"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-3 py-2 rounded-lg bg-brand text-brand-white hover:bg-secondary hidden md:block"
        >
          Register
        </Link>
        <div className="h-10 border-l-[1px] border-border-default"></div>
        <Link className="flex gap-2" href="#">
          <svg
            className="text-brand"
            width="28"
            height="25"
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
          <p className="hidden md:block font-semibold">Cart</p>
        </Link>
      </div>
    </div>
  );
};
