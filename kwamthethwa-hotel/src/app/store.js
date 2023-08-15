import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "../features/deviceSlice";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    login: loginReducer,
    register: registerReducer,
  },
});
