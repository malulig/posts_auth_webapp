import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBase } from "../../config/axiosBase";
import { IPost } from "../../interfaces/IPost";

export const getPosts = createAsyncThunk("posts/getposts", async () => {
  const { data } = await axiosBase.get("/posts");
  return data;
});

export const getPostById = createAsyncThunk<IPost, number, { state: any }>(
  "posts/getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosBase.get<IPost>(`/posts/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
