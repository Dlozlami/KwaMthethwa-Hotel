import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingCart: [],
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } =  bookingsSlice.actions;

export default bookingsSlice.reducer;
