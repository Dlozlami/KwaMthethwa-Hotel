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

export const fetchBookingsByID = createAsyncThunk(
  "bookings/fetchBookingsByID",
  async (user_id, thunkAPI) => {
    const url = `http://localhost:8080/bookings/user/${user_id}`;
    try {
      const response = await axios.get(url);
      //thunkAPI.dispatch(calculateSubtotalAndTotal());
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const addBookingToCart = createAsyncThunk(
  "bookings/addBooking",
  async (booking, thunkAPI) => {
    const url = "http://localhost:8080/bookings/";
    try {
      const response = await axios.post(url, booking);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "bookings/deleteFromCart",
  async (booking_id, thunkAPI) => {
    const url = `http://localhost:8080/bookings/${booking_id}`;
    try {
      const response = await axios.delete(url, booking_id);
      return response.data;
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
    calculateSubtotalAndTotal(state) {
      console.log("calculateSubtotalAndTotal: ", state.total);
      if (state.bookingsCart.length > 0) {
        const subtotal = state.bookingsCart.reduce(
          (acc, booking) => acc + booking.totalAmount,
          0
        );
        const total = subtotal + subtotal * state.VAT;
        state.subtotal = subtotal;
        state.total = total;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookingsByID.fulfilled, (state, action) => {
      state.bookingsCart = action.payload;
    });
  },
});

export const { setCurrency, calculateSubtotalAndTotal } = bookingsSlice.actions;

export default bookingsSlice.reducer;
