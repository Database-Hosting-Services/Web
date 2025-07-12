import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { MiniMap, ReactFlow, applyNodeChanges } from "@xyflow/react";
import { redirect, useLoaderData } from "react-router-dom";

import {
  Flow,
  FlowIcons,
  Table,
} from "../features/schema-visualizer/components";
import { getTableDataAndEdges } from "../features/schema-visualizer/utils/";
import { SCHEMA_VISUALIZER_ENDPOINTS } from "../features/schema-visualizer/api/endpoints";

import { privateAxios } from "../api";
import { errorToast } from "../utils/toastConfig";

const nodeTypes = { tableNode: Table };

const DatabaseSchema = () => {
  const tableDataAndEdges = useLoaderData();
  const { nodes: generatedNodes, edges: generatedEdges } = tableDataAndEdges;

  const [nodes, setNodes] = useState(generatedNodes);
  const [edges] = useState(generatedEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  return (
    <div
      className="relative"
      style={{ height: "calc(100vh - 95px)", width: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Flow />
        <MiniMap
          zoomable
          pannable
          maskColor="#1e1e2f80"
          nodeColor="#4A5568"
          nodeStrokeWidth={3}
          style={{
            backgroundColor: "#06071A",
            border: "1px solid #282939",
            borderRadius: "8px",
          }}
          position="top-right"
        />
      </ReactFlow>
      <div className="right-0 bottom-0 left-0 absolute flex justify-center items-center gap-5 bg-secondary p-2 border-1 border-tertiary text-white">
        <FlowIcons />
      </div>
    </div>
  );
};

export const loader = async ({ params }) => {
  const { projectId } = params;

  try {
    const {
      data: { data: fetchedTables },
    } = await privateAxios.get(
      SCHEMA_VISUALIZER_ENDPOINTS.getTables(projectId),
    );

    console.log(fetchedTables);

    return getTableDataAndEdges(fetchedTables || []);
  } catch (err) {
    errorToast(
      err?.response?.data?.message ||
        err.message ||
        "Failed to fetch tables data",
    );

    return redirect("/dashboard");
  }
};

export default DatabaseSchema;
