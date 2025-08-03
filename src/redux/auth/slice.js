import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshUser, registerUser, logoutUser } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isRefreshing = false;
  state.error = action.payload || action.error.message;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
         console.log("Login olan kullanıcı bilgisi:", user); // Test için ekledim.
        state.user = {
          name: user.name,
          email: user.email,
          bloodType: user.bloodType, // kan grubu eklendi
        };
        state.token = accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, handleRejected)

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      // Kan grubu çekmek için değişiklik. orjinal hali en altta mevcut
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          bloodType: action.payload.bloodType, // Kan grubu
        };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export default authSlice.reducer;

// .addCase(refreshUser.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//       state.isRefreshing = false;
//     })
