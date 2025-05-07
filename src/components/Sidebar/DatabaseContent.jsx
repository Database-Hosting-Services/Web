import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DatabaseContent = () => {
  const [activeTab, setActiveTab] = useState(" ");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "SchemaVisualizer":
        navigate("/dashboard/project/:projectId/database/schema-visualizer");
        break;
      case "tables":
        navigate("/dashboard/project/:projectId/database/tables");
        break;
      case "indexes":
        navigate("/dashboard/project/:projectId/database/indexes");
        break;
      default:
        break;
    }
  };

  const getClassNames = (tab) => {
    const isActive = activeTab === tab;
    return `
      rounded-xl px-4 py-2.5 text-[#FFFFFF] 
      ${
        isActive
          ? "bg-[#191A30] cursor-pointer border border-tertiary "
          : "bg-[#06071a] cursor-default "
      }
    `;
  };

  return (
    <div className="h-full">
      <h1 className="text-xl text-center font-semibold text-white mb-6 px-5 pt-4">
        Database
      </h1>

      <div className="border-b-gradient w-full"></div>

      <div className="space-y-3 px-4 pt-5">
        <div
          onClick={() => handleTabClick("SchemaVisualizer")}
          className={getClassNames("SchemaVisualizer")}
        >
          schema visualizer
        </div>

        <div className="px-1 py-2">
          <div
            onClick={() => handleTabClick("tables")}
            className={getClassNames("tables")}
          >
            Tables
          </div>
        </div>

        <div className="px-1 py-2">
          <div
            onClick={() => handleTabClick("indexes")}
            className={getClassNames("indexes")}
          >
            Indexes
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseContent;
