import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../../features/index";
const initialState = {
  clients: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clearClientError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clients
      .addCase(services.fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.clients = action.payload.data;
        }
      })
      .addCase(services.fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Create Client
      .addCase(services.createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.createClient.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.clients.push(action.payload.data);
        }
      })
      .addCase(services.createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Client
      .addCase(services.updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.updateClient.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          const updatedClient = action.payload.data;
          const index = state.clients.findIndex(
            (c) => c._id === updatedClient._id,
          );
          if (index !== -1) {
            state.clients[index] = updatedClient;
          }
        }
      })
      .addCase(services.updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Client
      .addCase(services.deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        const { clientId } = action.payload;
        state.clients = state.clients.filter((c) => c._id !== clientId);
      })
      .addCase(services.deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearClientError } = clientSlice.actions;
export default clientSlice.reducer;
