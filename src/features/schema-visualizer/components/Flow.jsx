import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
import { getElkLayout } from "../utils";

const Flow = () => {
  const { setNodes, setEdges, getNodes, getEdges, fitView } = useReactFlow();
  useEffect(() => {
    console.log("Hello from DatabaseSchema.jsx");

    const setAutoLayout = async () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getElkLayout(
        getNodes(),
        getEdges(),
        "RIGHT",
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      fitView();
    };

    setAutoLayout();
  }, [setNodes, setEdges, getNodes, getEdges, fitView]);

  return null;
};

export default Flow;
