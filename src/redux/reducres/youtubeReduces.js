import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularList: {},
};

const counterSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    getPopularList(state, action) {
      state.popularList = action.payload.popularList;
    },
  },
});
export const youtubeActions = counterSlice.actions;
export default counterSlice.reducer;
