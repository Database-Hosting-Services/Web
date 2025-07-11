import PropTypes from "prop-types";
import { ForeignKeys } from "../columns";
import { ColumnList } from "../columns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageDialog from "../../../../components/ui/MessageDialog";
import { syncTableWithBackend } from "../../utils";

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
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const columns = [...tableData.schema.Columns];
    columns.push({
      CharacterMaximumLength: 256, // Default to 256 for VARCHAR
      ColumnDefault: null,
      ColumnName: "",
      DataType: "VARCHAR",
      IsNullable: true,
      NumericPrecision: null,
      NumericScale: null,
      OrdinalPosition: columns.length + 1,
      TableName: tableData.name,
    });

    onTableDataChange({
      schema: {
        ...tableData.schema,
        Columns: columns,
      },
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
      {/* Overlay with subtle dark background */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-30" : "opacity-0"
        }`}
        onClick={attemptClose}
      ></div>

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
              columns={tableData.schema.Columns}
              onColumnChange={(columnData) => {
                setHasChanges(true);
                onTableDataChange({
                  schema: {
                    ...tableData.schema,
                    ...columnData,
                  },
                });
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
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-md custom-gradient text-white font-normal hover:cursor-pointer flex items-center justify-center"
                onClick={async () => {
                  setIsSubmitting(true);
                  try {
                    // Sync table data with backend
                    const result = await syncTableWithBackend(
                      projectId,
                      tableData,
                    );

                    // If successful, update the local state
                    if (result) {
                      setHasChanges(false);
                      onSave(result);
                    }
                  } catch (error) {
                    console.error("Failed to save table:", error);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
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
    schema: PropTypes.shape({
      Columns: PropTypes.arrayOf(
        PropTypes.shape({
          CharacterMaximumLength: PropTypes.number,
          ColumnDefault: PropTypes.string,
          ColumnName: PropTypes.string.isRequired,
          DataType: PropTypes.string.isRequired,
          IsNullable: PropTypes.bool.isRequired,
          NumericPrecision: PropTypes.number,
          NumericScale: PropTypes.number,
          OrdinalPosition: PropTypes.number.isRequired,
          TableName: PropTypes.string.isRequired,
        }),
      ).isRequired,
      Constraints: PropTypes.arrayOf(
        PropTypes.shape({
          CheckClause: PropTypes.string,
          ColumnName: PropTypes.string.isRequired,
          ConstraintName: PropTypes.string.isRequired,
          ConstraintType: PropTypes.string.isRequired,
          ForeignColumnName: PropTypes.string,
          ForeignTableName: PropTypes.string,
          OrdinalPosition: PropTypes.number.isRequired,
          TableName: PropTypes.string.isRequired,
        }),
      ).isRequired,
      Indexes: PropTypes.arrayOf(
        PropTypes.shape({
          ColumnName: PropTypes.string.isRequired,
          IndexName: PropTypes.string.isRequired,
          IndexType: PropTypes.string.isRequired,
          IsPrimary: PropTypes.bool.isRequired,
          IsUnique: PropTypes.bool.isRequired,
          TableName: PropTypes.string.isRequired,
        }),
      ).isRequired,
      TableName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onTableDataChange: PropTypes.func.isRequired,
};

export default CreateTableModal;
