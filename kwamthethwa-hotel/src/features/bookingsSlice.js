import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount_programme: "",
  discount_rate: 0,
  currency: 1,
  currencySymbol: "R",
  bookingCart: [],
  total: 0,
  subtotal: 0,
  VAT: 0.15,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setCurrency(state, action) {
      //If ZAR set currency and symbol
    },
  },
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } =  bookingsSlice.actions;

export default bookingsSlice.reducer;
