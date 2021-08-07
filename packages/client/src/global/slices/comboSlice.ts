import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICombo } from "../../models/Combo";

const removeFromArrayWithId = (arr: ICombo[], combos: ICombo) => {
  const newArr = [...arr];
  const index = newArr.findIndex((combo) => combo.id === combos.id);
  if (index > -1) {
    newArr.splice(index, 1);
  }
  return newArr;
};

const editComboInArray = (arr: ICombo[], combo: ICombo) => {
  const newArr = [...arr];
  const index = newArr.findIndex((combo) => combo.id === combo.id);
  if (index > -1) {
    newArr[index] = { ...newArr[index], ...combo };
  }
  return newArr;
};

const comboSlice = createSlice({
  name: "characters",
  initialState: {
    all: [],
    collections: [],
  } as {
    all: ICombo[];
    collections: [];
  },
  reducers: {
    addCombo: (state, action: PayloadAction<ICombo>) => {
      const { all } = Object.assign({}, state);

      return {
        ...state,
        all: [...all, action.payload],
      };
    },
    removeCombo: (state, action: PayloadAction<ICombo>) => {
      const { all } = Object.assign({}, state);

      return {
        ...state,
        all: removeFromArrayWithId(all, action.payload),
      };
    },
    editCombo: (state, action: PayloadAction<ICombo>) => {
      const { all } = Object.assign({}, state);

      return {
        ...state,
        all: editComboInArray(all, action.payload),
      };
    },
  },
});

export const comboReducer = comboSlice.reducer;

export const { addCombo, removeCombo } = comboSlice.actions;
