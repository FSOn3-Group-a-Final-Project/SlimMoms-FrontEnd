import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshUser, registerUser, logoutUser } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isRefreshing = false;
  state.error = action.payload || action.error?.message;
};
const savedToken = localStorage.getItem("token");
const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: savedUser || { name: null, email: null },
  token: savedToken || null,
  isLoggedIn: !!savedToken,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;

        state.user = {
          name: user?.name || null,
          email: user?.email || null,
        };

        state.token = accessToken || null;
        state.isLoggedIn = !!accessToken;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.user = { name: user.name, email: user.email };
        state.token = accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, handleRejected)

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      // Kan grubu çekmek için değişiklik. orjinal hali en altta mevcut
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        localStorage.setItem("user", JSON.stringify(action.payload));

      })
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export default authSlice.reducer;