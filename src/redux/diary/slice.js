import { createSlice } from "@reduxjs/toolkit";
import { fetchDiaryProductsByDate } from "./operations";
import { deleteProductFromDiary } from "./operations";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    selectedDate: new Date().toISOString().split("T")[0], // Bugünün tarihi yyyy-mm-dd
    products: {},
    loading: false,
    userDailyInfo: {
      dailyRate: 0,
      notRecommended: [],
    },
  },
  reducers: {
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
      });
  },
});

export const { setSelectedDate, setUserDailyInfo } = diarySlice.actions;
export default diarySlice.reducer;
