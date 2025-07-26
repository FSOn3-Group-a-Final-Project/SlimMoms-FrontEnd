// test store
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Basit diary slice — sadece selectedDate tutuyor test amaçlı
const diarySlice = createSlice({
  name: 'diary',
  initialState: { selectedDate: new Date().toISOString().slice(0, 10) },
  reducers: {},
});

const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
  },
});

export default store;