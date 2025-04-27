import { useState, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";
import SqlEditorContent from "../components/Sidebar/SqlEditorContent";

const SqlEditor = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [code, setCode] = useState("-- Write your SQL query here");
  const [chartsText, setChartsText] = useState(
    "Execute a query and configure the chart options",
  );
  const textareaRef = useRef(null);

  const [resultsData, setResultsData] = useState([
    { id: 1, name: "Shaimaa", age: 21 },
    { id: 2, name: "Shaimaa", age: 21 },
    { id: 3, name: "Shaimaa", age: 21 },
    { id: 4, name: "Shaimaa", age: 21 },
    { id: 5, name: "Shaimaa", age: 21 },
    { id: 6, name: "Shaimaa", age: 21 },
  ]);

  const handleRun = () => {
    console.log("Running SQL query:", code);
    setPrivateMessages((prev) => [...prev, code]);
  };

  const customTheme = EditorView.theme({
    ".cm-gutters": {
      backgroundColor: "#191a30",
      color: "#FFFFFF",
      border: "none",
    },
    ".cm-lineNumbers": {
      color: "#FFFFFF",
      fontSize: "18px",
      backgroundColor: "#191a30",
    },
    ".cm-content": {
      caretColor: "#ffffff",
    },
    ".cm-cursor": {
      borderLeft: "1px solid #ffffff",
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [chartsText]);

  return (
    <div className="h-screen bg-[#06071A]  overflow-hidden text-white flex flex-col">
      <div className="h-[400px] bg-[#191a30] overflow-y-auto max-h-1/2 font-light text-lg p-2">
        <CodeMirror
          value={code}
          height="100%"
          extensions={[sql(), customTheme]}
          theme="dark"
          basicSetup={true}
          style={{
            fontSize: "16px",
            color: "#FFFFFF",
            backgroundColor: "#191a30",
          }}
          className="bg-[#191a30] text-white"
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="flex-1 overflow-auto bg-[#06071A] p-5 flex flex-col">
        <div className="flex items-center overflow-y-visible justify-between mb-4 border-b border-[#282939] pb-2">
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
            onClick={handleRun}
            className="cursor-pointer bg-gradient-to-b from-[#682EC7] to-[#5A12D3] px-6 py-1 rounded-lg text-lg text-[#FFFFFF] font-medium"
          >
            Run
          </button>
        </div>
        <div className="flex-1 overflow-auto text-lg text-[#FFFFFF] bg-[#06071A] p-2 rounded-md">
          {activeTab === "results" ? (
            resultsData.length > 0 ? (
              <table className="w-full border-solid border-[#282939] rounded-md">
                <thead>
                  <tr className="bg-[#1c1c2e] text-xl font-semibold text-center text-[#FFFFFF]">
                    {Object.keys(resultsData[0]).map((key) => (
                      <th
                        key={key}
                        className="border border-[#282939] p-1 text-center"
                      >
                        {key.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resultsData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#1c1c2e]">
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="border border-[#282939] p-1 text-center"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Click Run to execute your query.</p>
            )
          ) : (
            <textarea
              ref={textareaRef}
              value={chartsText}
              onChange={(e) => setChartsText(e.target.value)}
              className="w-full bg-[#06071A] text-white resize-none outline-none p-2 rounded-md"
              rows={1}
              style={{ overflow: "hidden" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SqlEditor;
