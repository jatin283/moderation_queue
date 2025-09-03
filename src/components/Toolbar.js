import React from "react";
import "./Toolbar.css";

export default function Toolbar({
  selectedCount,
  totalCount,
  allSelected,
  onSelectAll,
  onApproveSelected,
  onRejectSelected,
  onClearSelection,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
        <span>{selectedCount} / {totalCount} selected</span>
      </div>

      <div className="toolbar-actions">
        <button onClick={onApproveSelected} className="approve">
          Approve
        </button>
        <button onClick={onRejectSelected} className="reject">
          Reject
        </button>
        <button onClick={onClearSelection} className="clear">
          Clear
        </button>
      </div>
    </div>
  );
}
