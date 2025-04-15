import SeachIcon from "../../assets/searchIcon.svg";
import FilterIcon from "../../assets/Filtericon.svg";

const TableEditorContent = () => (
  <div className="h-full">
    <h1 className="text-xl font-semibold text-center text-white mb-6 px-5 pt-4">
      Table editor
    </h1>
    <div className="border-b-gradient w-full"></div>

    <div className="space-y-3 px-5 pt-4 ">
      <div className="space-y-3 mb-11">
        <div className="bg-secondary rounded-lg px-2 py-0.5 flex items-center border border-tertiary">
          <span className="text-gray-300">Scheme</span>
          <span className="text-white ml-2 font-medium">public</span>
        </div>

        <button className="bg-secondary rounded-lg px-2 py-0.5 w-full flex items-center text-white border border-tertiary">
          <span className="mr-2 text-lg">+</span> New table
        </button>
      </div>

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
  </div>
);

export default TableEditorContent;
