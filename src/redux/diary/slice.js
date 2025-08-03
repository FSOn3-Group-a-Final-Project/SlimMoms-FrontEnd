import { createSlice } from "@reduxjs/toolkit";
import { fetchDiaryProductsByDate } from "./operations";
import { deleteProductFromDiary } from "./operations";
import { calculateCalories } from "./operations";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    selectedDate: new Date().toISOString().split("T")[0], // Bugünün tarihi yyyy-mm-dd
    products: {},
    loading: false,

    calorieResult: {
      // kan grubu diyet için
      calories: null,
      forbiddenProducts: [],

    },
  },
  reducers: {
    setCalorieResult: (state, action) => {
      const { calories, forbiddenProducts } = action.payload;
      state.calorieResult.calories = calories;
      state.calorieResult.forbiddenProducts = forbiddenProducts;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setUserDailyInfo: (state, action) => {
      state.userDailyInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryProductsByDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiaryProductsByDate.fulfilled, (state, action) => {
        state.products[state.selectedDate] = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiaryProductsByDate.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProductFromDiary.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductFromDiary.fulfilled, (state, action) => {
        const entry = action.payload;
        state.loading = false;
        if (entry && entry.date && Array.isArray(entry.products)) {
          state.products[entry.date] = { products: entry.products };
        } else if (entry && entry.date) {
          state.products[entry.date] = { products: [] };
        }
      })
      .addCase(deleteProductFromDiary.rejected, (state) => {
        state.loading = false;
      })
      //state.diary.calorieResult altında kalori ve yasaklı ürünlere erişmek için
      .addCase(calculateCalories.fulfilled, (state, action) => {
        state.calorieResult.forbiddenProducts = action.payload;
        // state.calorieResult.calories = action.payload.calories;
        // state.calorieResult.forbiddenProducts=action.payload.forbiddenProducts;
      });
  },
});

export const { setSelectedDate, setCalorieResult, setUserDailyInfo } = diarySlice.actions;

export default diarySlice.reducer;
