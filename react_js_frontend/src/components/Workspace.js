import React from "react";

// PUBLIC_INTERFACE
export default function Workspace({
  nodes,
  connections,
  onNodeDrag,
  onNodeClick,
  onCanvasDrop,
  onConnectNodes,
  selectedNodeId,
}) {
  /**
   * Main workspace for diagram editing and node placement.
   * @param {array} nodes - Array of nodes in the diagram
   * @param {array} connections - Array of connections (edges) between nodes
   * @param {function} onNodeDrag - Callback for node drag event
   * @param {function} onNodeClick - Callback for node click (select/config)
   * @param {function} onCanvasDrop - Handle drop on workspace for new node
   * @param {function} onConnectNodes - Handle connecting nodes/edges
   * @param {string} selectedNodeId - Id of currently selected node
   * @returns {JSX.Element}
   */
  return (
    <main
      className="workspace"
      onDragOver={e => e.preventDefault()}
      onDrop={onCanvasDrop}
    >
      {/* Render connections (as SVG lines for minimalism) */}
      <svg className="connection-layer">
        {connections.map((conn, i) => {
          const src = nodes.find(n => n.id === conn.from);
          const tgt = nodes.find(n => n.id === conn.to);
          if (!src || !tgt) return null;
          return (
            <line
              key={i}
              x1={src.x + 60}
              y1={src.y + 25}
              x2={tgt.x + 10}
              y2={tgt.y + 25}
              stroke="#1976d2"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="4"
            refX="8"
            refY="2"
            orient="auto"
          >
            <polygon points="0 0, 8 2, 0 4" fill="#1976d2" />
          </marker>
        </defs>
      </svg>

      {/* Render nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className={`diagram-node ${selectedNodeId === node.id ? "selected" : ""}`}
          style={{ left: node.x, top: node.y }}
          draggable
          onDragStart={e => onNodeDrag(e, node.id)}
          onClick={e => {
            e.stopPropagation();
            onNodeClick(node.id);
          }}
        >
          <span className="node-type">{node.type}</span>
          <div className="node-title">{node.label || node.type}</div>
        </div>
      ))}
    </main>
  );
}
