"use client";

import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (result.success) {
      // Get the return URL from the query parameters or default to home
      const returnUrl =
        new URLSearchParams(window.location.search).get("returnUrl") || "/";
      router.push(returnUrl);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex w-full items-center bg-hero-pattern justify-center p-4 md:p-8">
      <div className="w-full max-w-md p-8 rounded-3xl border-[1px] border-border-default bg-white shadow-lg">
        <div className="space-y-5">
          <div>
            <h1 className="text-secondary text-4xl font-semibold">Sign in</h1>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="font-light">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pc@serviceprovider.com"
                required
                className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="font-light">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="************"
                required
                minLength={8}
                className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold transition-colors bg-brand text-brand-white hover:bg-secondary rounded-lg flex items-center justify-center space-x-2"
            >
              <span>CONTINUE BROWSING</span>
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
                  d="M7.76883 1.32695C8.20476 0.891017 8.91156 0.891017 9.34749 1.32695L15.673 7.65254C16.109 8.08847 16.109 8.79527 15.673 9.2312L9.34749 15.5568C8.91156 15.9927 8.20476 15.9927 7.76883 15.5568C7.3329 15.1208 7.3329 14.4141 7.76883 13.9782L12.1888 9.55816H1.11628C0.499782 9.55816 0 9.05837 0 8.44187C0 7.82537 0.499782 7.32559 1.11628 7.32559H12.1888L7.76883 2.90561C7.3329 2.46968 7.3329 1.76288 7.76883 1.32695Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>

          <div className="text-center">
            <span className="text-text-secondary">
              You don&apos;t have an account?{" "}
            </span>
            <Link
              href="/register"
              className="text-brand decoration-2 hover:underline"
            >
              Create an account.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await register(name, email, password);
    if (result.success) {
      // Get the return URL from the query parameters or default to home
      const returnUrl =
        new URLSearchParams(window.location.search).get("returnUrl") || "/";
      router.push(returnUrl);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex w-full items-center bg-hero-pattern justify-center p-4 md:p-8">
      <div className="w-full max-w-md p-8 rounded-3xl border-[1px] border-border-default bg-white shadow-lg">
        <div className="space-y-5">
          <div>
            <h1 className="text-secondary text-4xl font-semibold">
              Register Now
            </h1>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="font-light">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="font-light">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test1@gmail.com"
                className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="font-light">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="************"
                className="w-full px-4 py-2 bg-brand-white outline-none focus:ring-2 ring-brand placeholder:text-text-secondary rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold transition-colors bg-brand text-brand-white hover:bg-secondary rounded-lg flex items-center justify-center space-x-2"
            >
              <span>START SHOPPING</span>
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
                  d="M7.76883 1.32695C8.20476 0.891017 8.91156 0.891017 9.34749 1.32695L15.673 7.65254C16.109 8.08847 16.109 8.79527 15.673 9.2312L9.34749 15.5568C8.91156 15.9927 8.20476 15.9927 7.76883 15.5568C7.3329 15.1208 7.3329 14.4141 7.76883 13.9782L12.1888 9.55816H1.11628C0.499782 9.55816 0 9.05837 0 8.44187C0 7.82537 0.499782 7.32559 1.11628 7.32559H12.1888L7.76883 2.90561C7.3329 2.46968 7.3329 1.76288 7.76883 1.32695Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>

          <div className="text-center">
            <span className="text-text-secondary">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-brand decoration-2 hover:underline"
            >
              Sign In instead.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
