import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slices/counterSlice";

const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
};
export default store;
