// components/Shimmer.tsx
import React from "react";

const Shimmer = () => {
  return (
    <div className="flex">
      <div className=" h-full bg-gray-200 animate-pulse w-3/4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
      </div>
      <div className="h-full bg-gray-200 animate-pulse w-1/4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
      </div>
    </div>
  );
};

export default Shimmer;
