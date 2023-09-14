import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allPaidReceipts: [],
  allUnpaidReceipts: [],
  allReceipts: [],
  paidUserReceipts: [],
  unpaidUserReceipts: [],
  userReceipts: [],
  receiptByRef: {},
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceiptByRef.fulfilled, (state, action) => {
        state.receiptByRef = action.payload[0];
      })
      .addCase(getAllReceipts.fulfilled, (state, action) => {
        state.allReceipts = action.payload;
        state.allPaidReceipts = action.payload.filter(
          (receipt) => receipt.payment_date !== null
        );
        state.allUnpaidReceipts = action.payload.filter(
          (receipt) => receipt.payment_date === null
        );
      })
      .addCase(getReceiptsByUserID.fulfilled, (state, action) => {
        state.userReceipts = action.payload;
        state.paidUserReceipts = action.payload.filter(
          (receipt) => receipt.payment_date !== null
        );
        state.unpaidUserReceipts = action.payload.filter(
          (receipt) => receipt.payment_date === null
        );
      });
  },
});

export const getAllReceipts = createAsyncThunk(
  "receipt/getAllReceipts",
  async (receipt, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8080/receipts/`);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getReceiptsByUserID = createAsyncThunk(
  "receipt/getReceiptsByUserID",
  async (userID, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/receipts/users/${userID}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getReceiptByRef = createAsyncThunk(
  "receipt/getReceiptByRef",
  async (ref, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/receipts/ref/${ref}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const addReceipt = createAsyncThunk(
  "receipt/addReceipt",
  async (receipt, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/receipts/`,
        receipt
      );
      alert("Receipt created successfully!");
      //console.log("Receipt added successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateReceipt = createAsyncThunk(
  "receipt/updateReceipt",
  async (receipt, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/receipts/${receipt[0]}`,
        receipt[1]
      );
      alert("Receipt payment successful!");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchReceiptsByID = createAsyncThunk(
  "receipt/fetchReceiptsByID",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/receipt/user/${user_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Include the methods in normal reducers in actions to avoid undefined errors
//export const {} = receiptSlice.actions;

export default receiptSlice.reducer;
