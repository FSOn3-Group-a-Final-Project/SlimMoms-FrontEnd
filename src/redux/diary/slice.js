import { createSlice } from '@reduxjs/toolkit';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    selectedDate: new Date().toISOString().split('T')[0], // Bugünün tarihi yyyy-mm-dd
    products: [],
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    // diğer reducer'lar varsa onlar da burada
  },
  // extraReducers varsa buraya eklenir
});

export const { setSelectedDate } = diarySlice.actions;
export default diarySlice.reducer;