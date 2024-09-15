import { CurrentOwnerBucket, RootResponse } from "@/lib/types";
import { url } from "inspector";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SideFilters = ({
  urlParams,
}: {
  urlParams: {
    q?: string;
    status: string;
    owners: string[];
    lawfirms: string[];
    attorneys: string[];
  };
  data: RootResponse | null;
  initialOwner: CurrentOwnerBucket[] | undefined;
}) => {
  const queryData = {
    input_query: urlParams.q || "", // Use searchParams.q if available
    input_query_type: "",
    sort_by: "default",
    status: [], // Use searchParams.status if available
    exact_match: false,
    date_query: false,
    owners: [], // Use searchParams.owners if available
    attorneys: [],
    law_firms: [],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 10,
    sort_order: "desc",
    states: [],
    counties: [],
  };

  const [selectFilter, setSelectFilter] = useState("Owner");
  const [selectedOwner, setSelectedOwner] = useState(urlParams.owners || []);
  const [selectFirm, setSelectFirm] = useState(urlParams.lawfirms || []);
  const [selectedAttorneys, setSelectedAttorneys] = useState(
    urlParams.attorneys || []
  );
  const [status, setStatus] = useState(
    (urlParams.status?.charAt(0).toUpperCase() as string) +
      urlParams.status?.slice(1) || "All"
  );
  const [view, setView] = useState("Grid");
  const [initialData, setInitialData] = useState<RootResponse>();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = ["Owner", "Law Firms", "Attorneys"];

  const handleOwnerChange = (owner: string) => {
    const encodedData = encodeURIComponent(owner);
    const params = new URLSearchParams(searchParams);
    selectedOwner.includes(owner)
      ? params.delete("owners")
      : params.append("owners", encodedData);

    setSelectedOwner((prev) =>
      prev.includes(owner)
        ? prev.length !== 1
          ? prev.slice(0, prev.length - 1)
          : prev.filter((o) => o !== owner)
        : [...prev, owner]
    );

    router.push(
      `${"trademarks"}?${params
        .toString()
        .toLowerCase()
        .replace(/%2520/g, "+")}`
    );
  };

  const handleFirmChange = (firm: string) => {
    const encodedData = encodeURIComponent(firm);
    const params = new URLSearchParams(searchParams);
    selectFirm.includes(firm)
      ? params.delete("lawfirms")
      : params.append("lawfirms", encodedData);

    setSelectFirm((prev) =>
      prev.includes(firm)
        ? prev.length !== 1
          ? prev.slice(0, prev.length - 1)
          : prev.filter((o) => o !== firm)
        : [...prev, firm]
    );
    router.push(
      `${"trademarks"}?${params
        .toString()
        .toLowerCase()
        .replace(/%2520/g, "+")}`
    );
  };

  const handleAttorneyChange = (attorney: string) => {
    const encodedData = encodeURIComponent(attorney);
    const params = new URLSearchParams(searchParams);
    selectedAttorneys.includes(attorney)
      ? params.delete("attorneys")
      : params.append("attorneys", encodedData);

    setSelectedAttorneys((prev) =>
      prev.includes(attorney)
        ? prev.length !== 1
          ? prev.slice(0, prev.length - 1)
          : prev.filter((o) => o !== attorney)
        : [...prev, attorney]
    );
    router.push(
      `${"trademarks"}?${params
        .toString()
        .toLowerCase()
        .replace(/%2520/g, "+")}`
    );
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    const params = new URLSearchParams(searchParams);
    params.set("status", newStatus);
    router.push(`${"trademarks"}?${params.toString().toLowerCase()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setInitialData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);
  console.log(initialData);

  return (
    <div className=" m-10 w-96">
      {/* Status Filter */}
      <div className="px-3 py-4 mb-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-lg font-bold mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          {["All", "Registered", "Pending", "Abandoned", "Others"].map((s) => (
            <button
              key={s}
              className={`px-4 py-2 rounded-lg border flex items-center ${
                status === s
                  ? " text-blue-500 font-medium border-blue-500"
                  : " text-gray-900 border-gray-200"
              }`}
              onClick={() => handleStatusChange(s)}
            >
              <p
                className={`w-2 h-2 ${
                  s === "All"
                    ? "hidden"
                    : s === "Registered"
                    ? "bg-green-500"
                    : s === "Pending"
                    ? "bg-yellow-500"
                    : s === "Abandoned"
                    ? "bg-red-500"
                    : "bg-blue-500"
                } rounded-full mr-2`}
              ></p>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Owners Filter */}
      <div className="px-3 py-4 mb-6 bg-white shadow-lg rounded-lg  ">
        <span className="flex">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setSelectFilter(item)}
              className={`text-lg ${
                selectFilter === item
                  ? "font-semibold border-b-2 border-b-black"
                  : ""
              } pb-1 mx-2 mb-4`}
            >
              {item}
            </button>
          ))}
        </span>
        <input
          type="text"
          placeholder="Search Owners"
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
        />

        {loading && (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center mb-2 animate-pulse">
                <div className="mr-2 h-5 w-5 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        )}
        {selectFilter === "Owner" && (
          <div className="overflow-y-scroll h-52">
            {initialData?.body.aggregations.current_owners.buckets.map(
              (owner, item) => (
                <div key={item} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2 h-5 w-5 text-blue-600 border border-black rounded  focus:ring-blue-500"
                    checked={selectedOwner.includes(owner.key)}
                    onChange={() => handleOwnerChange(owner.key)}
                  />
                  <label>{owner.key + ` (${owner.doc_count})`} </label>
                </div>
              )
            )}
          </div>
        )}
        {selectFilter === "Law Firms" && (
          <div className="overflow-y-scroll h-52">
            {initialData?.body.aggregations.law_firms.buckets.map(
              (firm, item) => (
                <div key={item} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2 h-5 w-5 text-blue-600 border border-black rounded  focus:ring-blue-500"
                    checked={selectFirm.includes(firm.key)}
                    onChange={() => handleFirmChange(firm.key)}
                  />
                  <label>{firm.key + ` (${firm.doc_count})`} </label>
                </div>
              )
            )}
          </div>
        )}

        {/* Attorneys Filter */}
        {selectFilter === "Attorneys" && (
          <div className="overflow-y-scroll h-52">
            {initialData?.body.aggregations.attorneys.buckets.map(
              (attorney, item) => (
                <div key={item} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2 h-5 w-5 text-blue-600 border border-black rounded  focus:ring-blue-500"
                    checked={selectedAttorneys.includes(attorney.key)}
                    onChange={() => handleAttorneyChange(attorney.key)}
                  />
                  <label>{attorney.key + ` (${attorney.doc_count})`} </label>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* View Toggle */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Display</h3>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "Grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("Grid")}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "List"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("List")}
          >
            List View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideFilters;
