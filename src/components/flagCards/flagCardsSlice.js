import { createSlice } from "@reduxjs/toolkit";

export const flagSlice = createSlice({
  name: "flag",
  initialState: {
    value: 12,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = flagSlice.actions;

export default flagSlice.reducer;
