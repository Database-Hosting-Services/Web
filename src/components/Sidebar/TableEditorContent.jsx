import { useState } from "react";
import PropTypes from "prop-types";
import SeachIcon from "../../assets/searchIcon.svg";
import FilterIcon from "../../assets/Filtericon.svg";

const SqlEditorContent = ({ privateCodeList = [] }) => {
  const [isPrivateOpen, setIsPrivateOpen] = useState(false);

  const safePrivateList = Array.isArray(privateCodeList) ? privateCodeList : [];

  return (
    <div className="h-full">
      <h1 className="text-xl font-semibold text-center text-white mb-6 px-5 pt-4">
        SQL editor
      </h1>

      <div className="border-b-gradient w-full"></div>

      <div className="space-y-4 px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="bg-secondary flex-1 mr-2 rounded-lg px-2 py-0.5 flex items-center justify-between border border-tertiary">
            <div className="flex items-center text-gray-300">
              <span className="mr-2">
                <img src={SeachIcon} alt="search logo" />
              </span>
              Search
            </div>
          </div>
          <span className="text-gray-400">
            <img src={FilterIcon} alt="Filter logo" />
          </span>
        </div>
      </div>

      {/* زرار PRIVATE */}
      <div
        onClick={() => setIsPrivateOpen(!isPrivateOpen)}
        className="px-4 py-2.5 flex items-center justify-between border-t border-b border-tertiary cursor-pointer"
      >
        <div className="flex items-center">
          <span className="mr-2 text-white font-bold"> &gt; </span>
          <span className="text-white">Private ({safePrivateList.length})</span>
        </div>
        <svg
          className={`transition-transform ${isPrivateOpen ? "rotate-90" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      {/* الأكواد المخزنة */}
      {isPrivateOpen && (
        <div className="px-4 py-2 space-y-2 max-h-60 overflow-y-auto">
          {safePrivateList.length > 0 ? (
            safePrivateList.map((code, index) => (
              <pre
                key={index}
                className="bg-[#2e2e40] text-xs p-2 rounded font-mono text-green-300"
              >
                {code}
              </pre>
            ))
          ) : (
            <p className="text-sm text-gray-400">No saved queries yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

SqlEditorContent.propTypes = {
  privateCodeList: PropTypes.array,
};

export default SqlEditorContent;
