import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api";

const initialState = {
  isLoading: false,
  wishlistItems: [],
};

export const addToWishlist = createAsyncThunk(
  "/wishlist/addToWishlist",
  async ({ userId, productId }) => {
    const response = await api.post(
      `/shop/wishlist/add`,
      { userId, productId }
    );

    return response.data;
  }
);

export const fetchWishlistItems = createAsyncThunk(
  "/wishlist/fetchWishlistItems",
  async (userId) => {
    const response = await api.get(
      `/shop/wishlist/${userId}`
    );

    return response.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "/wishlist/removeFromWishlist",
  async ({ userId, productId }) => {
    const response = await api.delete(
      `/shop/wishlist/${userId}/${productId}`
    );

    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload.data || [];
      })
      .addCase(fetchWishlistItems.rejected, (state) => {
        state.isLoading = false;
        state.wishlistItems = [];
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.wishlistItems.push(action.payload.data);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.wishlistItems = state.wishlistItems.filter(
            item => item.productId !== action.payload.productId
          );
        }
      });
  },
});

export default wishlistSlice.reducer;
