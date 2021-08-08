import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICombo } from "../../models/Combo";

const removeFromArrayWithId = (arr: ICombo[], newCombo: ICombo) => {
  const newArr = [...arr];
  const index = newArr.findIndex((combo) => combo.id === newCombo.id);
  if (index > -1) {
    newArr.splice(index, 1);
  }
  return newArr;
};

const editComboInArray = (arr: ICombo[], newCombo: ICombo) => {
  const newArr = [...arr];
  const index = newArr.findIndex((combo) => combo.id === newCombo.id);
  if (index > -1) {
    newArr[index] = { ...newArr[index], ...newCombo };
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
      const hasComboWithSameId =
        all.findIndex((combo) => combo.id === action.payload.id) > -1;

      if (hasComboWithSameId) {
        return {
          ...state,
          all: editComboInArray(all, action.payload),
        };
      }
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
