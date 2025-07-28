import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful!");
      return response.data;

    } catch (err) {
      if (err.response?.status === 409) {
        return thunkAPI.rejectWithValue("User with this email already exists.");
      }
      return thunkAPI.rejectWithValue(
        err.message || "Registration failed, please try again."
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.data?.accessToken;
      console.log("Token:", token);

      if (!token) {
        toast.error("No token received from API!");
        return thunkAPI.rejectWithValue("Token not found.");
      }

      setAuthHeader(token);
      toast.success("Login is successful!");

      return response.data.data;
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Login failed, please try again.");
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/auth/logout");
      clearAuthHeader();
      toast.success("Logout is successful!");
    } catch (err) {
      toast.error("Logout failed, please try again.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found.");
    }
    setAuthHeader(token);
    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
