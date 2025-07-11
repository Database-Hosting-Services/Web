import { useEffect, useState } from "react";

import { tmpResults } from "../features/sqlEditor/data/tmp";
import Editor from "../features/sqlEditor/components/Editor";
import { EditorActions, SqlResults } from "../features/sqlEditor/components";
import { useFetcher } from "react-router-dom";
import { useDashboardContext } from "../features/dashboard/store/DashboardContext";

const SqlEditor = () => {
  const {
    projectData: { _id: projectId },
  } = useDashboardContext();

  const [activeTab, setActiveTab] = useState("results");
  const [code, setCode] = useState("-- Write your SQL query here");

  const [resultsData, setResultsData] = useState(tmpResults || []);

  const [error, setError] = useState("");

  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher?.data?.error) {
      setError(fetcher.data.error);
      setResultsData([]);
    }
  }, [fetcher.data]);

  const handleRun = () => {
    console.log("Running QUERY", code);

    const formData = new FormData();
    formData.append("query", code);
    formData.append("projectId", projectId);

    fetcher.submit(formData, {
      method: "post",
      action: `/dashboard/project/${projectId}/sql-editor`,
    });
  };

  return (
    <div className="flex flex-col bg-[#06071A] h-screen overflow-hidden text-white">
      {/* -------------------- First Half (Editor) -------------------- */}
      <Editor code={code} setCode={setCode} />

      {/* -------------------- Second Half (Results/Charts) -------------------- */}
      <div className="flex flex-col flex-1 bg-[#06071A] p-5 overflow-auto">
        <EditorActions
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRun={handleRun}
        />

        <div className="flex-1 bg-[#06071A] p-2 rounded-md overflow-auto text-[#FFFFFF] text-lg">
          {activeTab === "results" ? (
            error ? (
              <p className="text-red-500 text-lg">{error}</p>
            ) : (
              <SqlResults resultsData={resultsData} />
            )
          ) : (
            <p className="text-lg text-center">
              Charts will be displayed here based on your SQL query results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SqlEditor;
