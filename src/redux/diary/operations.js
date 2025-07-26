import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addProductToDiary = createAsyncThunk(
  'diary/addProduct',
  async ({ productId, weight, date }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/products', {
        productId,
        weight,
        date, 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'Sunucu hatası');
    }
  }
);
