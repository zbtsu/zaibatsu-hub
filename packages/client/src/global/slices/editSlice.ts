import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICombo } from "../../models/Combo";

const forEdit = createSlice({
  name: "forEdit",
  initialState: {
    combo: undefined,
    guide: undefined,
  } as {
    combo?: ICombo;
    guide?: undefined;
  },
  reducers: {
    addForEdit: (
      state,
      action: PayloadAction<{ data: ICombo; type: "combo" | "guide" }>
    ) => {
      return {
        ...state,
        [action.payload.type]: action.payload.data,
      };
    },
    removeForEdit: (state, action: PayloadAction<undefined>) => {
      return {
        ...state,
        combo: undefined,
        guide: undefined,
      };
    },
  },
});

export const forEditReducer = forEdit.reducer;

export const { addForEdit, removeForEdit } = forEdit.actions;
