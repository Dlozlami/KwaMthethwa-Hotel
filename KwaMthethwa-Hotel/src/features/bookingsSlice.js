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
      await axios.get(url);
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

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setCurrency(state, action) {
      // If ZAR set currency and symbol
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookingsByID.fulfilled, (state, action) => {
      state.bookingsCart = action.payload; // Update the state with the fetched lists of bookings
    });
  },
});

export const { setCurrency } = bookingsSlice.actions;

export default bookingsSlice.reducer;
