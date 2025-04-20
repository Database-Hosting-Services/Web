import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

const SqlEditor = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [code, setCode] = useState("-- Write your SQL query here");

  return (
    <div className="h-screen bg-[#0e0e18] text-white flex flex-col">
      {/* الجزء العلوي - محرر الكود */}
      <div className="h-1/2 bg-[#1a1a2e] p-4">
        <CodeMirror
          value={code}
          height="100%"
          extensions={[sql()]}
          theme="dark"
          onChange={(value) => setCode(value)}
        />
      </div>

      {/* الجزء السفلي - التابز والنتائج */}
      <div className="h-1/2 bg-[#1a1a2e]  flex flex-col">
        {/* التابز وزر Run */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("results")}
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                activeTab === "results" ? "bg-purple-600" : "text-gray-400"
              }`}
            >
              Results
            </button>
            <button
              onClick={() => setActiveTab("charts")}
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                activeTab === "charts" ? "bg-purple-600" : "text-gray-400"
              }`}
            >
              Charts
            </button>
          </div>

          <button className="bg-purple-600 px-4 py-1 rounded-md text-sm font-medium">
            Run
          </button>
        </div>

        {/* النتائج أو الشارت */}
        <div className="flex-1 overflow-auto text-sm text-gray-300 bg-[#0e0e18] p-4 rounded-md">
          {activeTab === "results"
            ? "Click Run to execute your query."
            : "Charts will be displayed here."}
        </div>
      </div>
    </div>
  );
};

export default SqlEditor;
