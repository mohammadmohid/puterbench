/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    removePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
