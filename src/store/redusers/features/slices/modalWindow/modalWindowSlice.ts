import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ModalData } from "../../../../types/modalWindowTypes/modalWindowType";

interface ModalState {
  isOpen: boolean;
  data: ModalData | null;
}

const initialState: ModalState = {
  isOpen: false,
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Partial<ModalData>>) => {
      state.isOpen = true;
      state.data = {
        title: action.payload.title || '',
        className: action.payload.className || '',
        description: action.payload.description || '',
        isChecked: action.payload.isChecked || false,
        cardId: action.payload.cardId, // Сохраняем cardId
        ...action.payload,
      };
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data = null;
    },
    updateModalData: (state, action: PayloadAction<Partial<ModalData>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
  },
});

export const { openModal, closeModal, updateModalData } = modalSlice.actions;
export default modalSlice.reducer;