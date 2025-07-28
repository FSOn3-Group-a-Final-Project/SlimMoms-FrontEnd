import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken; // API'den gelen token
        state.user = action.payload.user || { name: null, email: null };
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { logIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
