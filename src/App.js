// src/App.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import Toolbar from "./components/Toolbar";
import PostList from "./components/PostList";
import PreviewModal from "./components/PreviewModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Toast from "./components/Toast";
import { approvePost, rejectPost, revertChanges } from "./store/postsSlice";
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
  const [approveConfirmOpen, setApproveConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // store last action as { changes: [ {id, prevStatus}, ... ] }
  const [lastAction, setLastAction] = useState(null);

  // Search & sort
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // --- filter & sort ---
  let filtered = posts.filter((p) => p.status === tab);

  if (search.trim() !== "") {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.author.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  filtered = filtered.sort((a, b) => {
    const dateA = new Date(a.reportedAt);
    const dateB = new Date(b.reportedAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const counts = posts.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedPosts = filtered.slice(startIndex, startIndex + pageSize);

  const previewPost = posts.find((p) => p.id === previewId);

  // --- Single actions (capture prev status before changing) ---
  const handleApprove = (id) => {
    const post = posts.find((p) => p.id === id);
    const prevStatus = post ? post.status : null;
    // apply change
    dispatch(approvePost(id));
    // record for undo
    setLastAction({ changes: [{ id, prevStatus }] });
    setToast("Approved 1 post");
  };

  const handleReject = (id) => {
    const post = posts.find((p) => p.id === id);
    const prevStatus = post ? post.status : null;
    dispatch(rejectPost(id));
    setLastAction({ changes: [{ id, prevStatus }] });
    setToast("Rejected 1 post");
  };

  // --- Batch actions: open confirmation first ---
  const handleBatchApprove = () => setApproveConfirmOpen(true);
  const handleBatchReject = () => setRejectConfirmOpen(true);

  const confirmApprove = () => {
    // capture previous statuses for all affected posts on current page
    const affected = paginatedPosts.filter((p) => selected.includes(p.id));
    const changes = affected.map((p) => ({ id: p.id, prevStatus: p.status }));
    // apply
    changes.forEach((c) => dispatch(approvePost(c.id)));
    // set undo payload
    setLastAction({ changes });
    setToast(`Approved ${changes.length} posts`);
    dispatch(clearSelection());
    setApproveConfirmOpen(false);
  };

  const confirmReject = () => {
    const affected = paginatedPosts.filter((p) => selected.includes(p.id));
    const changes = affected.map((p) => ({ id: p.id, prevStatus: p.status }));
    changes.forEach((c) => dispatch(rejectPost(c.id)));
    setLastAction({ changes });
    setToast(`Rejected ${changes.length} posts`);
    dispatch(clearSelection());
    setRejectConfirmOpen(false);
  };

  // --- Undo: revert to recorded prevStatus ---
  const handleUndo = () => {
    if (!lastAction || !Array.isArray(lastAction.changes) || lastAction.changes.length === 0) {
      setToast("Nothing to undo");
      return;
    }
    dispatch(revertChanges(lastAction.changes));
    setToast("Undo successful");
    setLastAction(null);
  };

  const changeTab = (t) => {
    setTab(t);
    setPage(1);
    dispatch(clearSelection());
  };

  // smart pagination helper (unused change)
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

  // keyboard: only keep Escape behavior (close preview)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") dispatch(closePreview());
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <Tabs active={tab} onChange={changeTab} counts={counts} />

        {/* Search + Sort */}
        <div className="search-sort">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

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

      <Toast message={toast} onUndo={handleUndo} onClose={() => setToast(null)} />
    </div>
  );
}
