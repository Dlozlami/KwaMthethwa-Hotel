// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
  loading: false,
  error: null,
  itemsList: [],
  itemsLength: 0,
  total: 0,
  subtotal: 0,
  VAT: 0.15,
  totalQauntities: 0,
  checkoutData: null,
  callBackURL: "http://10.255.66.152:19000/home",
};

export const checkout = createAsyncThunk(
  "carts/checkout",
  async (receipt, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://10.255.66.152:8080/checkout",
        receipt
      );
      thunkAPI.dispatch(setCheckoutData(response.data.data));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItemToList(state, action) {
      const quantity = 1;
      const newListItem = [quantity, action.payload];
      let oldItemIndex = 0;
      let wineExists = false;

      for (const listItem of state.itemsList) {
        if (listItem[1].wine_id === newListItem[1].wine_id) {
          state.itemsList[oldItemIndex][0] += 1;
          oldItemIndex += 1;
          // The wine_id already exists in the list
          wineExists = true;
        }
      }

      // The wine_id does not exist in the list
      if (!wineExists) {
        state.itemsList.push(newListItem);
        state.itemsLength = state.itemsList.length;
      }

      updateSubtotalAndTotal(state);
    },

    removeItemFromList(state, action) {
      console.log("1 mos??");
      const wineIdToRemove = action.payload;
      let myList = state.itemsList.splice(wineIdToRemove, 1);

      state.itemsList = myList;
      state.itemsLength = state.itemsList.length;
      updateSubtotalAndTotal(state);
    },

    decreaseQauntity(state, action) {
      const wineIdToDecrease = action.payload;
      //console.log(state.itemsLength);
      //const existingItemIndex = state.itemsList.findIndex((item) => item[1].wine_id === wineIdToDecrease);
      if (state.itemsList[wineIdToDecrease][0] > 1) {
        state.itemsList[wineIdToDecrease][0] -= 1;
      }

      if (state.itemsList[wineIdToDecrease][0] === 1) {
        console.log("remove: " + state.itemsList[wineIdToDecrease][1].name);
        const wineIdToRemove = action.payload;
        let myList = state.itemsList;
        myList.splice(wineIdToRemove, 0);
        console.log(myList);
        state.itemsList = myList;
      }

      state.itemsLength = state.itemsList.length;
      updateSubtotalAndTotal(state);
    },
    setCheckoutData(state, action) {
      state.checkoutData = action.payload;
    },
    getAuthorization_url(state, action) {
      return state.checkoutData.authorization_url;
    },
    clearCheckoutData(state) {
      state.checkoutData = null;
    },
    clearitemsList(state) {
      state.itemsList = [];
      state.itemsLength = state.itemsList.length;
      updateSubtotalAndTotal(state);
    },
  },
});

const updateSubtotalAndTotal = (state) => {
  if (state.itemsList.length === 0) {
    state.subtotal = 0;
    state.total = 0;
    state.totalQauntities = 0;
  } else {
    //state.itemsList.map((item)=>console.log(item[0]+'*'+item[1].priceInCents))
    state.subtotal = state.itemsList.reduce(
      (acc, item) => acc + item[0] * item[1].priceInCents,
      0
    );
    state.totalQauntities = state.itemsList.reduce(
      (acc, item) => acc + item[0],
      0
    );
    state.total = state.subtotal + state.VAT * state.subtotal;
  }
};

export const {
  addItemToList,
  removeItemFromList,
  setCheckoutData,
  decreaseQauntity,
  clearCheckoutData,
  clearitemsList,
  getAuthorization_url,
} = cartSlice.actions;
export default cartSlice.reducer;
