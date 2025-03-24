"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const CartModal = () => {
  // TEMPORARY
  const cartItems = true;

  const router = useRouter();

  const handleCartNavigation = () => {
    router.push("/cart");
  };

  return (
    <div className="w-max absolute p-4 rounded-md shadow-md border-[1px] border-border-default bg-white top-16 right-3 lg:top-20 lg:right-8 flex flex-col gap-6 z-20">
      {!cartItems ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src="/placeholder-img.png"
                alt=""
                width={72}
                height={96}
                className="bg-gray-100 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 rounded-sm flex items-center gap-2">
                      Rs. 1000
                    </div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-brand cursor-pointer">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">Rs. 1000</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button
                onClick={handleCartNavigation}
                className="rounded-md py-3 px-4 ring-1 ring-brand text-brand hover:text-brand-white hover:bg-brand"
              >
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-brand hover:bg-secondary text-white">
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
