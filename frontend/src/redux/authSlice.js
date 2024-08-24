import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    userProfile: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: (state) => {
      state.accessToken = null;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    logoutAction: (state) => {
      state.accessToken = null;
      state.userProfile = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const {
  setAccessToken,
  setUserProfile,
  removeAccessToken,
  logoutAction,
} = authSlice.actions;
export default authSlice.reducer;
