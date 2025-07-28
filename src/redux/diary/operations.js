import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthHeader } from '../auth/operations';
import { loginUser   } from '../auth/operations';

const API_URL = import.meta.env.VITE_API_URL;


export const addProductToDiary = createAsyncThunk(
  'diary/addProduct',
  async ({ productId, weight, date }, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/products`,
        { productId, weight, date },
        setAuthHeader(token)
        
      );
      dispatch(loginUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Sunucu hatası');
    }
  }
);

// export const addProductToDiary = createAsyncThunk('diary/addProduct', async ({ productId, weight, date }, thunkApi) => {
//     try {
//         const response  = await axios.post(
//         `${API_URL}/products`,
//         { productId, weight, date },
       
//       );
//       thunkApi.dispatch(loginUser());
//       return response.data;
//     } catch (error) {
//         return thunkApi.rejectWithValue(error.message);
//     }
// });


export const deleteProductFromDiary = createAsyncThunk(
  'diary/deleteProduct',
  async ({ date, productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(
        `${API_URL}/products/diary/${date}/${productId}`,
        setAuthHeader(token)
      );
      return { date, productId };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Silme hatası');
    }
  }
);
