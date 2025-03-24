"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ product, updateQuantity, removeItem }) => (
  <div className="flex flex-row items-start gap-4 p-4 border-b border-border-default">
    <div className="relative w-24 h-24 bg-gray-100 rounded">
      <Image
        src={product.imageSrc || "/placeholder-img.png"}
        alt=""
        fill
        sizes="25vw"
      />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium text-lg">{product.name}</h3>
      <div className="text-sm text-text-secondary">
        <p>Option 1: {product.option1}</p>
        <p>Option 2: {product.option2}</p>
      </div>
      <p className="text-brand font-medium text-lg mt-2">Rs. {product.price}</p>
    </div>
    <div className="flex items-center gap-4 mt-2 sm:mt-0">
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(product.id, -1)}
          className="w-4 h-4 md:w-8 md:h-8 bg-[#F5F5F5] rounded-sm md:rounded-md flex items-center justify-center"
        >
          -
        </button>
        <span className="w-4 md:w-8 text-center">{product.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, 1)}
          className="w-4 h-4 md:w-8 md:h-8 bg-[#F5F5F5] rounded-sm md:rounded-md flex items-center justify-center"
        >
          +
        </button>
      </div>
      <button onClick={() => removeItem(product.id)}>
        <svg
          className="text-brand"
          width="20"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.25 3.5H13.5V2.75C13.5 2.15326 13.2629 1.58097 12.841 1.15901C12.419 0.737053 11.8467 0.5 11.25 0.5H6.75C6.15326 0.5 5.58097 0.737053 5.15901 1.15901C4.73705 1.58097 4.5 2.15326 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM7.5 14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75V14.75ZM12 14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75V14.75ZM12 3.5H6V2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
);

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product Name",
      option1: "Value",
      option2: "Value",
      price: 145,
      quantity: 1,
    },
    {
      id: 2,
      name: "Product Name",
      option1: "Value",
      option2: "Value",
      price: 145,
      quantity: 1,
    },
    {
      id: 3,
      name: "Product Name",
      option1: "Value",
      option2: "Value",
      price: 145,
      quantity: 1,
    },
  ]);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(1, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const removeItem = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/">Home</Link>
        <span className="mx-2">›</span>
        <span>Cart</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Cart Items */}
        <div className="flex-grow border rounded-sm border-b-0 border-border-default">
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 p-6 h-fit border rounded-xl border-border-default">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-brand">
              <span>Discount (-20%)</span>
              <span>-Rs. {discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border-default">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2 justify-end max-sm:flex-wrap">
            <input
              placeholder="Add Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-grow px-4 border rounded-full border-border-default focus:outline-none"
            />
            <button className="px-4 py-2 transition-colors bg-brand hover:bg-secondary text-brand-white rounded-lg">
              Apply
            </button>
          </div>

          <button className="w-full mt-6 px-6 py-3 transition-colors bg-brand hover:bg-secondary text-brand-white font-semibold rounded-lg flex items-center justify-center gap-2">
            <span>Checkout</span>
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.76883 1.32695C8.20476 0.891017 8.91156 0.891017 9.34749 1.32695L15.673 7.65254C16.109 8.08847 16.109 8.79527 15.673 9.2312L9.34749 15.5568C8.91156 15.9927 8.20476 15.9927 7.76883 15.5568C7.3329 15.1208 7.3329 14.4141 7.76883 13.9782L12.1888 9.55816H1.11628C0.499782 9.55816 0 9.05837 0 8.44187C0 7.82537 0.499782 7.32559 1.11628 7.32559H12.1888L7.76883 2.90561C7.3329 2.46968 7.3329 1.76288 7.76883 1.32695Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
