import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setLogin: (state, action) => {},
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
