import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { MiniMap, ReactFlow, applyNodeChanges } from "@xyflow/react";

import { Flow, Table } from "../../schema-visualizer/components";

const nodeTypes = { tableNode: Table };

const Visualizer = ({ tableNodesAndEdges }) => {
  const { nodes: generatedNodes, edges: generatedEdges } = tableNodesAndEdges;

  const [nodes, setNodes] = useState(generatedNodes);
  const [edges] = useState(generatedEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  return (
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
  );
};

export default Visualizer;
