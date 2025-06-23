import { useState } from "react";
import { MessageDialog } from "./index";

// Example usage component to demonstrate how to use the MessageDialog
const DiscardChangesExample = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Simulating a form input change to trigger unsaved changes state
  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  // Handler for attempting to close the panel/form
  const handleCloseAttempt = () => {
    if (hasUnsavedChanges) {
      setShowDialog(true); // Show the confirmation dialog
    } else {
      // No unsaved changes, close immediately
      closePanel();
    }
  };

  // Example function to close the panel (would be implemented based on your app structure)
  const closePanel = () => {
    console.log("Panel closed");
    // Additional close logic here
    setHasUnsavedChanges(false);
  };

  // Handle confirm discard action
  const handleConfirmDiscard = () => {
    // Discard changes and close
    setShowDialog(false);
    closePanel();
  };

  // Handle cancel discard action
  const handleCancelDiscard = () => {
    // Just close the dialog, keep the panel open
    setShowDialog(false);
  };

  return (
    <div>
      {/* Example form */}
      <div className="p-6 bg-[#1A1B31] rounded-lg">
        <h2 className="text-white text-xl mb-4">Example Form</h2>
        <input
          type="text"
          placeholder="Make changes here"
          onChange={handleInputChange}
          className="w-full bg-[#131429] border border-[#262840] rounded-md py-2 px-3 text-white mb-4"
        />
        <button
          onClick={handleCloseAttempt}
          className="px-4 py-2 bg-[#2A2C42] text-white rounded-md hover:cursor-pointer"
        >
          Close Panel
        </button>
      </div>

      {/* Discard Changes Dialog */}
      {showDialog && (
        <MessageDialog
          title="Discard changes"
          message="There are unsaved changes. Are you sure you want to close the panel? Your changes will be lost."
          onCancel={handleCancelDiscard}
          onConfirm={handleConfirmDiscard}
          confirmText="Discard"
          cancelText="Cancel"
          confirmButtonClass="bg-purple-600"
        />
      )}
    </div>
  );
};

export default DiscardChangesExample;
