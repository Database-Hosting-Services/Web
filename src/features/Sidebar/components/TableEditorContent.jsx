import SeachIcon from "../../../assets/searchIcon.svg";
import FilterIcon from "../../../assets/filterIcon.svg";
import TableIcon from "../assets/material-symbols_table.png";

import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import {
  openCreateTableModal,
  setSelectedTable,
} from "../../../store/tableEditorSlice";
import { fetchTables } from "../actions";
import { useProject } from "../../../store/ProjectContext";

const TableEditorContent = () => {
  const dispatch = useDispatch();
  const { tables, selectedTableId } = useSelector((state) => state.tableEditor);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get the current project ID from context
  const { currentProjectId } = useProject();

  // Function to manually refresh tables
  const refreshTables = async () => {
    setIsRefreshing(true);
    try {
      await fetchTables(currentProjectId, dispatch);
    } catch (error) {
      console.error("Error refreshing tables:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

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
                className="bg-transparent w-full focus:outline-none text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={refreshTables}
              title="Refresh tables"
            >
              {isRefreshing ? "..." : "↻"}
            </button>
            <span className="text-gray-400">
              <img src={FilterIcon} alt="Filter logo" />
            </span>
          </div>
        </div>

        {/* Table list */}
        <div className="mt-4 space-y-0.5">
          {isRefreshing ? (
            // Refreshing state
            <div className="flex items-center justify-center py-4">
              <div className="animate-pulse text-gray-400">
                Refreshing tables...
              </div>
            </div>
          ) : tables.length === 0 ? (
            // Empty state
            <div className="text-gray-400 py-2 px-2">
              No tables found. Create a new table to get started.
              <button
                className="underline ml-2 text-sm"
                onClick={refreshTables}
              >
                Refresh
              </button>
            </div>
          ) : filteredTables.length === 0 ? (
            // No search results
            <div className="text-gray-400 py-2 px-2">
              No tables match your search.
            </div>
          ) : (
            // Tables list
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TableEditorContent;
