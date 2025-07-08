import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { MiniMap, ReactFlow, applyNodeChanges } from "@xyflow/react";
import { useLoaderData } from "react-router-dom";

import { Flow, Table } from "../features/schema-visualizer/components";
import { tmpFetchedTables2 } from "../features/schema-visualizer/data/tmp";
import { getTableDataAndEdges } from "../features/schema-visualizer/utils/";

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
    <div style={{ height: "calc(100vh - 95px)", width: "100%" }}>
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
        />
      </ReactFlow>
    </div>
  );
};

export const loader = async () => {
  return getTableDataAndEdges(tmpFetchedTables2);
};

export default DatabaseSchema;
