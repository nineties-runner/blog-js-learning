import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const response = await axios.post("/auth/login", params);
  return response.data;
});

export const fetchAuthRegister = createAsyncThunk(
  "auth/fetchAuthRegister",
  async (params) => {
    const response = await axios.post("/auth/register", params);
    return response.data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const response = await axios.get("/auth/me");
  return response.data;
});

const initialState = {
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: {
    // Login user
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
      console.log(action.payload);
      window.localStorage.setItem("token", action.payload.token);
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    // Register user
    [fetchAuthRegister.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchAuthRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
      window.localStorage.setItem("token", action.payload.token);
    },
    [fetchAuthRegister.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
    // Fetch user from token
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.user = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.user = null;
    },
  },
});

export const authSelector = (state) => Boolean(state.auth.user);

export default authSlice.reducer;

export const { logout } = authSlice.actions;
