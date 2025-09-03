import React from "react";
import "./PreviewModal.css";

export default function PreviewModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{post.title}</h2>

        {/* ✅ Add details */}
        <p><strong>Author:</strong> {post.author.username}</p>
        <p><strong>Status:</strong> {post.status}</p>
        <p><strong>Reported At:</strong> {new Date(post.reportedAt).toLocaleString()}</p>
        <p><strong>Reported Reason:</strong> {post.reportedReason}</p>
        {post.reason && (
          <div className="post-reason">
            <strong>Reason:</strong>
            <p>{post.reason}</p>
          </div>
        )}

        {post.description && (
          <div className="post-description">
            <strong>Description:</strong>
            <p>{post.description}</p>
          </div>
        )}

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
