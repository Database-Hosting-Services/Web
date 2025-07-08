const DIRECTIONS = {
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  UP: "UP",
  DOWN: "DOWN",
};

export default async function getElkLayout(
  nodes = [],
  edges = [],
  direction = "RIGHT",
) {
  const isRight = direction === DIRECTIONS.RIGHT;
  const isLeft = direction === DIRECTIONS.LEFT;
  const isUp = direction === DIRECTIONS.UP;

  const targetPosition = isRight
    ? "left"
    : isLeft
    ? "right"
    : isUp
    ? "bottom"
    : "top";

  const sourcePosition = isRight
    ? "right"
    : isLeft
    ? "left"
    : isUp
    ? "top"
    : "bottom";

  const elk = new ELK(); // Got from the CDN

  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": direction,
      "elk.edgeRouting": "POLYLINE",
      "elk.spacing.nodeNode": "200",
      "elk.spacing.edgeNode": "200",
      "elk.layered.spacing.nodeNodeBetweenLayers": "200",
    },
    children: nodes.map((node) => ({
      id: node.id,
      "elk.position": {
        x: node.position?.x,
        y: node.position?.y,
      },
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  const layout = await elk.layout(graph);
  if (!layout || !layout.children) {
    return {
      nodes: [],
      edges: [],
    };
  }

  return {
    nodes: layout.children.map((node) => {
      const initialNode = nodes.find((n) => n.id === node.id);
      if (!initialNode) {
        throw new Error("Node not found");
      }
      return {
        ...initialNode,
        position: {
          x: node.x,
          y: node.y,
        },
        sourcePosition,
        targetPosition,
      };
    }),
    edges: (layout.edges ?? []).map((edge) => {
      const initialEdge = edges.find((e) => e.id === edge.id);
      if (!initialEdge) {
        throw new Error("Edge not found");
      }
      return {
        ...initialEdge,
        source: edge.sources[0],
        target: edge.targets[0],
      };
    }),
  };
}
