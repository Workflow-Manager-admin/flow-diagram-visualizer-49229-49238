import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";
import FooterLog from "./components/FooterLog";
import NodeConfigModal from "./components/NodeConfigModal";
import { applyTheme } from "./theme";

// Util for unique node ids
function generateId() {
  return "node-" + Math.random().toString(36).substr(2, 9);
}

// PUBLIC_INTERFACE
function App() {
  // Diagram and UI state
  const [theme, setTheme] = useState("light");

  const [nodes, setNodes] = useState(() =>
    JSON.parse(localStorage.getItem("diagram_nodes") || "[]")
  );
  const [connections, setConnections] = useState(() =>
    JSON.parse(localStorage.getItem("diagram_connections") || "[]")
  );
  const [selectedTool, setSelectedTool] = useState("process");
  const [dragNodeId, setDragNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const [modalNode, setModalNode] = useState(null);
  const [log, setLog] = useState("");
  const [execOutput, setExecOutput] = useState(null);
  const [execError, setExecError] = useState(null);

  // Effect: theming/applying CSS variables
  useEffect(() => {
    applyTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Effect: save diagram to local storage
  useEffect(() => {
    localStorage.setItem("diagram_nodes", JSON.stringify(nodes));
    localStorage.setItem("diagram_connections", JSON.stringify(connections));
  }, [nodes, connections]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Node addition to workspace
  function handleAddNode() {
    // Default placement near center-top (randomly offset for stacking)
    setNodes([
      ...nodes,
      {
        id: generateId(),
        type: selectedTool,
        label: "",
        x: 100 + Math.random() * 60,
        y: 60 + Math.random() * 30,
        code: "",
      },
    ]);
  }
  // Drag node start
  function handleNodeDrag(e, nodeId) {
    setDragNodeId(nodeId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", nodeId);
  }
  // Drop on workspace moves node
  function handleCanvasDrop(e) {
    e.preventDefault();
    const nodeId = e.dataTransfer.getData("text/plain");
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const dropX = e.clientX - left;
    const dropY = e.clientY - top;
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === nodeId ? { ...n, x: dropX, y: dropY } : n
      )
    );
    setDragNodeId(null);
  }
  // Node click: open config modal
  function handleNodeClick(nodeId) {
    setSelectedNodeId(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    setModalNode(node);
    setExecOutput(null);
    setExecError(null);
  }
  // Modal: save config
  function handleModalSave(updatedNode) {
    setNodes((nodes) =>
      nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
  }
  // Modal: run code
  function handleNodeExecute(code) {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      const result = fn();
      setExecOutput(String(result));
      setExecError(null);
      setLog((l) =>
        (l ? l + "\n" : "") +
        `[${new Date().toLocaleTimeString()}] Output: ${String(result)}`
      );
    } catch (e) {
      setExecOutput(null);
      setExecError(e.message);
      setLog((l) =>
        (l ? l + "\n" : "") +
        `[${new Date().toLocaleTimeString()}] Error: ${e.message}`
      );
    }
  }
  // Modal: close
  function handleModalClose() {
    setModalNode(null);
    setExecOutput(null);
    setExecError(null);
  }
  // (Stub) Node connecting – extension: click node, then another to connect
  function handleConnectNodes(/*srcId, tgtId*/) {
    // Feature stub—left for future extension
  }
  // Log clear
  function handleLogClear() {
    setLog("");
  }
  // Save/load diagram
  function handleSaveDiagram() {
    localStorage.setItem("diagram_nodes", JSON.stringify(nodes));
    localStorage.setItem("diagram_connections", JSON.stringify(connections));
    alert("Diagram saved to browser storage.");
  }
  function handleLoadDiagram() {
    setNodes(JSON.parse(localStorage.getItem("diagram_nodes") || "[]"));
    setConnections(JSON.parse(localStorage.getItem("diagram_connections") || "[]"));
  }

  return (
    <div className="app-root" data-theme={theme}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="layout">
        <Sidebar
          onAddNode={handleAddNode}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
        <div className="main-area">
          <div className="diagram-header">
            <strong>Flow Diagram Editor</strong>
            <div className="diagram-actions">
              <button className="btn-accent" onClick={handleSaveDiagram}>
                Save
              </button>
              <button className="btn-secondary" onClick={handleLoadDiagram}>
                Load
              </button>
            </div>
          </div>
          <Workspace
            nodes={nodes}
            connections={connections}
            onNodeDrag={handleNodeDrag}
            onNodeClick={handleNodeClick}
            onCanvasDrop={handleCanvasDrop}
            onConnectNodes={handleConnectNodes}
            selectedNodeId={selectedNodeId}
          />
        </div>
      </div>
      <FooterLog log={log} onClear={handleLogClear} />
      <NodeConfigModal
        node={modalNode}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onExecute={handleNodeExecute}
        output={execOutput}
        error={execError}
      />
    </div>
  );
}

export default App;
