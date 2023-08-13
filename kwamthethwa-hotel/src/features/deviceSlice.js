import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenWidth: 0,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setScreenWith: (state) => {
      state.screenWidth = window.screen.width;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScreenWith } = deviceSlice.actions;

export default deviceSlice.reducer;
