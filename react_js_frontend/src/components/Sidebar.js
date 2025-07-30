import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ onAddNode, selectedTool, setSelectedTool }) {
  /**
   * Sidebar for tool/node selection.
   * @param {function} onAddNode - Callback to add node to canvas
   * @param {string} selectedTool - Currently selected node type/tool
   * @param {function} setSelectedTool - Setter for selected tool
   * @returns {JSX.Element}
   */
  return (
    <aside className="sidebar">
      <h2>Tools</h2>
      <div className="tool-list">
        <button
          className={`tool-btn ${selectedTool === "process" ? "active" : ""}`}
          onClick={() => setSelectedTool("process")}
        >
          Process Node
        </button>
        <button
          className={`tool-btn ${selectedTool === "input" ? "active" : ""}`}
          onClick={() => setSelectedTool("input")}
        >
          Input Node
        </button>
        <button
          className={`tool-btn ${selectedTool === "output" ? "active" : ""}`}
          onClick={() => setSelectedTool("output")}
        >
          Output Node
        </button>
        <hr />
        <button
          className="tool-btn accent"
          onClick={onAddNode}
        >
          + Add Node
        </button>
      </div>
    </aside>
  );
}
