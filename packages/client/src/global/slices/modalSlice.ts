import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: undefined,
  } as {
    open?: string;
  },
  reducers: {
    openModal: (state, action: PayloadAction<{ id: string }>) => ({
      ...state,
      open: action.payload.id,
    }),
    closeModal: (state) => ({ ...state, open: undefined }),
  },
});

export const modalReducer = modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;
