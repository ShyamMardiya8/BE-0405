import { createSlice } from "@reduxjs/toolkit";
import services from "../../features/index";
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(services.loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          const { user, token } = action.payload.data;
          state.user = user;
          state.token = token;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            if (action.payload.data.refreshToken) {
              localStorage.setItem(
                "refreshToken",
                action.payload.data.refreshToken,
              );
            }
          }
        }
      })
      .addCase(services.loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Register
      .addCase(services.registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(services.registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
