import Image from "next/image";
import React, { Suspense } from "react";
import TrademarkiaLogo from "@/public/TradmakriaLogo.svg";
import SearchBar from "./searchbar";

const Header = () => {
  return (
    <div className="bg-slate-100 flex justify-start items-center py-8 pl-20 ">
      <Image src={TrademarkiaLogo} alt="logo" />
      <Suspense>
        <SearchBar />
      </Suspense>
    </div>
  );
};

export default Header;
