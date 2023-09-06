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
  checkoutData: null,
};

export const fetchBookingsByID = createAsyncThunk(
  "bookings/fetchBookingsByID",
  async (user_id, thunkAPI) => {
    const url = `http://localhost:8080/bookings/user/${user_id}`;
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async (bookingList, thunkAPI) => {
    const url = `http://localhost:8080/bookings/${bookingList[1]}`;
    try {
      const response = await axios.patch(url, bookingList[0]);
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

export const payNow = createAsyncThunk(
  "bookings/payNow",
  async (receipt, thunkAPI) => {
    try {
      //console.log("BookingsSlice line 77 receipt: ", receipt);
      const response = await axios.post(
        "http://localhost:8080/bookings/checkout",
        receipt
      );
      console.log(
        "BookingsSlice line 81 response.data.data: ",
        response.data.data
      );

      //thunkAPI.dispatch(setCheckoutData(response.data.data));
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookings(state) {
      state.discount_programme = null;
      state.discount_rate = 0;
      state.currency = 1;
      state.currencySymbol = "R";
      state.bookingsCart = [];
      state.total = 0;
      state.subtotal = 0;
      state.checkoutData = null;
    },
    calculateSubtotalAndTotal(state) {
      //console.log("calculateSubtotalAndTotal: ", state.total);
      if (state.bookingsCart.length > 0) {
        const subtotal = state.bookingsCart.reduce(
          (acc, booking) => acc + booking.totalAmount,
          0
        );
        const total = subtotal + Math.floor(subtotal * state.VAT);
        state.subtotal = subtotal;
        state.total = total;
      } else {
        state.subtotal = 0;
        state.total = 0;
      }
    },
    setCheckoutData(state, action) {
      state.checkoutData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsByID.fulfilled, (state, action) => {
        state.bookingsCart = action.payload;
        if (state.bookingsCart.length > 0) {
          const subtotal = state.bookingsCart.reduce(
            (acc, booking) => acc + booking.totalAmount,
            0
          );
          const total = subtotal + Math.floor(subtotal * state.VAT);
          state.subtotal = subtotal;
          state.total = total;
        } else {
          state.subtotal = 0;
          state.total = 0;
        }
      })
      .addCase(payNow.fulfilled, (state, action) => {
        state.checkoutData = action.payload;
        const reference = state.checkoutData.reference;
        state.bookingsCart.forEach((booking) => {
          booking.payment_ref = reference;
        });
      });
  },
});

export const {
  setCurrency,
  calculateSubtotalAndTotal,
  setCheckoutData,
  clearBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
