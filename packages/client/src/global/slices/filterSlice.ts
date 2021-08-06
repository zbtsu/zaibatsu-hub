import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    tags: [],
    filter: "",
  } as { tags: string[]; filter: string },
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<{ tags: string[]; filter: string }>
    ) => {
      return {
        ...state,
        tags: action.payload.tags,
        filter: action.payload.filter,
      };
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { changeFilter } = filterSlice.actions;
