import { useState } from "react";
import filterIcon from "../../../../assets/filterIcon.svg";
import FilterPanel from "../panels/FilterPanel";
import SortPanel from "../panels/SortPanel";
import InsertPanel from "../panels/InsertPanel";
const TableEditorHeader = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isInsertOpen, setIsInsertOpen] = useState(false);

  // Filter panel handlers
  const toggleFilterPanel = () => {
    setIsFilterOpen((prev) => !prev);
    if (isSortOpen) setIsSortOpen(false); // Close sort panel if open
    if (isInsertOpen) setIsInsertOpen(false); // Close insert panel if open
  };

  const closeFilterPanel = () => {
    setIsFilterOpen(false);
  };

  // Sort panel handlers
  const toggleSortPanel = () => {
    setIsSortOpen((prev) => !prev);
    if (isFilterOpen) setIsFilterOpen(false); // Close filter panel if open
    if (isInsertOpen) setIsInsertOpen(false); // Close insert panel if open
  };

  const closeSortPanel = () => {
    setIsSortOpen(false);
  };

  // Insert panel handlers
  const toggleInsertPanel = () => {
    setIsInsertOpen((prev) => !prev);
    if (isFilterOpen) setIsFilterOpen(false); // Close filter panel if open
    if (isSortOpen) setIsSortOpen(false); // Close sort panel if open
  };

  const closeInsertPanel = () => {
    setIsInsertOpen(false);
  };

  return (
    <div className="p-6 border-b border-tertiary">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex space-x-4">
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-secondary rounded-lg text-white "
                onClick={toggleFilterPanel}
              >
                <img src={filterIcon} alt="Filter" className="w-5 h-5 mr-2" />
                Filter
              </button>

              <FilterPanel isOpen={isFilterOpen} onClose={closeFilterPanel} />
            </div>

            <div className="relative">
              <button
                className="px-4 py-2 bg-secondary rounded-lg text-white"
                onClick={toggleSortPanel}
              >
                Sort
              </button>

              <SortPanel isOpen={isSortOpen} onClose={closeSortPanel} />
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 custom-gradient rounded-lg text-white"
                onClick={toggleInsertPanel}
              >
                Insert
              </button>

              <InsertPanel isOpen={isInsertOpen} onClose={closeInsertPanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableEditorHeader;
