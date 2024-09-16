"use client";
import { RootResponse } from "@/lib/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ClassImg from "@/public/CodeImg.svg";
import Shimmer from "@/components/shimmer";
import SideFilters from "@/components/sidefilter";
import AboutQuery from "@/components/aboutquery";

const Page = ({
  searchParams,
}: {
  searchParams: {
    q?: string;
    status: string;
    owners: string[];
    lawfirms: string[];
    attorneys: string[];
  };
}) => {
  const queryData = {
    input_query: searchParams.q || "", // Use searchParams.q if available
    input_query_type: "",
    sort_by: "default",
    status: searchParams.status === undefined ? [] : [searchParams.status], // Use searchParams.status if available
    exact_match: false,
    date_query: false,
    owners:
      searchParams.owners === undefined
        ? []
        : Array.isArray(searchParams.owners)
        ? searchParams.owners
        : [searchParams.owners], // Use searchParams.owners if available
    attorneys:
      searchParams.attorneys === undefined
        ? []
        : Array.isArray(searchParams.attorneys)
        ? searchParams.attorneys
        : [searchParams.attorneys],
    law_firms:
      searchParams.lawfirms === undefined
        ? []
        : Array.isArray(searchParams.lawfirms)
        ? searchParams.lawfirms
        : [searchParams.lawfirms],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 10,
    sort_order: "desc",
    states: [],
    counties: [],
  };

  const [data, setData] = useState<RootResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | { message?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(
          "https://vit-tm-task.api.trademarkia.app/api/v3/us",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(queryData),
          }
        );

        if (response.status === 404) {
          throw new Error("No data found");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const getMarkImageUrl = (id: string) =>
    `https://static.trademarkia.com/images/${id}`;

  if (loading) {
    return (
      <div>
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 font-semibold text-xl">
        {error.message || "Network Issue"}
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 h-screen">
      <AboutQuery
        count={data?.body.hits.total.value}
        urlParams={searchParams}
      />
      <div className="flex flex-row-reverse w-full h-0 ">
        <SideFilters urlParams={searchParams} data={data} />
        <table className="m-10 w-3/4">
          <thead>
            <tr>
              <th className="py-2 pl-6 text-left">Details</th>
              <th className="py-2 pl-6 text-left">Mark</th>
              <th className="py-2 pl-6 text-left">Status</th>
              <th className="py-2 pl-6 text-left">Class/Description</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.body.hits.hits.map((item) => {
                return (
                  <tr key={item._index} className="border-b">
                    <td className="py-4 ml-6 pr-12 max-w h-24">
                      <Image
                        height={250}
                        width={250}
                        src={getMarkImageUrl(item._id)}
                        alt="Logo"
                        className="flex justify-center  rounded-md bg-center"
                      />
                    </td>
                    <td className="py-4 pl-6 pr-12 h-24">
                      <p className="font-bold">
                        {item._source.search_bar.mark_identification}
                      </p>
                      <p className="text-gray-600">
                        {item._source.search_bar.owner}
                      </p>
                      <p className="font-semibold">{item._id}</p>
                      <p className="text-gray-600">
                        {item._source?.filing_date
                          ? formatDate(item._source?.filing_date)
                          : "N/A"}
                      </p>
                    </td>
                    <td className="py-4 pl-6 pr-12 h-24">
                      <p
                        className={`${
                          item._source.status_type === "registered"
                            ? "text-green-500 "
                            : item._source.status_type === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        } font-semibold flex items-center`}
                      >
                        <span
                          className={`w-2 h-2 ${
                            item._source.status_type === "registered"
                              ? "bg-green-500"
                              : item._source.status_type === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          } rounded-full mr-2`}
                        ></span>
                        {item._source.status_type === "registered"
                          ? "Live/Registered"
                          : item._source.status_type.charAt(0).toUpperCase() +
                            item._source.status_type.slice(1)}
                      </p>
                      <p className="text-gray-600">
                        {"on " + formatDate(item._source.status_date)}
                      </p>
                    </td>
                    <td className="pt-4 mb-4 pl-6 pr-12 max-w-96 h-24">
                      <p>
                        {item._source.mark_description_description
                          .join(", ")
                          .substring(0, 100)}
                        ...
                      </p>
                      <div className="flex ">
                        {item._source.class_codes
                          .filter((_, i) => i < 2)
                          .map((classCode) => (
                            <span
                              key={classCode}
                              className=" text-gray-600 text-xs px-4 my-2 rounded-md flex items-center justify-start"
                            >
                              <Image src={ClassImg} alt="class" />
                              Class {classCode}
                            </span>
                          ))}
                        <span className="">...</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
