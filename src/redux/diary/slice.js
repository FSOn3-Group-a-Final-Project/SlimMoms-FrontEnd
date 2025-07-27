import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    selectedDate: new Date().toISOString().split("T")[0], // Bugünün tarihi yyyy-mm-dd
    products: {
      "2025-07-27": [
        { id: "1", title: "Elma", weight: 150 },
        { id: "2", title: "Peynir", weight: 200 },
      ],
    },
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = diarySlice.actions;
export default diarySlice.reducer;
