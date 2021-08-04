import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsType = {
  theme: "light" | "dark" | "system";
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "system",
  } as SettingsType,
  reducers: {
    changeSettings: (state, action: PayloadAction<SettingsType>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const settingsReducer = settingsSlice.reducer;

export const { changeSettings } = settingsSlice.actions;
