import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/api/auth/register",

  async (formData) => {
    const response = await api.post(
      "/api/auth/register",
      formData
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/api/auth/login",

  async (formData) => {
    const response = await api.post(
      "/api/auth/login",
      formData
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/api/auth/logout",

  async () => {
    const response = await api.post(
      "/api/auth/logout",
      {}
    );

    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "/api/auth/forgot-password",

  async (formData) => {
    const response = await api.post(
      "/api/auth/forgot-password",
      formData
    );

    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "/api/auth/reset-password",

  async (data) => {
    const response = await api.post(
      "/api/auth/reset-password",
      data
    );

    return response.data;
  }
);

export const verifyEmail = createAsyncThunk(
  "/api/auth/verify-email",

  async (token) => {
    const response = await api.get(
      `/api/auth/verify-email?token=${token}`
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/api/auth/checkauth",

  async () => {
    const response = await api.get(
      "/api/auth/check-auth",
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? null : null;
        state.isAuthenticated = false; // Registration doesn't auto-login
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
