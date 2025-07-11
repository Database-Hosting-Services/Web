import SeachIcon from "../../../assets/searchIcon.svg";
import FilterIcon from "../../../assets/filterIcon.svg";
import TableIcon from "../assets/material-symbols_table.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  openCreateTableModal,
  setSelectedTable,
} from "../../../store/tableEditorSlice";

const TableEditorContent = () => {
  const dispatch = useDispatch();
  const { tables, selectedTableId } = useSelector((state) => state.tableEditor);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNewTable = () => {
    dispatch(openCreateTableModal());
  };

  const handleTableSelect = (tableId) => {
    dispatch(setSelectedTable(tableId));
  };

  // Filter tables based on search term
  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
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

          <button
            className="flex items-center bg-secondary px-2 py-0.5 border border-tertiary rounded-lg w-full text-white hover: cursor-pointer"
            onClick={handleNewTable}
          >
            <span className="mr-2 text-lg">+</span> New table
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-1 justify-between items-center bg-secondary mr-2 px-2 py-0.5 border border-tertiary rounded-lg">
            <div className="flex items-center text-gray-300 w-full">
              <span className="mr-2">
                <img src={SeachIcon} alt="search logo" />
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
              />
            </div>
          </div>
          <span className="text-gray-400 cursor-pointer">
            <img src={FilterIcon} alt="Filter logo" />
          </span>
        </div>

        {/* Table list */}
        <div className="mt-4 space-y-0.5">
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
              <div
                key={table.id}
                className={`flex items-center text-white py-1.5 px-2 hover:bg-secondary rounded-sm cursor-pointer ${
                  selectedTableId === table.id ? "bg-secondary" : ""
                }`}
                onClick={() => handleTableSelect(table.id)}
              >
                <span className="mr-2 opacity-70">
                  <img
                    src={TableIcon}
                    alt="Table icon"
                    width="16"
                    height="16"
                  />
                </span>
                <span className="text-sm">{table.name}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-2">
              No tables found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableEditorContent;
