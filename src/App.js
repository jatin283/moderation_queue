import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import Toolbar from "./components/Toolbar";
import PostList from "./components/PostList";
import PreviewModal from "./components/PreviewModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Toast from "./components/Toast";
import { approvePost, rejectPost } from "./store/postsSlice";
import { toggleSelect, clearSelection, openPreview, closePreview } from "./store/uiSlice";
import "./App.css";

export default function App() {
  const posts = useSelector((s) => s.posts.data);
  const selected = useSelector((s) => s.ui.selected);
  const previewId = useSelector((s) => s.ui.previewId);
  const dispatch = useDispatch();

  const [tab, setTab] = useState("pending");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [rejectConfirmOpen, setRejectConfirmOpen] = useState(false);
  const [approveConfirmOpen, setApproveConfirmOpen] = useState(false); // ✅ new
  const [toast, setToast] = useState(null);

  const filtered = posts.filter((p) => p.status === tab);
  const counts = posts.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedPosts = filtered.slice(startIndex, startIndex + pageSize);

  const previewPost = posts.find((p) => p.id === previewId);

  const handleApprove = (id) => {
    dispatch(approvePost(id));
    setToast("Approved 1 post");
  };
  const handleReject = (id) => {
    dispatch(rejectPost(id));
    setToast("Rejected 1 post");
  };

  // ✅ Batch Approve/Reject with confirmation
  const handleBatchApprove = () => setApproveConfirmOpen(true);
  const handleBatchReject = () => setRejectConfirmOpen(true);

  const confirmApprove = () => {
    paginatedPosts
      .filter((p) => selected.includes(p.id))
      .forEach((p) => dispatch(approvePost(p.id)));
    setToast(`Approved ${selected.length} posts`);
    dispatch(clearSelection());
    setApproveConfirmOpen(false);
  };

  const confirmReject = () => {
    paginatedPosts
      .filter((p) => selected.includes(p.id))
      .forEach((p) => dispatch(rejectPost(p.id)));
    setToast(`Rejected ${selected.length} posts`);
    dispatch(clearSelection());
    setRejectConfirmOpen(false);
  };

  const changeTab = (t) => {
    setTab(t);
    setPage(1);
    dispatch(clearSelection());
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (
        (i === page - delta - 1 && page - delta > 2) ||
        (i === page + delta + 1 && page + delta < totalPages - 1)
      ) {
        pages.push("ellipsis-" + i);
      }
    }
    return pages;
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Tabs active={tab} onChange={changeTab} counts={counts} />

        {tab === "pending" && (
          <Toolbar
            selectedCount={selected.filter((id) =>
              paginatedPosts.some((p) => p.id === id)
            ).length}
            totalCount={paginatedPosts.length}
            allSelected={
              paginatedPosts.length > 0 &&
              paginatedPosts.every((p) => selected.includes(p.id))
            }
            onSelectAll={(checked) => {
              if (checked) {
                const ids = paginatedPosts.map((p) => p.id);
                ids.forEach((id) => {
                  if (!selected.includes(id)) dispatch(toggleSelect(id));
                });
              } else {
                paginatedPosts.forEach((p) => {
                  if (selected.includes(p.id)) dispatch(toggleSelect(p.id));
                });
              }
            }}
            onApproveSelected={handleBatchApprove}
            onRejectSelected={handleBatchReject}
            onClearSelection={() => dispatch(clearSelection())}
          />
        )}

        <PostList
          posts={paginatedPosts}
          tab={tab}
          onApprove={handleApprove}
          onReject={handleReject}
          onOpenPreview={(id) => dispatch(openPreview(id))}
          onToggle={(id) => dispatch(toggleSelect(id))}
          selected={selected}
        />

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            {getPageNumbers().map((pg) =>
              typeof pg === "string" ? (
                <span key={pg} className="ellipsis">…</span>
              ) : (
                <button
                  key={pg}
                  className={page === pg ? "active" : ""}
                  onClick={() => setPage(pg)}
                >
                  {pg}
                </button>
              )
            )}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <PreviewModal post={previewPost} onClose={() => dispatch(closePreview())} />

      {/* ✅ Confirmation Dialogs */}
      <ConfirmDialog
        open={rejectConfirmOpen}
        count={selected.length}
        message="Are you sure you want to reject {count} posts?"
        onConfirm={confirmReject}
        onCancel={() => setRejectConfirmOpen(false)}
      />
      <ConfirmDialog
        open={approveConfirmOpen}
        count={selected.length}
        message="Are you sure you want to approve {count} posts?"
        onConfirm={confirmApprove}
        onCancel={() => setApproveConfirmOpen(false)}
      />

      <Toast message={toast} onUndo={null} onClose={() => setToast(null)} />
    </div>
  );
}
