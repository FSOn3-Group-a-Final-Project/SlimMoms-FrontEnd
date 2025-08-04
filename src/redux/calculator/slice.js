import { createSlice } from "@reduxjs/toolkit";
import { calculateCaloriesAndForbiddenFoods, updateUserData } from "./operations";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    dailyCalories: null,
    forbiddenProducts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateCaloriesAndForbiddenFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        calculateCaloriesAndForbiddenFoods.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.dailyCalories = action.payload.calories;
          state.forbiddenProducts = action.payload.forbiddenProducts;
        }
      )
      .addCase(
        calculateCaloriesAndForbiddenFoods.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
     
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const calculatorReducer = calculatorSlice.reducer;