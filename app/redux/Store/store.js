import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slices/counterSlice";
import staffReducer from "../Slices/staffSlice";
import authReducer from "../Slices/authSlice";
import clientReducer from "../Slices/clientSlice";
import formReducer from "../Slices/formSlice";
import viewReducer from "../Slices/viewSlice";

const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      staff: staffReducer,
      auth: authReducer,
      client: clientReducer,
      form: formReducer,
      view: viewReducer,
    },
  });
};
export default store;
