import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "../features/deviceSlice";

export const store = configureStore({
  reducer: { device: deviceReducer },
});
