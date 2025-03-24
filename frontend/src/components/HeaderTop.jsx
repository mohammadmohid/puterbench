"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

const HeaderTop = () => {
  return (
    <div className="p-4 md:px-8 md:py-4 border-b-[1px] bg-white border-border-default flex-wrap lg:flex-nowrap flex gap-2 md:gap-4 justify-between items-center">
      <div className="flex gap-2 flex-shrink-0 items-center">
        <Link href="/">
          <Image
            className=" w-[160px] md:min-w-[220px] h-auto"
            src="/logo.png"
            alt="Puterbench"
            width={220}
            height={36}
          />
        </Link>
      </div>
      <div className="order-1 lg:order-[0] w-full">
        <SearchBar placeholder="Search Products..." />
      </div>
      <NavIcons />
    </div>
  );
};

export default HeaderTop;
