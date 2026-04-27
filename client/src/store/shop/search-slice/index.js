import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword) => {
    try {
      const response = await api.get(`/shop/search/${encodeURIComponent(keyword)}`);
      return response.data;
    } catch (error) {
      console.error("Search API error:", error);
      // Return empty results on error
      return { 
        success: false, 
        data: [],
        message: error?.response?.data?.message || "Search failed"
      };
    }
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle both success and error responses
        if (action.payload.success) {
          state.searchResults = action.payload.data || [];
        } else {
          state.searchResults = [];
        }
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
