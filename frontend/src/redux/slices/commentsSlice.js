import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async () => {
    const response = await axios.get("/comments");
    return response.data;
  }
);

export const fetchPostComments = createAsyncThunk(
  "comments/fetchPostComments",
  async (id) => {
    const response = await axios.get(`/comments/${id}`);
    return response.data;
  }
);

export const fetchSendComment = createAsyncThunk(
  "comments/fetchSendComment",
  async (params) => {
    const response = await axios.post(`/comments/${params.id}`, params.body);
    return response.data;
  }
);

const initialState = {
  items: [],
  currentItem: [],
  status: "loading",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // Get all comments
    [fetchAllComments.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchAllComments.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchAllComments.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
    // Get comments for a specified post
    [fetchPostComments.pending]: (state) => {
      // state.currentItem = [];
      state.status = "loading";
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.currentItem = action.payload;
      state.status = "loaded";
    },
    [fetchPostComments.rejected]: (state) => {
      state.currentItem = [];
      state.status = "error";
    },
    // Post comment for a specified post
    [fetchSendComment.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSendComment.fulfilled]: (state, action) => {
      state.status = "loaded";
    },
    [fetchSendComment.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const fetchCommentsLoading = (state) =>
  Boolean(state.status !== "loaded");

export default commentsSlice.reducer;
