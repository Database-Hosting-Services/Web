import SeachIcon from "../../assets/searchIcon.svg";
import FilterIcon from "../../assets/Filtericon.svg";

const SqlEditorContent = () => (
  <div className="h-full">
    <h1 className="text-xl font-semibold text-center text-white mb-6 px-5 pt-4">
      SQL editor
    </h1>

    <div className="border-b-gradient w-full"></div>

    <div className="space-y-4 px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="bg-secondary flex-1 mr-2 rounded-md px-2 py-0.5 flex items-center justify-between border border-tertiary">
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

    <div className="px-4 py-2.5 flex items-center border-t border-b border-tertiary">
      <span className="mr-2 text-white font-bold"> &gt; </span>
      <span className="text-white">Private</span>
    </div>
  </div>
);

export default SqlEditorContent;
