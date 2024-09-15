"use client";
import React, { useState } from "react";
import SearchIcon from "@/public/SeachIcon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedQuery = encodeURIComponent(searchQuery).replace("%20", "+");
    router.push(`/search/trademarks?q=${encodedQuery}`);
  };
  return (
    <div className="w-full">
      <form
        className="relative flex items-center w-full  space-x-2 md:space-x-4 pl-16"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search Trademark Here eg. Mickey Mouse"
          className="flex-grow md:flex-grow-0 pr-6 pl-16 py-3 border border-gray-300 rounded-lg text-sm w-1/2"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Image src={SearchIcon} alt="search" className="absolute" />
        <button className=" bg-blue-500 text-white rounded-lg px-10 py-3 hover:bg-blue-700">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
