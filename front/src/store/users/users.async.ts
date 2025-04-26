import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBase } from "../../config/axiosBase";
import { IUser } from "../../interfaces/IUser";

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  return await axiosBase
    .get<IUser | null>("/auth/refreshToken", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data)
    .catch(() => {
      localStorage.setItem("token", "");
    });
});

export const register = createAsyncThunk<IUser | null, { username: string; password: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosBase.post<IUser | null>("/auth/register", payload);
      localStorage.setItem("token", response.data?.accessToken || "");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk<IUser | null, { username: string; password: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosBase.post<IUser | null>("/auth/login", payload);
      localStorage.setItem("token", response.data?.accessToken || "");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
