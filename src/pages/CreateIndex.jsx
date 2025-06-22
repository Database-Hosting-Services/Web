import React from "react";
import { useNavigate } from "react-router-dom";

const CreateIndexPage = ({ onClose }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className=" relative bg-[#06071A] text-white px-10 py-8 flex flex-col min-h-screen  w-2xl ">
      <h1 className="text-2xl  font-semibold mb-8 text-left">
        Create new index
      </h1>
      <div className="border-b-gradient mb-10 w-full"></div>

      <form className="max-w-3xl space-y-6">
        {/* Select a scheme */}
        <div className="flex items-center gap-4 mb-10">
          <label className="text-18 text-[#FFFFF] mr-10 whitespace-nowrap ">
            Select a scheme
          </label>
          <input
            type="text"
            className="w-full px-4 py-2  rounded-lg bg-[#191A30] border border-[#282939] text-white focus:outline-none ]"
          />
        </div>

        {/* Select a table */}
        <div className="flex items-center gap-4">
          <label className="text-18 mb-10 mr-15  text-[#FFFFF] whitespace-nowrap">
            Select a table
          </label>
          <input
            type="text"
            className="w-full mb-10 px-4 py-2 rounded-lg bg-[#191A30] border border-[#282939] text-white focus:outline-none "
          />
        </div>
        <div className="border-b-gradient mb-10 w-full "></div>

        {/* Buttons */}
        <div className="border-b-gradient mb-10 w-full mt-80 "></div>

        <div className="absolute bottom-6 right-6 flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-[#191A30] cursor-pointer text-white rounded-lg border border-[#282939]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-b cursor-pointer from-[#682EC7] to-[#5A12D3] text-[#FFFFFF] rounded-lg font-semibold transition"
          >
            Create index
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIndexPage;
