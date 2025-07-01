// src/components/DeleteModal.jsx
import React from "react";
import cancel from "../../assets/cancel.svg";

const DeleteTable = ({ tableName, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 backdrop-brightness-25 z-50 flex items-center justify-center">
      <div className="bg-[#191A30] text-white rounded-xl shadow-lg w-[90%] max-w-lg p-6 relative">
        <button
          className="absolute  cursor-pointer top-6 pr-4 right-3 text-gray-400  text-lg"
          onClick={onCancel}
        >
          <img src={cancel} alt="Cancel" className="w-6 h-6 " />
        </button>

        <h2 className="text-lg font-semibold mb-3">
          Confirm deletion of table{" "}
          <span className="text-[#ffffff] font-bold">"{tableName}"</span>
        </h2>

        <div className="border-y border-gray-800 w-fit pt-5 mx-auto px-6 py-4">
          <p className="text-sm text-gray-300 mb-6 pt-4 text-center">
            Are you sure you want to delete the selected table? This action
            cannot be undone.
          </p>
        </div>

        <div className="flex justify-center pt-5 gap-4 mt-4">
          <button
            onClick={onCancel}
            className="px-14 py-2 cursor-pointer border border-[#282939] text-white rounded-lg "
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-14 py-2  cursor-pointer bg-[#FF0000] text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTable;
