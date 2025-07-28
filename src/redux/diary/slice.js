import { createSlice } from "@reduxjs/toolkit";
import { fetchDiaryProductsByDate } from "./operations";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    selectedDate: new Date().toISOString().split("T")[0], // Bugünün tarihi yyyy-mm-dd
    products: { },
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDiaryProductsByDate.fulfilled, (state, action) => {
      // API'den gelen ürünler dizisini, seçili tarihe kaydet
      state.products[state.selectedDate] = action.payload;
    });
  },
});

export const { setSelectedDate } = diarySlice.actions;
export default diarySlice.reducer;
