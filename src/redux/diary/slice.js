import { createSlice } from "@reduxjs/toolkit";
import { fetchDiaryProductsByDate } from "./operations";
import { deleteProductFromDiary } from "./operations";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    selectedDate: new Date().toISOString().split("T")[0], // Bugünün tarihi yyyy-mm-dd
    products: {},
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryProductsByDate.fulfilled, (state, action) => {
        // API'den gelen ürünler dizisini, seçili tarihe kaydet
        state.products[state.selectedDate] = action.payload;
      })
      .addCase(deleteProductFromDiary.fulfilled, (state, action) => {
        const { date, productId } = action.payload;
        if (state.products[date]) {
          state.products[date] = state.products[date].filter(
            (product) => (product._id || product.id) !== productId
          );
        }
      });
  },
});

export const { setSelectedDate } = diarySlice.actions;
export default diarySlice.reducer;
