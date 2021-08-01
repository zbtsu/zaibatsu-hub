import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../data/characters";

const removeDuplicatesById = (arr: Character[]) => {
  return arr.filter(
    (item, index, self) => self.findIndex((i) => i.id === item.id) === index
  );
};

const removeFromArrayWithIds = (arr: Character[], characters: Character[]) => {
  const ids = characters.map((item) => item.id);
  const newArr = arr.filter((item) => !ids.includes(item.id));
  return newArr;
};

const characterSlice = createSlice({
  name: "main",
  initialState: {
    all: [],
    selected: [],
  } as {
    all: Character[];
    selected: Character[];
  },
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character[]>) => {
      const newSelected = [...state.selected, ...action.payload];
      return {
        ...state,
        selected: removeDuplicatesById(newSelected),
      };
    },
    deselectCharacter: (state, action: PayloadAction<Character[]>) => {
      return {
        ...state,
        selected: removeFromArrayWithIds(state.selected, action.payload),
      };
    },
  },
});

export const characterReducer = characterSlice.reducer;

export const { selectCharacter, deselectCharacter } = characterSlice.actions;
