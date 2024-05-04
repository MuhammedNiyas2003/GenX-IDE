import { createSlice } from "@reduxjs/toolkit";

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    allPosts: null,
    userPosts: null,
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
  },
});

export const { setAllPosts, setUserPosts } = exploreSlice.actions;
export default exploreSlice.reducer;
