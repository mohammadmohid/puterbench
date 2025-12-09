"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const CartModal = ({ cart }) => {
  const router = useRouter();

  const handleCartNavigation = () => {
    router.push("/cart");
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="w-max absolute p-4 rounded-md shadow-md border-[1px] border-border-default bg-white top-16 right-3 lg:top-20 lg:right-8 flex flex-col gap-6 z-20">
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8 max-h-[300px] overflow-y-auto">
            {cart.items.map((item) => (
              <div className="flex gap-4" key={item.product._id}>
                <Image
                  src={item.product.image || "/placeholder-img.png"}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="bg-gray-100 object-contain rounded-md w-16 h-16"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <div className="p-1 rounded-sm flex items-center gap-2">
                        Rs. {item.product.price}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">
                      {item.product.brand}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">Rs. {cart.totalPrice}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm gap-2">
              <button
                onClick={handleCartNavigation}
                className="rounded-md py-3 px-4 ring-1 ring-brand text-brand hover:text-brand-white hover:bg-brand"
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className="rounded-md py-3 px-4 bg-brand hover:bg-secondary text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
