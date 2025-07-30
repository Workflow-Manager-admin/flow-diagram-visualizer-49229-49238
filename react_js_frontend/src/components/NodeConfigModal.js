import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function NodeConfigModal({ node, onClose, onSave, onExecute, output, error }) {
  /**
   * Modal for editing node details and JS code, and executing it.
   * @param {object|null} node - The node being configured, or null if modal is not open
   * @param {function} onClose - Close the modal
   * @param {function} onSave - Save changes to node config
   * @param {function} onExecute - Execute the node's code
   * @param {string|null} output - Output from code execution
   * @param {string|null} error - Error from code execution
   * @returns {JSX.Element|null}
   */
  const [label, setLabel] = useState(node?.label || "");
  const [code, setCode] = useState(node?.code || "");

  if (!node) return null;

  const save = () => {
    onSave({ ...node, label, code });
    onClose();
  };

  const run = () => {
    onExecute(code);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Configure Node</h2>
        <label>
          Name/Label:
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            autoFocus
          />
        </label>
        <label>
          JavaScript Code:
          <textarea
            rows={8}
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="code-editor"
          />
        </label>
        <div className="modal-actions">
          <button className="btn-primary" onClick={save}>
            Save
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-accent" onClick={run}>
            Run Code
          </button>
        </div>
        <div className="exec-output">
          {output && (
            <div className="success">Output: <pre>{output}</pre></div>
          )}
          {error && (
            <div className="error">Error: <pre>{error}</pre></div>
          )}
        </div>
      </div>
    </div>
  );
}
