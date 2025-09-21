import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface Container {
  id: string;
  content: string;
  boardId: string;
  cards: string[]; // Теперь храним только ID карточек
}

export interface ContainerState {
  containers: Container[];
}

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
        cards: [], // Теперь только массив ID
      });
    },
    addCardToContainer: (state, action: PayloadAction<{ cardId: string; containerId: string }>) => {
      const container = state.containers.find(c => c.id === action.payload.containerId);
      if (container) {
        container.cards.push(action.payload.cardId);
      }
    },
    removeCardFromContainer: (state, action: PayloadAction<{ cardId: string; containerId: string }>) => {
      const container = state.containers.find(c => c.id === action.payload.containerId);
      if (container) {
        container.cards = container.cards.filter(id => id !== action.payload.cardId);
      }
    },
    // Для удаления контейнера и связанных операций
    removeContainer: (state, action: PayloadAction<string>) => {
      state.containers = state.containers.filter(container => container.id !== action.payload);
    },
  },
});

export const { 
  addContainer, 
  addCardToContainer, 
  removeCardFromContainer, 
  removeContainer 
} = addButtonSlice.actions;
export const addButtonReducer = addButtonSlice.reducer;