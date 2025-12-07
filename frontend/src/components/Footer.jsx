import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 p-4 md:px-8 md:pt-4 md:pb-8 justify-center border-t-[1px] border-border-default">
      <div className="flex flex-wrap items-center justify-between md:justify-start md:items-start md:flex-col md:gap-4">
        <Image
          className="w-[146px] md:min-w-[220px] h-auto"
          src="/logo.png"
          alt="Puterbench"
          width={220}
          height={36}
        />
        <div className="flex gap-4">
          <Link href="/" className="transition-transform hover:-translate-y-1">
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/" className="transition-transform hover:-translate-y-1">
            <Image src="/youtube.png" alt="Youtube" width={24} height={24} />
          </Link>
          <Link href="/" className="transition-transform hover:-translate-y-1">
            <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold mb-1">Shop</h1>
        <ul className="text-balance flex flex-col gap-2">
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Graphics Cards (GPU)
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Procesors (CPU)
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Solid-State Drive (SSD)
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Monitors
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Peripherals
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Memory (RAM)
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/products"
            >
              Hard Drives
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold mb-1">Account</h1>
        <ul className="text-balance flex flex-col gap-2">
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/register"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/profile"
            >
              My Account
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/cart"
            >
              Shopping Cart
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/history"
            >
              Order History
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold mb-1">Corporate</h1>
        <ul className="text-balance flex flex-col gap-2">
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline decoration-brand decoration-2"
              href="/"
            >
              FAQs
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold mb-1">Supported Payments</h1>
        <ul className="flex gap-2 items-center flex-wrap">
          <li>
            <Image
              src="/mastercard.png"
              alt="Mastercard"
              width={75}
              height={75}
            />
          </li>
          <li>
            <Image src="/paypal.png" alt="Mastercard" width={75} height={75} />
          </li>
          <li>
            <Image src="/visa.png" alt="Mastercard" width={75} height={75} />
          </li>
          <li>
            <Image
              src="/easypaisa.png"
              alt="Mastercard"
              width={75}
              height={75}
            />
          </li>
          <li>
            <Image
              src="/jazzcash.png"
              alt="Mastercard"
              width={75}
              height={75}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
