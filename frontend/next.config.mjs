/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://puterbench.vercel.app/api/:path*",
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
