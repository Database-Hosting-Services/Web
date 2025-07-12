import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTables } from "../../../Sidebar/actions/tableActions";

const ForeignKeyModal = ({ onClose, onSave, tableId, tableData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [availableColumns, setAvailableColumns] = useState([]);
  const [currentTableColumn, setCurrentTableColumn] = useState("");
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // Get all tables from redux store
  const { tables } = useSelector((state) => state.tableEditor);

  // Always fetch tables when the modal opens to ensure we have the latest data
  useEffect(() => {
    if (projectId) {
      console.log("ForeignKeyModal: Fetching tables for project", projectId);
      fetchTables(projectId, dispatch);
    }
  }, [projectId, dispatch]);

  // Show all tables in the dropdown 
  const availableTables = tables;

  // Add debug logging
  useEffect(() => {
    console.log("ForeignKeyModal: Tables from Redux:", tables);
    console.log("ForeignKeyModal: Available tables for FK:", availableTables);
    console.log("ForeignKeyModal: Current table ID:", tableId);
  }, [tables, availableTables, tableId]);

  // Current table can either be from redux store or from props (for tables being created)
  const currentTable =
    tableData || tables.find((table) => table.id === tableId);

  // Open the modal with a slight delay for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Update available columns when a table is selected
  useEffect(() => {
    if (selectedTable) {
      const table = tables.find((t) => t.id.toString() === selectedTable);
      if (table && table.schema && table.schema.Columns) {
        setAvailableColumns(table.schema.Columns);
      } else {
        setAvailableColumns([]);
      }
    } else {
      setAvailableColumns([]);
    }
    setSelectedColumn("");
  }, [selectedTable, tables]);

  const handleClose = () => {
    setIsOpen(false);
    // Delay the actual closing to allow animation to complete
    setTimeout(onClose, 300);
  };

  const handleSave = () => {
    if (!selectedTable || !selectedColumn || !currentTableColumn) {
      console.error("ForeignKeyModal: Missing required fields for FK creation");
      // Show validation error or handle incomplete form
      return;
    }

    // Get reference table data
    const referenceTable = tables.find(
      (t) => t.id.toString() === selectedTable,
    );
    if (!referenceTable) {
      console.error(
        `ForeignKeyModal: Reference table with ID ${selectedTable} not found`,
      );
      return;
    }

    const foreignKeyData = {
      tableId: tableId || (tableData && tableData.id),
      tableColumn: currentTableColumn,
      referenceTableId: parseInt(selectedTable, 10),
      referenceColumnName: selectedColumn,
      tableName: currentTable.name,
      // Include additional information for better FK naming and debugging
      referenceTableName: referenceTable.name,
      constraintName: `${currentTable.name}_fk_${currentTableColumn}_${referenceTable.name}_${selectedColumn}`,
    };

    console.log(
      "ForeignKeyModal: Creating foreign key with data:",
      foreignKeyData,
    );
    onSave(foreignKeyData);
    handleClose();
  };

  if (!currentTable) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Overlay with subtle dark background */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-30" : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      {/* Sidebar container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Sliding panel */}
        <div
          className={`w-[500px] transform transition-transform duration-300 ease-in-out bg-primary h-full overflow-y-auto shadow-xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-8">
            <h3 className="text-white text-xl font-medium mb-4">
              Add Foreign Key Relation to {currentTable.name}
            </h3>
            <div className="border-b-gradient w-[60px] mx-auto mb-5"></div>

            {/* Current table column selection */}
            <div className="mb-6 flex flex-col">
              <label className="text-white mb-2 text-sm">
                Select column from current table
              </label>
              <select
                className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                value={currentTableColumn}
                onChange={(e) => setCurrentTableColumn(e.target.value)}
              >
                <option value="">Select a column</option>
                {currentTable.schema.Columns.map((column) => (
                  <option key={column.ColumnName} value={column.ColumnName}>
                    {column.ColumnName} ({column.DataType})
                  </option>
                ))}
              </select>
            </div>

            {/* Table selection */}
            <div className="mb-6 flex flex-col">
              <label className="text-white mb-2 text-sm">
                Select a table to reference to
              </label>
              <select
                className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
              >
                <option value="">Select a table</option>
                {availableTables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Column selection, only shown when a table is selected */}
            {selectedTable && (
              <div className="mb-6 flex flex-col">
                <label className="text-white mb-2 text-sm">
                  Select a column to reference
                </label>
                <select
                  className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                >
                  <option value="">Select a column</option>
                  {availableColumns.map((column) => (
                    <option key={column.ColumnName} value={column.ColumnName}>
                      {column.ColumnName} ({column.DataType})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 mt-5">
              <button
                className="px-5 py-2 rounded-md bg-secondary text-white font-normal border border-tertiary hover:cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className={`px-5 py-2 rounded-md ${
                  !selectedTable || !selectedColumn || !currentTableColumn
                    ? "bg-gray-600 cursor-not-allowed"
                    : "custom-gradient hover:cursor-pointer"
                } text-white font-normal`}
                onClick={handleSave}
                disabled={
                  !selectedTable || !selectedColumn || !currentTableColumn
                }
              >
                Add Relation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ForeignKeyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tableId: PropTypes.number,
  tableData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    schema: PropTypes.shape({
      Columns: PropTypes.array.isRequired,
    }).isRequired,
  }),
};

ForeignKeyModal.defaultProps = {
  tableId: null,
  tableData: null,
};

export default ForeignKeyModal;
