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
    setLogout: (state, action) => {
      state.token = "";
      state.loggedIn = false;
    },
  },
});

export const { setAccessToken, setLogout } = spotifySlice.actions;
export default spotifySlice.reducer;
