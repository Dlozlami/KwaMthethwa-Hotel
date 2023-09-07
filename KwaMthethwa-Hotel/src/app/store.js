import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import bookingsReducer from "../features/bookingsSlice";
import receiptReducer from "../features/receiptSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    bookings: bookingsReducer,
    receipt: receiptReducer,
  },
});
