import PropTypes from "prop-types";
import ForeignKeys from "./ForeignKeys";
import ColumnList from "./ColumnList";
import { useEffect, useState } from "react";
import MessageDialog from "../../../components/ui/MessageDialog";

// Helper function to deep clone objects
const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const clonedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
};

const CreateTableModal = ({
  onClose,
  onSave,
  tableData,
  onTableDataChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Store the initial table data for reset functionality
  const [initialTableData] = useState(deepClone(tableData));

  useEffect(() => {
    // Open the sidebar with a slight delay to ensure animation works
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);
  const handleInputChange = (e, field) => {
    setHasChanges(true);
    onTableDataChange({
      [field]: e.target.value,
    });
  };

  const handleAddColumn = () => {
    setHasChanges(true);
    onTableDataChange({
      columns: [
        ...tableData.columns,
        { name: "", type: "int 8", default: "Null", primary: false },
      ],
    });
  };

  const attemptClose = () => {
    if (hasChanges) {
      setShowConfirmDialog(true);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Delay the actual closing to allow animation to complete
    setTimeout(onClose, 300);
  };
  const handleConfirmClose = () => {
    // Reset the form data to initial values
    onTableDataChange(deepClone(initialTableData));

    // Reset the change flag and close the dialog
    setHasChanges(false);
    setShowConfirmDialog(false);
    handleClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay for click detection only - no background color */}
      <div className="fixed inset-0" onClick={attemptClose}></div>

      {/* Sidebar container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Sliding panel */}
        <div
          className={`w-[650px] transform transition-transform duration-300 ease-in-out bg-primary h-full overflow-y-auto shadow-xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-8">
            <h3 className="text-white text-xl font-medium mb-4">
              Create new table
            </h3>
            <div className="border-b-gradient w-[60px] mx-auto mb-5"></div>
            {/* Name field */}
            <div className="mb-6 flex items-center">
              <label className="text-white mr-4 w-24">Name</label>
              <input
                className="flex-1 bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={tableData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
            {/* Description field */}
            <div className="mb-10 flex items-center">
              <label className="text-white mr-4 w-24">Description</label>
              <input
                className="flex-1 bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={tableData.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </div>
            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>
            {/* Column section */}
            <ColumnList
              columns={tableData.columns}
              onColumnChange={(columnData) => {
                setHasChanges(true);
                onTableDataChange(columnData);
              }}
              onAddColumn={handleAddColumn}
            />
            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>
            {/* Foreign keys section */}
            <ForeignKeys />
            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>
            {/* Action buttons */}
            <div className="flex justify-end space-x-3 mt-5">
              <button
                className="px-5 py-2 rounded-md bg-secondary text-white font-normal border border-tertiary hover:cursor-pointer"
                onClick={attemptClose}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-md custom-gradient text-white font-normal hover:cursor-pointer"
                onClick={() => {
                  setHasChanges(false);
                  onSave(tableData);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog when there are unsaved changes */}
      {showConfirmDialog && (
        <MessageDialog
          title="Discard Changes"
          message="You have unsaved changes. Are you sure you want to discard them?"
          onCancel={handleCancelClose}
          onConfirm={handleConfirmClose}
          confirmText="Discard"
          cancelText="Cancel"
          confirmButtonClass="bg-purple-600"
        />
      )}
    </div>
  );
};

CreateTableModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tableData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        default: PropTypes.string.isRequired,
        primary: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onTableDataChange: PropTypes.func.isRequired,
};

export default CreateTableModal;
