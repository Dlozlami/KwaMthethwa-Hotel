import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount_programme: "",
  discount_rate: 0,
  currency: 1,
  currencySymbol: "R",
  bookingsCart: [],
  total: 0,
  subtotal: 0,
  VAT: 0.15,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setCurrency(state, action) {
      // If ZAR set currency and symbol
    },
    addBookingToCart(state, action) {
      // Receive booking objects via action.payload and push them onto bookingsCart
      state.bookingsCart.push(action.payload);
    },
  },
});

export const { setCurrency, addBookingToCart } = bookingsSlice.actions;

export default bookingsSlice.reducer;
