import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  discount_programme: null,
  discount_rate: 0,
  currency: 1,
  currencySymbol: "R",
  bookingsCart: [],
  total: 0,
  subtotal: 0,
  VAT: 0.15,
};

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (booking, thunkAPI) => {
    const url = "http://localhost:8080/users/";
    try {
      await axios.post(url, booking);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setCurrency(state, action) {
      // If ZAR set currency and symbol
    },
    addBookingToCart(state, action) {
      state.bookingsCart.push(action.payload);
    },
  },
});

export const { setCurrency, addBookingToCart } = bookingsSlice.actions;

export default bookingsSlice.reducer;
