import { configureStore } from "@reduxjs/toolkit";
import posts from "./postsSlice";
import ui from "./uiSlice";

export default configureStore({
  reducer: { posts, ui },
});
