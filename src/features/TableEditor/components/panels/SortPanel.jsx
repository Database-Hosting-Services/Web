import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTableData } from "../../../Sidebar/actions"; // Assuming this is the correct import

const SortPanel = ({ isOpen, onClose }) => {
  const sortPanelRef = useRef(null);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // Get data from Redux store
  const { selectedTableId, tables, tableDataLoading } = useSelector(
    (state) => state.tableEditor,
  );

  // Get the columns from the selected table
  const selectedTable = tables.find((table) => table.id === selectedTableId);
  const columns = selectedTable?.schema?.Columns || [];

  // Handle click outside to close sort panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sortPanelRef.current &&
        !sortPanelRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    // Add event listener if sort panel is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleColumnSelect = (columnId) => {
    setSelectedColumn(columnId);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleApplySorting = () => {
    if (!selectedColumn || !selectedTable) return;

    // Get the tableOid from the selected table
    const tableOid = selectedTable.oid;

    if (!tableOid) {
      console.error("Table OID not found for selected table");
      return;
    }

    // Build the order parameter for the API: column:direction
    const orderParam = `${selectedColumn}:${sortDirection}`;

    // Default pagination parameters
    const page = 1;
    const limit = 50;

    // Fetch table data with sorting applied
    dispatch(
      fetchTableData(projectId, tableOid, dispatch, {
        page,
        limit,
        order: orderParam,
      }),
    );

    // Close the sort panel
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={sortPanelRef}
      className="absolute top-full left-0 mt-2 w-[350px] bg-secondary rounded-lg shadow-lg z-10"
    >
      <div className="p-5">
        <p className="text-white font-medium mb-1">
          No sorts applied to this view
        </p>
        <p className="text-gray-400 text-sm mb-4">
          Add a column below to sort this view
        </p>

        <div className="flex items-center mb-4 relative">
          <div
            className="bg-[#1A1B29] rounded-md p-2 text-white relative w-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="flex items-center justify-between">
              <span>{selectedColumn || "Pick a column to sort by"}</span>
              <span>▼</span>
            </div>

            {/* Dropdown for columns */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1B29] rounded-md z-20 max-h-32 overflow-y-auto">
                {columns.length > 0 ? (
                  columns.map((column) => (
                    <div
                      key={column.ColumnName}
                      className="p-2 hover:bg-[#282939] cursor-pointer"
                      onClick={() => handleColumnSelect(column.ColumnName)}
                    >
                      {column.ColumnName} ({column.DataType})
                      {column.isPrimaryKey ? " 🔑" : ""}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-400">No columns available</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sort direction selector - only shown when a column is selected */}
        {selectedColumn && (
          <div className="flex items-center mb-4">
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <span className="text-white text-sm mr-3">Sort direction:</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded ${
                    sortDirection === "asc"
                      ? "bg-[#682EC7] text-white"
                      : "bg-[#1A1B29] text-gray-400"
                  }`}
                  onClick={() => setSortDirection("asc")}
                >
                  Ascending ↑
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    sortDirection === "desc"
                      ? "bg-[#682EC7] text-white"
                      : "bg-[#1A1B29] text-gray-400"
                  }`}
                  onClick={() => setSortDirection("desc")}
                >
                  Descending ↓
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            className={`${
              selectedColumn
                ? "bg-[#682EC7] bg-gradient-to-b from-[#682EC7] to-[#5A12D3]"
                : "bg-gray-600 cursor-not-allowed"
            } text-white px-4 py-1 rounded-lg text-sm`}
            disabled={!selectedColumn || tableDataLoading}
            onClick={handleApplySorting}
          >
            {tableDataLoading ? "Loading..." : "Apply sorting"}
          </button>
        </div>
      </div>
    </div>
  );
};

SortPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SortPanel;
