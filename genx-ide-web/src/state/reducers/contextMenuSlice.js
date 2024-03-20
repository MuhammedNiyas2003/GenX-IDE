import { createSlice } from "@reduxjs/toolkit";

const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState: {
    x: null,
    y: null,
    isVisible: false,
    selectedItem: null,
  },
  reducers: {
    setPoints: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.selectedItem = action.payload.item;
      state.isVisible = true;
    },
    closeContext: (state, action) => {
      state.isVisible = false;
      state.selectedItem = null;
    },
  },
});

export const { setPoints, closeContext } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
