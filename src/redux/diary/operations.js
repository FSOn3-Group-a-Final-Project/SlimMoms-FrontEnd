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



export const deleteProductFromDiary = createAsyncThunk(
  "diary/deleteProduct",
  async ({ date, productId }, thunkAPI) => {
    try {
      await axios.delete(`/products/diary/${date}/${productId}`);
      return { date, productId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);