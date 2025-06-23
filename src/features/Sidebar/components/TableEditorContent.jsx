import SeachIcon from "../../../assets/searchIcon.svg";
import FilterIcon from "../../../assets/filterIcon.svg";

const TableEditorContent = () => (
  <div className="h-full">
    <h1 className="mb-6 px-5 pt-4 font-semibold text-white text-xl text-center">
      Table editor
    </h1>
    <div className="border-b-gradient w-full"></div>

    <div className="space-y-3 px-5 pt-4">
      <div className="space-y-3 mb-11">
        <div className="flex items-center bg-secondary px-2 py-0.5 border border-tertiary rounded-lg">
          <span className="text-gray-300">Scheme</span>
          <span className="ml-2 font-medium text-white">public</span>
        </div>

        <button className="flex items-center bg-secondary px-2 py-0.5 border border-tertiary rounded-lg w-full text-white">
          <span className="mr-2 text-lg">+</span> New table
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-1 justify-between items-center bg-secondary mr-2 px-2 py-0.5 border border-tertiary rounded-lg">
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
