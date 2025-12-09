"use client";

import { SignIn } from "@/components/AuthenticationCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    handleRedirect();
  }, [user, router]);

  const handleRedirect = async () => {
    if (user) {
      // Get the return URL from the query parameters or default to home
      const returnUrl =
        new URLSearchParams(window.location.search).get("returnUrl") || "/";
      router.push(returnUrl);
    }
  };
  return (
    <div className="flex justify-between">
      <SignIn />
      <div className="hidden lg:flex flex-col lg:w-1/2 p-4 gap-4 items-center">
        <object
          className="w-[300px]"
          type="image/svg+xml"
          data="/CPU-Animated.svg"
        >
          CPU
        </object>
        <object
          className="w-full"
          type="image/svg+xml"
          data="/WindowIllustration.svg"
        >
          CPU
        </object>
      </div>
    </div>
  );
};

export default LoginPage;
