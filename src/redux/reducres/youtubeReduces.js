import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularList: {},
  player: {},
};

const counterSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    getPopularList(state, action) {
      state.popularList = action.payload.popularList;
      state.player = action.payload.player;
    },
    getPlayer(state, action) {
      state.player = action.payload.player;
    },
  },
});

export const youtubeActions = counterSlice.actions;
export default counterSlice.reducer;
