"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCart, updateCartItem, removeFromCart } from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="flex flex-row items-start gap-4 p-4 border-b border-border-default">
    <div className="relative w-24 h-24 bg-gray-100 rounded">
      <Image
        src={item.product.image || "/placeholder-img.png"}
        alt=""
        fill
        sizes="25vw"
        className="object-cover"
      />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium text-lg">{item.product.name}</h3>
      <p className="text-brand font-medium text-lg mt-2">
        Rs. {item.product.price}
      </p>
    </div>
    <div className="flex items-center gap-4 mt-2 sm:mt-0">
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
          className="w-4 h-4 md:w-8 md:h-8 bg-[#F5F5F5] rounded-sm md:rounded-md flex items-center justify-center"
        >
          -
        </button>
        <span className="w-4 md:w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
          className="w-4 h-4 md:w-8 md:h-8 bg-[#F5F5F5] rounded-sm md:rounded-md flex items-center justify-center"
        >
          +
        </button>
      </div>
      <button onClick={() => removeItem(item.product._id)}>
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
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCart();
    } else if (!authLoading) {
      setCartLoading(false);
    }
  }, [user, authLoading]);

  const loadCart = async () => {
    try {
      const data = await fetchCart(user._id, user.accessToken);
      setCart(data);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Optional: separate remove call needed for 0
    try {
      await updateCartItem(user._id, productId, newQuantity, user.accessToken);
      loadCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(user._id, productId, user.accessToken);
      loadCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  if (authLoading || cartLoading)
    return <div className="p-8 text-center">Loading Cart...</div>;
  if (!user)
    return (
      <div className="p-8 text-center">
        Please{" "}
        <Link href="/login" className="text-brand underline">
          login
        </Link>{" "}
        to view your cart.
      </div>
    );
  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="p-8 text-center">
        Your Cart is Empty.{" "}
        <Link href="/products" className="text-brand underline">
          Shop Now
        </Link>
      </div>
    );

  const discount = 0;
  const deliveryFee = 15;
  const total = (cart.totalPrice || 0) - discount + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/">Home</Link> <span className="mx-2">›</span>{" "}
        <span>Cart</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow border rounded-sm border-b-0 border-border-default">
          {cart.items.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              updateQuantity={handleUpdateQuantity}
              removeItem={handleRemoveItem}
            />
          ))}
        </div>

        <div className="lg:w-96 p-6 h-fit border rounded-xl border-border-default">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {cart.totalPrice}</span>
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
          <Link
            href="/checkout"
            className="w-full mt-6 px-6 py-3 bg-brand hover:bg-secondary text-brand-white font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            <span>Checkout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
