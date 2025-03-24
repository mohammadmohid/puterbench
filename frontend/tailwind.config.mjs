/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#E1A140",
        "brand-white": "#FFF6F4",
        secondary: "#2F2E41",
        "border-default": "#D9D9D9",
        "text-default": "#000",
        "text-secondary": "#757575",
      },
      backgroundImage: {
        "hero-pattern": "url('/brand-pattern.png')",
      },
    },
  },
};
export default config;
