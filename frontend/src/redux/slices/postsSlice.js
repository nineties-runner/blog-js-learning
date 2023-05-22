import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("/posts");
  return response.data;
});

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id) => {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  }
);

export const fetchRemovePost = createAsyncThunk("posts/remove", async (id) => {
  const response = await axios.remove(`/posts/${id}`);
  return response.data;
});

const initialState = {
  items: [],
  currentItem: null,
  status: "loading",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Get all posts
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
    // Get a post from id
    [fetchSinglePost.pending]: (state) => {
      state.status = "loading";
      state.currentItem = null;
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.currentItem = action.payload;
    },
    [fetchSinglePost.rejected]: (state) => {
      state.status = "error";
      state.currentItem = null;
    },
    // Get a post from id
    [fetchRemovePost.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.status = "loaded";
    },
    [fetchRemovePost.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default postsSlice.reducer;
