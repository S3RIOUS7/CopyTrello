import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';

export interface Card {
  id: string;
  content: string;
  containerId: string;
  checked: boolean;
}

interface CardState {
  cards: Card[];
}

const initialState: CardState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // Обновление статуса чекбокса
    updateCardCheck: (state, action: PayloadAction<{cardId: string; checked: boolean}>) => {
      const card = state.cards.find(card => card.id === action.payload.cardId);
      if (card) {
        card.checked = action.payload.checked;
      }
    },
    // Добавление новой карточки
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    // Удаление карточки
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    // Обновление содержимого карточки
    updateCardContent: (state, action: PayloadAction<{cardId: string; content: string}>) => {
      const card = state.cards.find(card => card.id === action.payload.cardId);
      if (card) {
        card.content = action.payload.content;
      }
    },
    // Перемещение карточки между контейнерами
    moveCard: (state, action: PayloadAction<{cardId: string; newContainerId: string}>) => {
      const card = state.cards.find(card => card.id === action.payload.cardId);
      if (card) {
        card.containerId = action.payload.newContainerId;
      }
    },
  },
});

export const { 
  updateCardCheck, 
  addCard, 
  removeCard, 
  updateCardContent, 
  moveCard 
} = cardSlice.actions;
export default cardSlice.reducer;