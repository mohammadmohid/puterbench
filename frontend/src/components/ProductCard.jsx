import Image from "next/image";
import React from "react";

export const ProductCard = ({
  name,
  price,
  discountPercent,
  description,
  imageSrc,
  adaptiveSize = false,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col gap-4 p-4 border border-border-default rounded-lg ${
        adaptiveSize ? "w-full h-full" : "md:w-[250px]"
      } ${className}`}
    >
      <div
        className={`relative h-72 md:w-52 md:h-52 bg-gray-100 ${
          adaptiveSize ? "w-full aspect-square" : ""
        }`}
      >
        <Image
          src={imageSrc || "/placeholder-img.png"}
          alt={name}
          fill
          sizes="25vw"
          onClick={onClick}
        />
      </div>

      <div className="flex flex-col" onClick={onClick}>
        <div className="flex justify-between items-center">
          <h3 className="text-brand line-clamp-1 font-semibold text-[1.125rem]">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-2" onClick={onClick}>
          <span className="text-text-default font-semibold">
            Rs. {price.toLocaleString()}
          </span>
          {discountPercent && (
            <span className="text-text-secondary line-through">
              {(price - price * (discountPercent / 100)).toLocaleString()}
            </span>
          )}
        </div>

        <p
          className="text-text-secondary line-clamp-1 text-ellipsis text-sm mb-2"
          onClick={onClick}
        >
          {description}
        </p>
        <div className="flex md:flex-wrap gap-2">
          {/* <button className="flex md:hidden whitespace-nowrap flex-grow group items-center font-semibold gap-2 justify-center rounded-full text-brand hover:text-brand-white border-2 border-brand hover:bg-brand p-2 md:px-1 md:py-[2px] hover:opacity-90 transition-opacity">
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
          <button className="flex whitespace-nowrap flex-grow group items-center font-semibold gap-2 justify-center rounded-full text-brand-white border-2 border-brand hover:border-transparent bg-brand hover:bg-secondary p-2 md:px-1 md:py-[2px] hover:opacity-90 transition-opacity">
            <svg
              className="group-hover:text-white"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C8.27674 0 8.54216 0.109941 8.73785 0.305628C8.93354 0.501315 9.04348 0.766734 9.04348 1.04348V6.95652H14.9565C15.2333 6.95652 15.4987 7.06646 15.6943 7.26215C15.8901 7.45784 16 7.72326 16 8C16 8.27674 15.8901 8.54216 15.6943 8.73785C15.4987 8.93354 15.2333 9.04348 14.9565 9.04348H9.04348V14.9565C9.04348 15.2333 8.93354 15.4987 8.73785 15.6943C8.54216 15.8901 8.27674 16 8 16C7.72326 16 7.45784 15.8901 7.26215 15.6943C7.06646 15.4987 6.95652 15.2333 6.95652 14.9565V9.04348H1.04348C0.766734 9.04348 0.501315 8.93354 0.305628 8.73785C0.109941 8.54216 0 8.27674 0 8C0 7.72326 0.109941 7.45784 0.305628 7.26215C0.501315 7.06646 0.766734 6.95652 1.04348 6.95652H6.95652V1.04348C6.95652 0.766734 7.06646 0.501315 7.26215 0.305628C7.45784 0.109941 7.72326 0 8 0Z"
                fill="currentColor"
              />
            </svg>
            Add to Build
          </button> */}
          <button className="flex whitespace-nowrap flex-grow group items-center font-semibold gap-2 justify-center rounded-full text-brand hover:text-brand-white border-2 border-brand hover:bg-brand p-2 md:px-1 md:py-[2px] hover:opacity-90 transition-opacity">
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
  );
};
