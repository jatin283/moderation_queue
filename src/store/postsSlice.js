import { createSlice } from "@reduxjs/toolkit";
import mockData from "../mockData";

const postsSlice = createSlice({
  name: "posts",
  initialState: { data: mockData },
  reducers: {
    approvePost(state, action) {
      const p = state.data.find((x) => x.id === action.payload);
      if (p) p.status = "approved";
    },
    rejectPost(state, action) {
      const p = state.data.find((x) => x.id === action.payload);
      if (p) p.status = "rejected";
    },
  },
});

export const { approvePost, rejectPost } = postsSlice.actions;
export default postsSlice.reducer;
