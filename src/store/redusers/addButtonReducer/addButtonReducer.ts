import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContainerState } from "../../types/addButtonTypes/addButtonType";
const initialState: ContainerState = {
  containers: [],
};

const addButtonSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    addContainer: (state, action: PayloadAction<{ content: string; boardId: string }>) => {
      state.containers.push({
        id: Date.now().toString(),
        content: action.payload.content,
        boardId: action.payload.boardId,
        cards: [], // Инициализируем пустой массив карточек
      });
    },
    addCard: (state, action: PayloadAction<{ content: string; containerId: string }>) => {
      const container = state.containers.find(c => c.id === action.payload.containerId);
      if (container) {
        container.cards.push({
          id: Date.now().toString(),
          content: action.payload.content,
          containerId: action.payload.containerId,
        });
      }
    },
  },
});

export const { addContainer, addCard } = addButtonSlice.actions;
export const addButtonReducer = addButtonSlice.reducer;