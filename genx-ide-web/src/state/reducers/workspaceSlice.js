import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    currentCode: null,
  },
  reducers: {
    setCurrentCode: (state, action) => {
      state.currentCode = action.payload;
    },
  },
});

export const { setCurrentCode } = workspaceSlice.actions;
export default workspaceSlice.reducer;
