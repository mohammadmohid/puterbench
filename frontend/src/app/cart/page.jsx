"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCart, updateCartItem, removeFromCart } from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";
import LoadingSpinner from "@/components/Loader";
import { ChevronRight, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const CartItem = ({ item, updateQuantity, removeItem, isUpdating }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start gap-4 p-4 border-b border-border-default transition-opacity ${
        isUpdating ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.product.image || "/placeholder-img.png"}
          alt={item.product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {item.product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              {item.product.category || "General"}
            </p>
          </div>
          <p className="font-bold text-lg text-brand hidden sm:block">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>

        {/* Mobile Price */}
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-lg text-brand sm:hidden">
            {formatPrice(item.product.price * item.quantity)}
          </p>

          <div className="flex items-center gap-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-medium text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1)
                }
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.product._id)}
              className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [updatingItems, setUpdatingItems] = useState(new Set());

  const loadCart = async () => {
    if (!user) return;
    try {
      const data = await fetchCart(user._id, user.accessToken);
      setCart(data);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const previousCart = { ...cart };
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ),
      totalPrice: prev.items.reduce((acc, item) => {
        const qty =
          item.product._id === productId ? newQuantity : item.quantity;
        return acc + item.product.price * qty;
      }, 0),
    }));

    setUpdatingItems((prev) => new Set(prev).add(productId));

    try {
      await updateCartItem(user._id, productId, newQuantity, user.accessToken);
    } catch (error) {
      console.error("Failed to update quantity", error);
      setCart(previousCart);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    const previousCart = { ...cart };

    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product._id !== productId),
      totalPrice: prev.items
        .filter((item) => item.product._id !== productId)
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    }));

    try {
      await removeFromCart(user._id, productId, user.accessToken);
    } catch (error) {
      console.error("Failed to remove item", error);
      setCart(previousCart);
      alert("Could not remove item.");
    }
  };

  const deliveryFee = 150;
  const subtotal = cart?.totalPrice || 0;
  const total = subtotal + deliveryFee;

  if (authLoading || loading) {
    return (
      <div className="w-full min-h-[60vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Please log in
        </h2>
        <p className="text-gray-500 mb-6">
          View items in your cart and checkout.
        </p>
        <Link
          href="/login"
          className="px-6 py-3 bg-brand text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Login to Continue
        </Link>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Go ahead and
          explore our top categories.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg shadow-brand/20"
        >
          Start Shopping <ChevronRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">Cart</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart ({cart.items.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-grow">
          <div className="bg-white rounded-xl shadow-sm border border-border-default overflow-hidden">
            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                isUpdating={updatingItems.has(item.product._id)}
                updateQuantity={handleUpdateQuantity}
                removeItem={handleRemoveItem}
              />
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl border border-border-default shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-brand block">
                  {formatPrice(total)}
                </span>
                <span className="text-xs text-gray-500 font-normal">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-brand hover:bg-secondary text-white font-semibold rounded-lg shadow-lg shadow-brand/20 transition-all transform active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-6 text-center">
              <Link
                href="/products"
                className="text-sm text-gray-500 hover:text-brand transition-colors underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
