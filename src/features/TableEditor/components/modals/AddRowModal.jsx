import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const AddRowModal = ({ onClose, onSave, tableId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState({});

  // Get the selected table from redux store
  const { tables } = useSelector((state) => state.tableEditor);
  const selectedTable = tables.find((table) => table.id === tableId);

  // Initialize row data with empty values for each column
  useEffect(() => {
    if (selectedTable) {
      const initialData = {};
      selectedTable.schema.Columns.forEach((column) => {
        initialData[column.ColumnName] = "";
      });
      setRowData(initialData);
    }
  }, [selectedTable]);

  // Open the sidebar with a slight delay to ensure animation works
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e, field) => {
    setRowData({
      ...rowData,
      [field]: e.target.value,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    // Delay the actual closing to allow animation to complete
    setTimeout(onClose, 300);
  };

  const handleSave = () => {
    onSave(rowData);
    handleClose();
  };

  // Generate appropriate input type based on column data type
  const getInputType = (dataType) => {
    switch (dataType.toUpperCase()) {
      case "INTEGER":
      case "NUMERIC":
      case "DECIMAL":
        return "number";
      case "DATE":
        return "date";
      case "TIMESTAMP":
        return "datetime-local";
      case "BOOLEAN":
        return "checkbox";
      default:
        return "text";
    }
  };

  if (!selectedTable) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
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
              Add new row to {selectedTable.name}
            </h3>
            <div className="border-b-gradient w-[60px] mx-auto mb-5"></div>

            {/* Dynamic form fields for each column */}
            {selectedTable.schema.Columns.map((column) => (
              <div key={column.ColumnName} className="mb-6 flex flex-col">
                <label className="text-white mb-2 text-sm">
                  {column.ColumnName}
                </label>
                <input
                  className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                  type={getInputType(column.DataType)}
                  value={rowData[column.ColumnName] || ""}
                  onChange={(e) => handleInputChange(e, column.ColumnName)}
                  placeholder={`Enter ${column.ColumnName}`}
                  disabled={
                    column.ColumnDefault &&
                    column.ColumnDefault.includes("nextval")
                  } // Disable auto-increment fields
                />
              </div>
            ))}

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
                className="px-5 py-2 rounded-md custom-gradient text-white font-normal hover:cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddRowModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tableId: PropTypes.number.isRequired,
};

export default AddRowModal;
