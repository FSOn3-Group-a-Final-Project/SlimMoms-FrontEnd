import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthConfig } from '../auth/operations';
import { refreshUser   } from '../auth/operations';

const API_URL = import.meta.env.VITE_API_URL;

export const addProductToDiary = createAsyncThunk(
  'diary/addProduct',
  async ({ productId, weight, date }, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log("Token:", token);
      const response = await axios.post(
        `${API_URL}/products`,
        { productId, weight, date },
        getAuthConfig(token)
        
      );
      dispatch(refreshUser());
      console.log(response.data)
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
        getAuthConfig(token)
      );
     const response = await axios.get(
        `${API_URL}/products/diary/${date}`,
        getAuthConfig(token)
      );
      return { date, products: response.data.products };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Silme hatası');
    }
  }
);


export const fetchDiaryProductsByDate = createAsyncThunk(
  'diary/fetchByDate',
  async (date, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${API_URL}/products/diary/${date}`,
        getAuthConfig(token)
      );
      return response.data; // Günün ürünleri
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Liste çekilemedi');
    }
  }
);