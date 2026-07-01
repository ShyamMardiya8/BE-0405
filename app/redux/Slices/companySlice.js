import { createSlice } from "@reduxjs/toolkit";
import services from "../../features/index";

const initialState = {
  companyDetails: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompanyError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(services.fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.companyDetails = action.payload.data;
        }
      })
      .addCase(services.fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCompanyError } = companySlice.actions;
export default companySlice.reducer;
