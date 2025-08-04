import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

// Kan grubuna göre önerilmeyen ürünler
const notAllowedFoodsByBloodType = {
  A: ["Wheat", "Corn", "Lentils", "Peanuts", "Red meat"],
  B: ["Red meat", "Dairy", "Kidney beans", "Wheat", "Corn"],
  AB: ["Chicken", "Corn", "Wheat", "Tomatoes", "Peanuts"],
  0: ["Red meat", "Kidney beans", "Corn", "Buckwheat", "Sesame seeds"],
};


export const calculateCaloriesAndForbiddenFoods = createAsyncThunk(
  "calculator/calculateCaloriesAndForbiddenFoods",
  async (userData, thunkAPI) => {
    try {
      const bloodType = userData.bloodType; 
      const forbiddenFoods = notAllowedFoodsByBloodType[bloodType] || [];

      return {
        calories: userData.calories, 
        forbiddenProducts: forbiddenFoods, 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateUserData = createAsyncThunk(
  "calculator/updateUserData",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token; 
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      
      const dataToSend = {
        dailyCalories: userData.dailyCalories,
     
        notAllowedFoods: userData.notAllowedFoods, 
      };

     
      const response = await axios.patch(
        `${API_URL}/user`, 
        dataToSend, 
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);