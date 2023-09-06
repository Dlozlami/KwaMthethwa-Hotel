import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  validPwd: 0,
  validUsername: 0,
  isLoggedIn: false,
  isAdmin: false,
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
});

export const addReceipt = createAsyncThunk(
  "receipt/addReceipt",
  async (receipt, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/receipts/`,
        receipt
      );
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
