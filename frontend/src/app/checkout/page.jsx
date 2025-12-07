"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { fetchCart, createOrder } from "@/utils/api";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (user) {
      fetchCart(user._id, user.accessToken).then(setCart);
    }
  }, [user]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) return;

    const orderData = {
      orderItems: cart.items.map((item) => ({
        name: item.product.name,
        qty: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id,
      })),
      shippingAddress: { address, city, postalCode, country },
      paymentMethod: "Cash On Delivery", // Mock payment for demo
      totalPrice: cart.totalPrice + 15, // +15 shipping
    };

    try {
      await createOrder(orderData, user.accessToken);
      alert("Order Placed Successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <input
            required
            placeholder="Address"
            className="w-full p-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            required
            placeholder="City"
            className="w-full p-2 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            required
            placeholder="Postal Code"
            className="w-full p-2 border rounded"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            required
            placeholder="Country"
            className="w-full p-2 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-brand text-white py-3 rounded font-bold hover:bg-secondary"
          >
            Place Order (COD)
          </button>
        </form>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between py-2 border-b"
            >
              <span>
                {item.product.name} (x{item.quantity})
              </span>
              <span>Rs. {item.product.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4 pt-4 border-t">
            <span>Total (inc. shipping)</span>
            <span>Rs. {cart.totalPrice + 15}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
