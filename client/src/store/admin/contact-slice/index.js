import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";

const initialState = {
  isLoading: false,
  messages: [],
};

export const fetchContactMessages = createAsyncThunk(
  "/admin/contact/fetch",
  async () => {
    const res = await api.get("/admin/contact/get");
    return res.data;
  }
);

export const updateContactMessageStatus = createAsyncThunk(
  "/admin/contact/updateStatus",
  async ({ id, status }) => {
    const res = await api.put(`/admin/contact/status/${id}`, { status });
    return res.data;
  }
);

export const replyToContactMessage = createAsyncThunk(
  "/admin/contact/reply",
  async ({ id, replyMessage }) => {
    const res = await api.post(`/admin/contact/reply/${id}`, { replyMessage });
    return res.data;
  }
);

const adminContactSlice = createSlice({
  name: "adminContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload?.data || [];
      })
      .addCase(fetchContactMessages.rejected, (state) => {
        state.isLoading = false;
        state.messages = [];
      })
      .addCase(updateContactMessageStatus.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated?._id) return;
        const idx = state.messages.findIndex((m) => m._id === updated._id);
        if (idx > -1) state.messages[idx] = updated;
      })
      .addCase(replyToContactMessage.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated?._id) return;
        const idx = state.messages.findIndex((m) => m._id === updated._id);
        if (idx > -1) state.messages[idx] = updated;
      });
  },
});

export default adminContactSlice.reducer;

