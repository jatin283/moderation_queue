import React from "react";
import "./Toast.css";

export default function Toast({ message, onUndo, onClose }) {
  if (!message) return null;
  return (
    <div className="toast">
      <span>{message}</span>
      {onUndo && <button onClick={onUndo}>Undo</button>}
      <button className="close" onClick={onClose}>✖</button>
    </div>
  );
}
