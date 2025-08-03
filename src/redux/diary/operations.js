import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthConfig } from "../auth/operations";
import { refreshUser } from "../auth/operations";

const API_URL = import.meta.env.VITE_API_URL;

export const addProductToDiary = createAsyncThunk(
  "diary/addProduct",
  async (
    { productId, weight, date },
    { getState, dispatch, rejectWithValue }
  ) => {
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
      return rejectWithValue(error.response?.data || "Sunucu hatası");
    }
  }
);

export const deleteProductFromDiary = createAsyncThunk(
  "diary/deleteProduct",
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
      return rejectWithValue(error.response?.data || "Silme hatası");
    }
  }
);

export const fetchDiaryProductsByDate = createAsyncThunk(
  "diary/fetchByDate",
  async (date, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${API_URL}/products/diary/${date}`,
        getAuthConfig(token)
      );
      return response.data; // Günün ürünleri
    } catch (error) {
      return rejectWithValue(error.response?.data || "Liste çekilemedi");
    }
  }
);

// dinamik oalrak kan grubu yasaklı liste çekmek için calori veri çekme fonksiyonu

// redux/diary/operations.js

export const calculateCalories = createAsyncThunk(
  "diary/calculateCalories",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const bloodType = Number(formData.bloodType);

      // ① URL’i elle oluşturup konsola basıyoruz
      const url = `${import.meta.env.VITE_API_URL}/products?bloodType=${bloodType}`;
      console.log("🐛 API ÇAĞRISI:", url);

      // ② Bu URL’e gidiyoruz
      const response = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      // ③ Dönen veriyi de kontrol edelim
      console.log("🐛 API CEVAP:", response.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// export const calculateCalories = createAsyncThunk(
//   "diary/calculateCalories",
//   async (formData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.token;

//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products`,
//         {
//           //  bloodType değerini Number() ile sayıya dönüştürdük. Böylece backend filtresi sağlıklı çalışır.
//           params: { bloodType: Number(formData.bloodType) },

//           //  Token varsa Authorization header'ı ekleniyor. Yoksa boş obje gönderiliyor.
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         }
//       );

//       //  Gözlem için gelen form verisi ve API yanıtı loglandı
//       console.log(" Thunk'a gelen formData:", formData);
//       console.log(" API RESPONSE DATA:", response.data);

//       return response.data.data;
//     } catch (error) {
//       //  Hata durumunda mesaj dönülüyor
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );






// export const calculateCalories = createAsyncThunk(
//   "diary/calculateCalories",
//   async (formData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.token;

//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products`,
//         {
//           params: { bloodType: formData.bloodType },
//           headers: token ? { Authorization: `Bearer ${token}` } : {}, // token yoksa boş header gönder
//         }
//       );
//       console.log("💉 Thunk'a gelen formData:", formData);
//       console.log("API RESPONSE DATA:", response.data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );

// 'diary/calculateCalories',
// async (formData,{rejectWithValue}) => {
//   try {
//     const response = await axios.post(`${API_URL}/calculate`,formData); // burayı tekrar kontrol edeceğim.S
//     console.log(response); // TEST için ekledim
//     return response.data; // içinde yasakalı ürün gelecek
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Hesaplama hatası');
//   }
// }
