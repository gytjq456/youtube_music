import { configureStore } from "@reduxjs/toolkit";
import youtubeReduces from "./reducres/youtubeReduces";
const store = configureStore({
  reducer: {
    youtube: youtubeReduces,
  },
});

export default store;
