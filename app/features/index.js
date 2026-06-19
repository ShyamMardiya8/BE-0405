import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../src/utility/apiClient";

const services = {
  loginUser: createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        return response;
      } catch (error) {
        return rejectWithValue(error.message || "Login failed");
      }
    },
  ),

  registerUser: createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(userData),
        });

        return response;
      } catch (error) {
        return rejectWithValue(error.message || "Registration failed");
      }
    },
  ),

  fetchClients: createAsyncThunk(
    "client/fetchClients",
    async (_, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/client/read");
        return response; // ResponseHandler payload: { data: [...] }
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch clients");
      }
    },
  ),
  createClient: createAsyncThunk(
    "client/createClient",
    async (clientData, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/client/create", {
          method: "POST",
          body: JSON.stringify(clientData),
        });
        return response;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to create client");
      }
    },
  ),
  updateClient: createAsyncThunk(
    "client/updateClient",
    async ({ clientId, clientData }, { rejectWithValue }) => {
      try {
        const response = await apiFetch(`/api/client/update?id=${clientId}`, {
          method: "PUT",
          body: JSON.stringify(clientData),
        });
        return response;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to update client");
      }
    },
  ),
  deleteClient: createAsyncThunk(
    "client/deleteClient",
    async (clientId, { rejectWithValue }) => {
      try {
        const response = await apiFetch(`/api/client/delete?id=${clientId}`, {
          method: "DELETE",
        });
        return { clientId, response }; // Return deleted ID so it can be filtered out
      } catch (error) {
        return rejectWithValue(error.message || "Failed to delete client");
      }
    },
  ),
  fetchForms: createAsyncThunk(
    "form/fetchForms",
    async (_, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/form/read");
        return response; // ResponseHandler payload: { data: [...] }
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch forms");
      }
    },
  ),
  createForm: createAsyncThunk(
    "form/createForm",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/form/create", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        return response;
      } catch (error) {
        return rejectWithValue(
          error.message || "Failed to create form template",
        );
      }
    },
  ),
  updateForm: createAsyncThunk(
    "form/updateForm",
    async ({ formId, formData }, { rejectWithValue }) => {
      try {
        const response = await apiFetch(`/api/form/update?id=${formId}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        return response;
      } catch (error) {
        return rejectWithValue(
          error.message || "Failed to update form template",
        );
      }
    },
  ),
  deleteForm: createAsyncThunk(
    "form/deleteForm",
    async (formId, { rejectWithValue }) => {
      try {
        const response = await apiFetch(`/api/form/delete?id=${formId}`, {
          method: "DELETE",
        });
        return { formId, response };
      } catch (error) {
        return rejectWithValue(
          error.message || "Failed to delete form template",
        );
      }
    },
  ),
  fetchStaff: createAsyncThunk(
    "staff/fetchStaff",
    async (_, { rejectWithValue }) => {
      try {
        // API endpoint as requested
        const response = await apiFetch("/api/staff/read");
        return response; // ResponseHandler payload: { message, status, data, success }
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch staff data");
      }
    },
  ),
  fetchView: createAsyncThunk(
    "view/fetchView",
    async (formId, { rejectWithValue }) => {
      try {
        const response = await apiFetch(`/api/view/read?id=${formId}`);
        return response; // ResponseHandler payload: { data: {...} }
      } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch form view");
      }
    },
  ),
  submitView: createAsyncThunk(
    "view/submitView",
    async (submissionData, { rejectWithValue }) => {
      try {
        const response = await apiFetch("/api/view/create", {
          method: "POST",
          body: JSON.stringify(submissionData),
        });
        return response;
      } catch (error) {
        return rejectWithValue(error.message || "Failed to submit form");
      }
    },
  ),
};

export default services;
