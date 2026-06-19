import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../../features/index";

const initialState = {
  forms: [],
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    clearFormError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Forms
      .addCase(services.fetchForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.fetchForms.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.forms = action.payload.data;
        }
      })
      .addCase(services.fetchForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Create Form
      .addCase(services.createForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.createForm.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.forms.push(action.payload.data);
        }
      })
      .addCase(services.createForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Form
      .addCase(services.updateForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.updateForm.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          const updatedForm = action.payload.data;
          const index = state.forms.findIndex((f) => f._id === updatedForm._id);
          if (index !== -1) {
            state.forms[index] = updatedForm;
          }
        }
      })
      .addCase(services.updateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Form
      .addCase(services.deleteForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.deleteForm.fulfilled, (state, action) => {
        state.loading = false;
        const { formId } = action.payload;
        state.forms = state.forms.filter((f) => f._id !== formId);
      })
      .addCase(services.deleteForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearFormError } = formSlice.actions;
export default formSlice.reducer;
