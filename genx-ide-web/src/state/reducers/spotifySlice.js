import { createSlice } from "@reduxjs/toolkit";

const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    token: null,
    loggedIn: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.token = action.payload.token;
      state.loggedIn = true;
    },
  },
});

export const { setAccessToken } = spotifySlice.actions;
export default spotifySlice.reducer;
