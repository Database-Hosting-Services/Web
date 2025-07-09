import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AddColumnModal = ({ onClose, onSave, tableName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [columnData, setColumnData] = useState({
    ColumnName: "",
    Description: "",
    DataType: "VARCHAR",
    DefaultValue: "",
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

  const handleAddForeignKey = () => {
    // Placeholder for adding a foreign key
    console.log("Add foreign key");
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
            <div className="mb-6">
              <label className="block text-white mb-2">Name</label>
              <input
                className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={columnData.ColumnName}
                onChange={(e) => handleInputChange(e, "ColumnName")}
                placeholder="Enter column name"
              />
            </div>

            {/* Description field */}
            <div className="mb-6">
              <label className="block text-white mb-2">Description</label>
              <input
                className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={columnData.Description}
                onChange={(e) => handleInputChange(e, "Description")}
                placeholder="Enter description"
              />
            </div>

            <div className="border-b-gradient w-full mb-6"></div>

            {/* Data Type section */}
            <div className="mb-6">
              <label className="block text-white mb-2">Data Type</label>
              <div className="flex">
                <label className="mr-4 text-white">Type</label>
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
            </div>

            {/* Default Value field */}
            <div className="mb-8">
              <label className="block text-white mb-2">Default Value</label>
              <input
                className="w-full bg-secondary border border-tertiary rounded-md py-2 px-3 text-white"
                type="text"
                value={columnData.DefaultValue}
                onChange={(e) => handleInputChange(e, "DefaultValue")}
                placeholder="Enter default value"
              />
            </div>

            <div className="border-b-gradient w-full mb-6"></div>

            {/* Foreign keys section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-white">Foreign keys</label>
                <button
                  className="bg-secondary text-white py-1 px-3 rounded-md text-sm border border-tertiary"
                  onClick={handleAddForeignKey}
                >
                  Add foreign key
                </button>
              </div>
            </div>

            <div className="border-b-gradient w-full mb-6"></div>

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
