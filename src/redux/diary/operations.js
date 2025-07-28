import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const getAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addProductToDiary = createAsyncThunk(
  'diary/addProduct',
  async ({ productId, weight, date }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/products`,
        { productId, weight, date },
        getAuthHeader(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Sunucu hatası');
    }
  }
);


export const deleteProductFromDiary = createAsyncThunk(
  'diary/deleteProduct',
  async ({ date, productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(
        `${API_URL}/products/diary/${date}/${productId}`,
        getAuthHeader(token)
      );
      return { date, productId };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Silme hatası');
    }
  }
);
