import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./PostRow.css";

export default function PostRow({
  post,
  tab,
  checked,
  onToggle,
  onApprove,
  onReject,
  onOpenPreview,
}) {
  if (!post) return null;

  return (
    <div className="post-row">
      {/* ✅ Show checkbox only in Pending tab */}
      {tab === "pending" && (
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(post.id)}
        />
      )}

      <div className="post-info" onClick={() => onOpenPreview(post.id)}>
        <h3>{post.title}</h3>
        <p className="meta">
          by {post.author.username} •{" "}
          {formatDistanceToNow(new Date(post.reportedAt))} ago
        </p>
        <p className="reason">Reason: {post.reportedReason}</p>
        <span className={`status ${post.status}`}>{post.status}</span>
      </div>

      {/* ✅ Approve/Reject buttons also only make sense in Pending */}
      {tab === "pending" && (
        <div className="actions">
          <button onClick={() => onApprove(post.id)}>Approve</button>
          <button onClick={() => onReject(post.id)}>Reject</button>
        </div>
      )}
    </div>
  );
}
