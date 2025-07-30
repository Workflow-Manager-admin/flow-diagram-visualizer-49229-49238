import React from "react";

// PUBLIC_INTERFACE
export default function FooterLog({ log, onClear }) {
  /**
   * Footer for display of code execution output/logs.
   * @param {string} log - The text to display in the log area
   * @param {function} onClear - Handler to clear the log
   * @returns {JSX.Element}
   */
  return (
    <footer className="footer-log">
      <div className="log-content">
        <strong>Output:</strong>
        <pre>{log}</pre>
      </div>
      <button className="btn-clear" onClick={onClear}>
        Clear
      </button>
    </footer>
  );
}
