"use client";
import Image from "next/image";
import React from "react";
import Filter from "@/public/Filter.svg";
import Share from "@/public/Share.svg";
import Sort from "@/public/Sort.svg";
import { useRouter, useSearchParams } from "next/navigation";

type AboutQueryProps = {
  count?: number;
  urlParams: {
    q?: string;
    status: string;
    owners: string[];
    lawfirms: string[];
    attorneys: string[];
  };
};

const AboutQuery = ({ count, urlParams }: AboutQueryProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const generateAlternatingPatterns = (query: string): string[] => {
    const patterns: string[] = [];

    for (let i = 0; i < query.length; i++) {
      const pattern = query.substring(0, i) + "*" + query.substring(i + 1);
      patterns.push(pattern);
    }

    return patterns;
  };

  const handleQuery = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", query);
    router.push(`${"trademarks"}?${params.toString().toLowerCase()}`);
  };

  const suggestions = generateAlternatingPatterns(urlParams.q || "");

  return (
    <>
      <div className="flex items-center justify-between p-8 w-full border-b-2">
        <div className="font-semibold text-lg text-slate-700 pl-6 ">
          About {count} Trademarks found for {urlParams.q}{" "}
        </div>
      </div>
      <div className=" flex items-center justify-between p-6 w-full ">
        <div className="font-semibold text-lg text-slate-700 pl-6 flex justify-start gap-4 items-center">
          Also Try Searching for
          {suggestions
            .filter((_, i) => i < 2 || i > suggestions.length - 3)
            .map((s) => (
              <button
                key={s}
                onClick={() => handleQuery(s)}
                className="px-2 py-1 border border-orange-400 bg-orange-200/25 rounded-md flex justify-center items-center w-16 cursor-pointer"
              >
                <p className="text-orange-400">{s}</p>
              </button>
            ))}
        </div>
        <div className="flex justify-start w-1/4 gap-6">
          <span className="px-4 py-2 border rounded-md flex justify-between w-24 cursor-pointer">
            <Image src={Filter} alt="filter" />
            <p>Filter</p>
          </span>
          <button className="w-10 h-10 p-1 border rounded-full flex items-center justify-center">
            <Image src={Share} alt="share" />
          </button>
          <button className="w-10 h-10 p-1 border rounded-full flex items-center justify-center">
            <Image src={Sort} alt="sort" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutQuery;
