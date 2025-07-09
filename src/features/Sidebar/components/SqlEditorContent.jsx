import SeachIcon from "../../../assets/searchIcon.svg";
import FilterIcon from "../../../assets/filterIcon.svg";
import { useState } from "react";

const SqlEditorContent = ({ privateMessages = [] }) => {
  const [showPrivate, setShowPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOrder, setSortOrder] = useState("alphabetical");

  const filteredMessages = privateMessages.filter((msg) =>
    msg.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortMessages = filteredMessages.sort((a, b) => {
    if (sortOrder === "alphabetical") {
      return a.localeCompare(b.text);
    } else if (sortOrder === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div className="h-full">
      <h1 className="mb-6 px-5 pt-4 font-semibold text-white text-xl text-center">
        SQL editor
      </h1>

      <div className="border-b-gradient w-full"></div>

      <div className="space-y-4 px-5 py-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-1 justify-between items-center bg-secondary mr-2 px-2 py-0.5 border border-tertiary rounded-lg">
            <div className="flex items-center text-gray-300">
              <span className="mr-2">
                <img
                  src={SeachIcon}
                  alt="search logo"
                  className="mr-2 w-full"
                />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent [box-shadow:0_0_1000px_1000px#191A30_inset] focus:outline-none w-full text-[16px] text-gray-300 autofill:text-text placeholder:text-[#FFFFFF] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <span
            className="text-[#FFFFF] cursor-pointer"
            onClick={() => setShowSortOptions(!showSortOptions)}
            title="Sort By"
          >
            <img src={FilterIcon} alt="Filter logo" />
          </span>
        </div>
      </div>
      {showSortOptions && (
        <div className="bg-[#06071A] px-5 py-5 rounded-lg text-[#FFFFFF]">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSortOrder("alphabetical")}
              className={`p-2 rounded-lg text-sm  ${
                sortOrder === "alphabetical"
                  ? "bg-gradient-to-b from-[#682EC7] to-[#5A12D3]"
                  : "bg-[#191a30]"
              }`}
            >
              Alphabetical
            </button>
            <button
              onClick={() => setSortOrder("createdAt")}
              className={`p-2 rounded-lg text-sm ${
                sortOrder === "createdAt"
                  ? "bg-gradient-to-b from-[#682EC7] to-[#5A12D3]"
                  : "bg-[#191a30]"
              }`}
            >
              Created At
            </button>
          </div>
        </div>
      )}

      <div
        className="flex items-center px-4 py-2.5 border-t border-tertiary border-b cursor-pointer"
        onClick={() => setShowPrivate(!showPrivate)}
      >
        <span className="mr-2 font-bold text-white cursor-pointer"> &gt; </span>
        <span className="text-white">Private</span>
        <span className="ml-2 text-[#FFFFFF] text-xs">
          ({sortMessages.length})
        </span>
      </div>

      {showPrivate && (
        <div className="bg-[#06071A] mx-4 mt-4 p-3 rounded-md max-h-60 overflow-y-auto font-light text-white">
          <h3 className="mb-2 font-semibold">Previous Queries</h3>
          <div className="flex flex-col gap-2">
            {sortMessages.length === 0 ? (
              <p className="bg-[#06071A] text-[#FFFFFF] text-sm">
                No private queries created yet Quires will autpmatically be
                saved here when you run them.
              </p>
            ) : (
              sortMessages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-[#1c1c2e] p-2 border border-[#1c1c2e] rounded-md text-sm"
                >
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default SqlEditorContent;
