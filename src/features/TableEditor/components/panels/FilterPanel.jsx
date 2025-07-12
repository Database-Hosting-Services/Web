import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTableData } from "../../../Sidebar/actions";

const FilterPanel = ({ isOpen, onClose }) => {
  const filterPanelRef = useRef(null);
  const [filters, setFilters] = useState([]);
  const [activeOperation, setActiveOperation] = useState(null);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // Get data from Redux store
  const { selectedTableId, tables, tableDataLoading } = useSelector(
    (state) => state.tableEditor,
  );

  // Get the columns from the selected table
  const selectedTable = tables.find((table) => table.id === selectedTableId);
  const columns = selectedTable?.schema?.Columns || [];

  // Operations available for filtering
  const operations = [
    { value: "eq", label: "=" }, // equals
    { value: "neq", label: "<>" }, // not equal
    { value: "gt", label: ">" }, // greater than
    { value: "lt", label: "<" }, // less than
    { value: "gte", label: ">=" }, // greater than or equal
    { value: "lte", label: "<=" }, // less than or equal
    { value: "like", label: "LIKE" }, // pattern matching
  ];

  // Functions to manage filters
  const addFilter = () => {
    setFilters([...filters, { column: "", operation: "eq", value: "" }]);
  };

  const updateFilter = (index, field, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    setFilters(updatedFilters);

    // If operation is changed, close the dropdown
    if (field === "operation") {
      setActiveOperation(null);
    }
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const toggleOperationDropdown = (index) => {
    setActiveOperation(activeOperation === index ? null : index);
  };
  // Function to apply the filter
  const applyFilter = () => {
    if (!selectedTable || filters.length === 0) return;

    // Get the tableOid from the selected table
    const tableOid = selectedTable.oid;

    if (!tableOid) {
      console.error("Table OID not found for selected table");
      return;
    }

    // Filter out invalid filters
    const validFilters = filters.filter(
      (f) => f.column && f.operation && f.value,
    );

    if (validFilters.length === 0) {
      return;
    }

    // Default pagination parameters
    const page = 1;
    const limit = 50;

    // For a single filter: Use the filter parameter directly
    if (validFilters.length === 1) {
      const filterString = `${validFilters[0].column}:${validFilters[0].operation}:${validFilters[0].value}`;
      dispatch(
        fetchTableData(projectId, tableOid, dispatch, {
          page,
          limit,
          filter: filterString,
        }),
      );
    }
    // For multiple filters: Pass them correctly to fetchTableData
    else {
      const options = {
        page,
        limit,
      };

      // Set the first filter
      options.filter = `${validFilters[0].column}:${validFilters[0].operation}:${validFilters[0].value}`;

      // The URL format needs to be like: ?filter=id:eq:2&filter=name:like:ragnar
      // We need to pass these extra filters correctly to tableActions.js
      if (validFilters.length > 1) {
        options.additionalFilters = validFilters
          .slice(1)
          .map((f) => `${f.column}:${f.operation}:${f.value}`);
      }

      dispatch(fetchTableData(projectId, tableOid, dispatch, options));
    }

    // Close the filter panel when the operation is complete
    onClose();
  };

  // Handle click outside to close filter panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target)
      ) {
        onClose();
        setActiveOperation(null);
      }
    }

    // Add event listener if filter panel is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Check if filters are valid (all required fields filled)
  const areFiltersValid =
    filters.length > 0 &&
    filters.every(
      (filter) =>
        filter.column && filter.operation && filter.value.trim() !== "",
    );

  if (!isOpen) return null;

  return (
    <div
      ref={filterPanelRef}
      className="absolute top-full left-0 mt-2 w-[450px] bg-secondary rounded-lg shadow-lg z-10"
    >
      <div className="p-5">
        <p className="text-white font-medium mb-1">
          {filters.length === 0 ? "No filters applied to this view" : "Filters"}
        </p>
        <p className="text-gray-400 text-sm mb-4">
          {filters.length === 0
            ? "Add a filter below to filter the view"
            : "Filter this view by specific conditions"}
        </p>

        {/* Filter rows */}
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center mb-4 space-x-2">
            {/* Column selection */}
            <div className="relative w-1/3">
              <select
                className="w-full bg-[#1A1B29] text-white px-2 py-2 rounded appearance-none cursor-pointer"
                value={filter.column}
                onChange={(e) => updateFilter(index, "column", e.target.value)}
              >
                <option value="">Select column</option>
                {columns.map((column) => (
                  <option key={column.ColumnName} value={column.ColumnName}>
                    {column.ColumnName}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
                ▼
              </div>
            </div>

            {/* Operation selection */}
            <div className="relative w-1/3">
              <div
                className="w-full bg-[#1A1B29] text-white px-2 py-2 rounded cursor-pointer flex justify-between items-center"
                onClick={() => toggleOperationDropdown(index)}
              >
                <span>
                  {operations.find((op) => op.value === filter.operation)
                    ?.label || "="}
                </span>
                <span>▼</span>
              </div>

              {/* Operations dropdown */}
              {activeOperation === index && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1B29] rounded-md z-20 max-h-48 overflow-y-auto">
                  {operations.map((op) => (
                    <div
                      key={op.value}
                      className="p-2 hover:bg-[#282939] cursor-pointer"
                      onClick={() => updateFilter(index, "operation", op.value)}
                    >
                      {op.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Value input */}
            <div className="w-1/3">
              <input
                type="text"
                className="w-full bg-[#1A1B29] text-white px-2 py-2 rounded"
                placeholder="Enter a value"
                value={filter.value}
                onChange={(e) => updateFilter(index, "value", e.target.value)}
              />
            </div>

            {/* Remove filter button */}
            <button
              className="text-gray-400 hover:text-white px-1"
              onClick={() => removeFilter(index)}
            >
              ×
            </button>
          </div>
        ))}

        {/* Add filter button */}
        <div className="flex items-center mb-4">
          <button
            className="flex items-center text-white text-sm mr-2 hover:text-purple-400"
            onClick={addFilter}
          >
            <span className="text-xl mr-1">+</span> Add filter
          </button>
        </div>

        {/* Apply button */}
        <div className="flex justify-end">
          <button
            className={`${
              areFiltersValid
                ? "bg-[#682EC7] bg-gradient-to-b from-[#682EC7] to-[#5A12D3]"
                : "bg-gray-600 cursor-not-allowed"
            } text-white px-4 py-1 rounded-lg text-sm`}
            disabled={!areFiltersValid || tableDataLoading}
            onClick={applyFilter}
          >
            {tableDataLoading ? "Loading..." : "Apply filter"}
          </button>
        </div>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterPanel;
