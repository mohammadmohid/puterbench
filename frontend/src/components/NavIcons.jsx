import Link from "next/link";
import CartModal from "./CartModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/utils/AuthContext";

const NavIcons = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProfile = () => {
    if (!user) {
      router.push("/login");
    } else {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setIsProfileOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex min-w-max whitespace-nowrap gap-2 md:gap-4 items-center">
      <div className="relative">
        <div className="flex gap-2 items-center">
          <div className="relative outline outline-[1px] outline-brand rounded-md w-[25px] h-[25px] ">
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand cursor-pointer"
              width="20"
              height="20"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleProfile}
            >
              <path
                d="M5.99984 5.79995C5.21318 5.79995 4.54984 5.52995 4.00984 4.98995C3.46984 4.44995 3.19984 3.78662 3.19984 2.99995C3.19984 2.21328 3.46984 1.54995 4.00984 1.00995C4.54984 0.469951 5.21318 0.199951 5.99984 0.199951C6.78651 0.199951 7.44984 0.469951 7.98984 1.00995C8.52984 1.54995 8.79984 2.21328 8.79984 2.99995C8.79984 3.78662 8.52984 4.44995 7.98984 4.98995C7.44984 5.52995 6.78651 5.79995 5.99984 5.79995Z"
                fill="currentColor"
              />
              <path
                d="M1.08032 10.131C2.03679 8.36059 3.98849 7.39995 6.00073 7.39995V7.39995V7.39995C8.10078 7.39995 10.1778 8.4005 11.1498 10.262C11.7497 11.4108 12.0908 12.5692 12.1602 13H0C0.0719994 12.5528 0.437056 11.3216 1.08032 10.131Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <svg
            className={`text-secondary cursor-pointer ${
              user ? "block" : "hidden"
            }`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleProfile}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={`mt-2 absolute right-0 z-30 flex flex-col ${
            isProfileOpen ? "block" : "hidden"
          } gap-2 rounded-xl p-4 bg-[#F5F5F5] border-[1px] border-border-default transition-opacity ease-in-out shadow-lg w-auto min-w-max`}
        >
          <div className="group flex min-w-fit flex-shrink-0 items-center gap-2 px-3 py-2 rounded-lg transition-colors border-2 border-transparent hover:text-brand bg-[#F5F5F5] active:bg-brand active:text-brand-white hover:border-brand whitespace-nowrap">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.64294 3.14291L0.426777 1.92675C0.269286 1.76926 0 1.8808 0 2.10353V5.74998C0 5.88805 0.111929 5.99998 0.25 5.99998H3.89645C4.11917 5.99998 4.23071 5.73069 4.07322 5.5732L2.715 4.21498C3.89508 2.57019 5.82314 1.5 8.00007 1.5C11.5899 1.5 14.5001 4.41015 14.5001 8C14.5001 11.5899 11.5899 14.5 8.00007 14.5C4.63773 14.5 1.87085 11.9464 1.53446 8.67332C1.49211 8.26128 1.12376 7.96158 0.711712 8.00393C0.299669 8.04628 -2.88747e-05 8.41463 0.0423185 8.82668C0.456521 12.8569 3.86076 16 8.00007 16C12.4183 16 16.0001 12.4183 16.0001 8C16.0001 3.58172 12.4183 0 8.00007 0C5.40771 0 3.10436 1.23301 1.64294 3.14291ZM7.75 4C8.16421 4 8.5 4.33579 8.5 4.75V7.74223L10.5285 8.55364C10.9131 8.70748 11.1002 9.14396 10.9464 9.52854C10.7925 9.91313 10.356 10.1002 9.97146 9.94636L7.47146 8.94636C7.18671 8.83246 7 8.55668 7 8.25V4.75C7 4.33579 7.33579 4 7.75 4Z"
                fill="currentColor"
              />
            </svg>

            <Link className="select-none" href="/history">
              Order History
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="group flex min-w-fit flex-shrink-0 items-center gap-2 px-3 py-2 rounded-lg transition-colors border-2 border-transparent hover:text-red-600 bg-[#F5F5F5] active:bg-red-600 active:text-brand-white hover:border-red-600 whitespace-nowrap"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 2.75C2 1.7835 2.7835 1 3.75 1H6.25C6.66421 1 7 1.33579 7 1.75C7 2.16421 6.66421 2.5 6.25 2.5H3.75C3.61193 2.5 3.5 2.61193 3.5 2.75V13.25C3.5 13.3881 3.61193 13.5 3.75 13.5H6.25C6.66421 13.5 7 13.8358 7 14.25C7 14.6642 6.66421 15 6.25 15H3.75C2.7835 15 2 14.2165 2 13.25V2.75ZM12.4393 7.25H6.75002C6.33581 7.25 6.00002 7.58579 6.00002 8C6.00002 8.41422 6.33581 8.75 6.75002 8.75H12.4393L10.4697 10.7197C10.1768 11.0126 10.1768 11.4874 10.4697 11.7803C10.7626 12.0732 11.2374 12.0732 11.5303 11.7803L14.7803 8.53033C15.0732 8.23744 15.0732 7.76256 14.7803 7.46967L11.5303 4.21967C11.2374 3.92678 10.7626 3.92678 10.4697 4.21967C10.1768 4.51256 10.1768 4.98744 10.4697 5.28033L12.4393 7.25Z"
                fill="currentColor"
              />
            </svg>
            <span className="select-none">Logout</span>
          </button>
        </div>
      </div>
      <div className="h-10 border-l-[1px] border-border-default"></div>
      <div
        className="relative cursor-pointer flex gap-2 items-center"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
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
        <p className="hidden md:block font-semibold select-none">Cart</p>
        <div className="relative w-5 h-5">
          <p className="absolute select-none -top-2 right-0 w-6 h-6 z-10 text-sm flex justify-center items-center rounded-full bg-secondary text-brand-white text-center">
            1
          </p>
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
