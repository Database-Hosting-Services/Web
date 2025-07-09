import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
import { getElkLayout } from "../utils";

const Flow = () => {
  const { setNodes, setEdges, getNodes, getEdges, fitView } = useReactFlow();
  useEffect(() => {
    const setAutoLayout = async () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = await getElkLayout(
        getNodes(),
        getEdges(),
        "LEFT",
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
