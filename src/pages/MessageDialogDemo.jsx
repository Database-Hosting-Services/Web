import { useState } from "react";
import { MessageDialog } from "../components/ui";

const MessageDialogDemo = () => {
  const [showDialog, setShowDialog] = useState(true);

  const handleCancel = () => {
    console.log("Cancel clicked");
    setShowDialog(false);
  };

  const handleConfirm = () => {
    console.log("Discard clicked");
    setShowDialog(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#121212]">
      <button
        onClick={() => setShowDialog(true)}
        className="px-4 py-2 bg-[#5D42CC] text-white rounded-md"
      >
        Show Discard Dialog
      </button>

      {showDialog && (
        <MessageDialog
          title="Discard changes"
          message="There are unsaved changes. Are you sure you want to close the panel? Your changes will be lost."
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default MessageDialogDemo;
