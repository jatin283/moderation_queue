import React from "react";
import PostRow from "./PostRow";

export default function PostList({
  posts,
  tab,
  selected,
  onToggle,
  onApprove,
  onReject,
  onOpenPreview,
}) {
  if (!posts || posts.length === 0) {
    return <div style={{ padding: "20px", textAlign: "center" }}>No posts</div>;
  }

  return (
    <div>
      {posts.map((p) => (
        <PostRow
          key={p.id}
          post={p}
          tab={tab}
          checked={selected.includes(p.id)}
          onToggle={onToggle}
          onApprove={onApprove}
          onReject={onReject}
          onOpenPreview={onOpenPreview}
        />
      ))}
    </div>
  );
}
