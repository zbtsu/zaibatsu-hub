import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    counter: 0,
  },
  reducers: {
    incrementCounter: (state) => ({
      ...state,
      counter: state.counter + 1,
    }),
  },
});

export const mainReducer = mainSlice.reducer;

export const { incrementCounter } = mainSlice.actions;
