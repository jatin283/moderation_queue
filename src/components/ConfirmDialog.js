import React from "react";
import "./ConfirmDialog.css";

export default function ConfirmDialog({ open, count, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        {count > 0 ? (
          <p>{message.replace("{count}", count)}</p>
        ) : (
          <p>No queries selected.</p>
        )}

        <div className="dialog-actions">
          {count > 0 ? (
            <>
              <button onClick={onConfirm} className="confirm">Yes</button>
              <button onClick={onCancel} className="cancel">Cancel</button>
            </>
          ) : (
            <button onClick={onCancel} className="cancel">Close</button>
          )}
        </div>
      </div>
    </div>
  );
}
