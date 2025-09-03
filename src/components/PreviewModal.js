import React from "react";
import "./PreviewModal.css";

export default function PreviewModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>✖</button>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
