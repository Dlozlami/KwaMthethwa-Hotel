import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  userData: null,
  validPwd: 0,
  validUsername: 0,
  isLoggedIn: false,
  isAdmin: false,
};

export const setLogin = createAsyncThunk(
  "login/setLogin",
  async ([email, password], thunkAPI) => {
    const url = `http://localhost:8080/users/login/`;
    try {
      const resp = await axios.post(url, {
        email: email,
        password: password,
      });

      const token = resp.data.token; // Extract the token from the response

      localStorage.setItem("KMHjwtUser", token); // Store the token in local storage

      const decodedToken = jwt_decode(token); // Decode the token to extract the user data

      thunkAPI.dispatch(setValidUsername(1));
      thunkAPI.dispatch(setValidPwd(1));
      thunkAPI.dispatch(setUserData(decodedToken)); // Set the user data in the state
      thunkAPI.dispatch(setIsLoggedIn(true));

      if (decodedToken.email.split("0")[0].toLowerCase() === "adminkmh") {
        thunkAPI.dispatch(setIsAdmin(true));
        console.log("Logged in as Admin! ");
      }

      return;
    } catch (error) {
      thunkAPI.dispatch(setValidUsername(2));
      thunkAPI.dispatch(setValidPwd(0));
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearState: (state) => {
      state.userData = null;
      localStorage.removeItem("KMHjwtUser");
      state.isLoggedIn = false;
      state.isAdmin = false;
    },

    setValidPwd: (state, { payload }) => {
      state.validPwd = payload;
    },

    setValidUsername: (state, { payload }) => {
      state.validUsername = payload;
    },

    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },

    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },

    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
  },
});

// Include the methods in normal reducers in actions to avoid undefined errors
export const {
  setIsLoggedIn,
  clearState,
  setValidPwd,
  setValidUsername,
  setUserData,
  setIsAdmin,
} = loginSlice.actions;

export default loginSlice.reducer;
