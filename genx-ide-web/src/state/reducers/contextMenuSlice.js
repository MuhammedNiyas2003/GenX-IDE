import { createSlice } from "@reduxjs/toolkit";

const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState: {
    x: null,
    y: null,
    isVisible: false,
  },
  reducers: {
    setPoints: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.isVisible = true;
    },
    closeContext: (state, action) => {
      state.isVisible = false;
    },
  },
});

export const { setPoints, closeContext } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
