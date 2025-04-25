import SeachIcon from "../../assets/searchIcon.svg";
import FilterIcon from "../../assets/Filtericon.svg";
import { useState } from "react";
const SqlEditorContent = ({ privateMessages = [] }) => {
  const [showPrivate, setShowPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMessages = privateMessages.filter((msg) =>
    msg.toLowerCase().includes(searchQuery.toLowerCase()),
  );
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
                <img src={SeachIcon} alt="search logo" className="mr-2" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent focus:outline-none transition-all duration-300 autofill:text-text 
              [box-shadow:0_0_1000px_1000px#191A30_inset]
                text-sm w-full  text-gray-300 placeholder:text-[#FFFFFF]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <span className="text-gray-400">
            <img src={FilterIcon} alt="Filter logo" />
          </span>
        </div>
      </div>

      <div
        className="px-4 py-2.5 flex items-center border-t border-b cursor-pointer border-tertiary"
        onClick={() => setShowPrivate(!showPrivate)}
      >
        <span className="mr-2 text-white font-bold cursor-pointer"> &gt; </span>
        <span className="text-white">Private</span>
        <span className="ml-2 text-xs text-[#FFFFFF] ">
          ({filteredMessages.length})
        </span>
      </div>

      {showPrivate && (
        <div className="bg-[#06071A] text-white p-3 mt-4 max-h-60 overflow-y-auto font-light rounded-md mx-4">
          <h3 className="font-semibold mb-2 ">Previous Queries</h3>
          <div className="flex flex-col gap-2">
            {filteredMessages.length === 0 ? (
              <p className="text-sm text-[#FFFFFF] bg-[#06071A]">
                No private queries created yet Quires will autpmatically be
                saved here when you run them.
              </p>
            ) : (
              filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-[#1c1c2e] p-2 rounded-md text-sm border border-[#1c1c2e]"
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
