import { Inter } from "next/font/google";
import "./globals.css";
import HeaderTop from "@/components/HeaderTop";
import HeaderSub from "@/components/HeaderSub";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/utils/AuthContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Puterbench | PC Builder & Store",
  description:
    "An e-commerce platform to get your PC parts as well as PC builder with optimized parts combination and specs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <div className="sticky top-0 z-50 bg-white shadow-sm">
            <HeaderTop />
            <HeaderSub />
          </div>
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
