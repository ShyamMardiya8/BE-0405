import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slices/counterSlice";
import staffReducer from "../Slices/staffSlice";
import authReducer from "../Slices/authSlice";
import clientReducer from "../Slices/clientSlice";
import formReducer from "../Slices/formSlice";
import viewReducer from "../Slices/viewSlice";
import companyReducer from "../Slices/companySlice";

const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      staff: staffReducer,
      auth: authReducer,
      client: clientReducer,
      form: formReducer,
      view: viewReducer,
      company: companyReducer,
    },
  });
};
export default store;
