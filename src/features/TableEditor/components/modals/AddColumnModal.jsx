import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ForeignKeys } from "../../components/columns";

const AddColumnModal = ({ onClose, onSave, tableName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [columnData, setColumnData] = useState({
    ColumnName: "",
    Description: "",
    DataType: "VARCHAR",
    DefaultValue: "",
    isPrimaryKey: false,
    isNullable: true,
    isUnique: false,
    checkConstraint: "",
  });

  // Open the sidebar with a slight delay to ensure animation works
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e, field) => {
    setColumnData({
      ...columnData,
      [field]: e.target.value,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    // Delay the actual closing to allow animation to complete
    setTimeout(onClose, 300);
  };

  const handleSave = () => {
    onSave(columnData);
    handleClose();
  };

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
              Add new column to {tableName}
            </h3>
            <div className="border-b-gradient w-[60px] mx-auto mb-5"></div>

            {/* Name field */}
            <div className="mb-6 flex items-center">
              <label className="text-white mr-4 w-24">Name</label>
              <input
                className="flex-1 bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={columnData.ColumnName}
                onChange={(e) => handleInputChange(e, "ColumnName")}
                placeholder="Enter column name"
              />
            </div>

            {/* Description field */}
            <div className="mb-10 flex items-center">
              <label className="text-white mr-4 w-24">Description</label>
              <input
                className="flex-1 bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={columnData.Description}
                onChange={(e) => handleInputChange(e, "Description")}
                placeholder="Enter description"
              />
            </div>

            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>

            {/* Data Type section */}
            <div className="mb-6 flex items-center">
              <label className="text-white mr-4 w-24">Data Type</label>
              <select
                className="flex-1 bg-secondary border border-tertiary rounded-md py-2 px-3 text-white appearance-none"
                value={columnData.DataType}
                onChange={(e) => handleInputChange(e, "DataType")}
              >
                <option value="VARCHAR">VARCHAR</option>
                <option value="INTEGER">INTEGER</option>
                <option value="TEXT">TEXT</option>
                <option value="BOOLEAN">BOOLEAN</option>
                <option value="DATE">DATE</option>
                <option value="TIMESTAMP">TIMESTAMP</option>
              </select>
            </div>

            {/* Default Value field */}
            <div className="mb-8 flex items-center">
              <label className="text-white mr-4 w-24">Default Value</label>
              <input
                className="flex-1 bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={columnData.DefaultValue}
                onChange={(e) => handleInputChange(e, "DefaultValue")}
                placeholder="Enter default value"
              />
            </div>

            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>

            {/* Foreign keys section */}
            <ForeignKeys />

            <div className="border-b-gradient w-[60px] mx-auto mb-3"></div>

            {/* Constraints section */}
            <div className="mb-8">
              <h4 className="mb-4 font-normal text-white text-lg">
                Constraints
              </h4>

              {/* Is Primary Key */}
              <div className="mb-4 flex items-start">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPrimaryKey"
                    className="w-5 h-5 mr-3"
                    onChange={(e) => handleInputChange(e, "isPrimaryKey")}
                  />
                  <div>
                    <label
                      htmlFor="isPrimaryKey"
                      className="text-white font-medium"
                    >
                      Is Primary Key
                    </label>
                    <p className="text-gray-400 text-sm mt-1">
                      A primary key indicates that a column or group of columns
                      can be used as a unique identifier for rows in the table
                    </p>
                  </div>
                </div>
              </div>

              {/* Allow Nullable */}
              <div className="mb-4 flex items-start">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowNullable"
                    className="w-5 h-5 mr-3"
                    defaultChecked
                    onChange={(e) => handleInputChange(e, "isNullable")}
                  />
                  <div>
                    <label
                      htmlFor="allowNullable"
                      className="text-white font-medium"
                    >
                      Allow Nullable
                    </label>
                    <p className="text-gray-400 text-sm mt-1">
                      Allow the column to assume a NULL value if no value is
                      provided
                    </p>
                  </div>
                </div>
              </div>

              {/* Is Unique */}
              <div className="mb-4 flex items-start">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isUnique"
                    className="w-5 h-5 mr-3"
                    onChange={(e) => handleInputChange(e, "isUnique")}
                  />
                  <div>
                    <label
                      htmlFor="isUnique"
                      className="text-white font-medium"
                    >
                      Is Unique
                    </label>
                    <p className="text-gray-400 text-sm mt-1">
                      Enforce values in the column to be unique across rows
                    </p>
                  </div>
                </div>
              </div>

              {/* Check Constraint */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label className="text-white font-medium">
                    CHECK Constraint
                  </label>
                  <span className="text-gray-400 text-sm">Optional</span>
                </div>
                <input
                  type="text"
                  className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                  placeholder="Enter a check constraint expression"
                  onChange={(e) => handleInputChange(e, "checkConstraint")}
                />
              </div>
            </div>

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

AddColumnModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tableName: PropTypes.string.isRequired,
};

export default AddColumnModal;
