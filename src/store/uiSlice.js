import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    selected: [],
    previewId: null,
  },
  reducers: {
    toggleSelect(state, action) {
      const id = action.payload;
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter((x) => x !== id);
      } else {
        state.selected.push(id);
      }
    },
    clearSelection(state) {
      state.selected = [];
    },
    openPreview(state, action) {
      state.previewId = action.payload;
    },
    closePreview(state) {
      state.previewId = null;
    },
  },
});

export const { toggleSelect, clearSelection, openPreview, closePreview } =
  uiSlice.actions;
export default uiSlice.reducer;
