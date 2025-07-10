import { Form } from "react-router-dom";

const EditorActions = ({ activeTab, setActiveTab, onRun }) => {
  return (
    <div className="flex justify-between items-center mb-4 pb-2 border-[#282939] border-b overflow-y-visible">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-1 rounded-lg text-lg font-medium cursor-pointer ${
            activeTab === "results"
              ? "bg-gradient-to-b from-[#682EC7] to-[#5A12D3]"
              : "text-[#FFFFFF]"
          }`}
        >
          Results
        </button>
        <button
          onClick={() => setActiveTab("charts")}
          className={`px-4 py-1 rounded-lg text-lg font-light cursor-pointer ${
            activeTab === "charts"
              ? "bg-gradient-to-b from-[#682EC7] to-[#5A12D3]"
              : "text-[#FFFFFF]"
          }`}
        >
          Charts
        </button>
      </div>

      <button
        onClick={onRun}
        className="bg-gradient-to-b from-[#682EC7] to-[#5A12D3] px-6 py-1 rounded-lg font-medium text-[#FFFFFF] text-lg cursor-pointer"
      >
        Run
      </button>
    </div>
  );
};

export default EditorActions;
