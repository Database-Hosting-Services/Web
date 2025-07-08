import { useCallback, useState } from "react";
import { MiniMap, ReactFlow, applyNodeChanges } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Flow, Table } from "../features/schema-visualizer/components";
import {
  tmpFetchedTables,
  tmpFetchedTables2,
} from "../features/schema-visualizer/data/tmp";
import { useLoaderData } from "react-router-dom";
import { getTableDataAndEdges } from "../features/schema-visualizer/utils/getTableDataAndEdges";

const nodeTypes = { tableNode: Table };

// const initialNodes = [
//   {
//     id: "1",
//     type: "tableNode",
//     position: { x: 550, y: 525 },
//     data: {
//       label: "Table Node 1",
//       // columns: [
//       //   { title: "id", type: "int8" },
//       //   { title: "name", type: "varchar" },
//       //   { title: "age", type: "int8" },
//       // ],
//     },
//   },
//   {
//     id: "2",
//     type: "tableNode",
//     position: { x: 50, y: 25 },
//     data: {
//       label: "Table Node 2",
//       // columns: [
//       //   { title: "id", type: "int8" },
//       //   { title: "name", type: "varchar" },
//       //   { title: "age", type: "int8" },
//       // ],
//     },
//   },
// ];

// const initialNodes = [
//   {
//     id: "1",
//     data: { label: "Hello" },
//     position: { x: 0, y: 0 },
//     type: "input",
//   },
//   {
//     id: "2",
//     data: { label: "World" },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: "3",
//     data: { label: "World" },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: "4",
//     data: { label: "World" },
//     position: { x: 100, y: 100 },
//   },
// ];

// const initialEdges = [
//   { id: "e2-3", source: "2", target: "3" },
//   { id: "e1-3", source: "1", target: "3" },
//   { id: "e2-4", source: "2", target: "4" },
//   { id: "e3-4", source: "3", target: "4" },
// ];

const DatabaseSchema = () => {
  const tableDataAndEdges = useLoaderData();
  const { nodes: generatedNodes, edges: generatedEdges } = tableDataAndEdges;
  // console.log("Generated Nodes:", generatedNodes);
  // console.log("Generated Edges:", generatedEdges);

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
