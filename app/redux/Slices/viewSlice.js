import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../src/utility/apiClient";
import services from "../../features/index";
// Async Thunk: Fetch form configuration or submission info

const initialState = {
  currentView: null,
  loading: false,
  error: null,
  success: false,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    clearViewState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch View
      .addCase(services.fetchView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.fetchView.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.currentView = action.payload.data;
        }
      })
      .addCase(services.fetchView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Submit View Response
      .addCase(services.submitView.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(services.submitView.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(services.submitView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const { clearViewState } = viewSlice.actions;
export default viewSlice.reducer;
