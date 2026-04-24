import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";

const initialState = {
  isLoading: false,
  blogList: [],
  blogDetails: null,
};

export const createNewBlog = createAsyncThunk(
  "/blog/createNewBlog",
  async (formData) => {
    const result = await api.post("/shop/blog/create", formData);
    return result?.data;
  }
);

export const fetchAllBlogs = createAsyncThunk(
  "/blog/fetchAllBlogs",
  async () => {
    const result = await api.get("/shop/blog/get");
    return result?.data;
  }
);

export const fetchBlogDetails = createAsyncThunk(
  "/blog/fetchBlogDetails",
  async (id) => {
    const result = await api.get(`/shop/blog/get/${id}`);
    return result?.data;
  }
);

export const likeBlog = createAsyncThunk(
  "/blog/likeBlog",
  async ({ id, userId }) => {
    const result = await api.post(`/shop/blog/like/${id}`, { userId });
    return result?.data;
  }
);

const shoppingBlogSlice = createSlice({
  name: "shoppingBlog",
  initialState,
  reducers: {
    setBlogDetails: (state) => {
      state.blogDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogList = action.payload.data;
      })
      .addCase(fetchAllBlogs.rejected, (state) => {
        state.isLoading = false;
        state.blogList = [];
      })
      .addCase(fetchBlogDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogDetails = action.payload.data;
      })
      .addCase(fetchBlogDetails.rejected, (state) => {
        state.isLoading = false;
        state.blogDetails = null;
      });
  },
});

export const { setBlogDetails } = shoppingBlogSlice.actions;

export default shoppingBlogSlice.reducer;
