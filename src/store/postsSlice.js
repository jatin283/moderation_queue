// src/store/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import mockData from "../mockData";

const loadSaved = () => {
  try {
    const raw = localStorage.getItem("mq_posts");
    return raw ? JSON.parse(raw) : mockData;
  } catch (e) {
    return mockData;
  }
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: loadSaved(),
    status: "idle",
    error: null,
  },
  reducers: {
    approvePost(state, action) {
      const id = action.payload;
      const p = state.data.find((x) => x.id === id);
      if (p) p.status = "approved";
    },
    rejectPost(state, action) {
      const id = action.payload;
      const p = state.data.find((x) => x.id === id);
      if (p) p.status = "rejected";
    },
    // Revert multiple posts to their previous statuses.
    // payload: [{ id, prevStatus }, ...]
    revertChanges(state, action) {
      const changes = action.payload || [];
      changes.forEach((c) => {
        const p = state.data.find((x) => x.id === c.id);
        if (p && c.prevStatus !== undefined) p.status = c.prevStatus;
      });
    },
    addPost(state, action) {
      state.data.unshift(action.payload);
    },
  },
});

export const { approvePost, rejectPost, revertChanges, addPost } = postsSlice.actions;
export default postsSlice.reducer;
