
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageManager, type Board } from '../../../../../services/localStorageService';


interface BoardsState {
  boards: Board[];
}

// Загружаем доски из localStorage при инициализации
const initialState: BoardsState = {
  boards: LocalStorageManager.getBoards(),
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      // Проверяем, существует ли доска с таким ID
      const existingBoardIndex = state.boards.findIndex(board => board.id === action.payload.id);
      
      if (existingBoardIndex !== -1) {
        // Если доска существует, обновляем ее
        state.boards[existingBoardIndex] = action.payload;
      } else {
        // Если доска новая, добавляем ее
        state.boards.push(action.payload);
      }
      
      // Сохраняем в localStorage
      LocalStorageManager.saveBoards(state.boards);
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(board => board.id !== action.payload);
      // Сохраняем в localStorage
      LocalStorageManager.saveBoards(state.boards);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex(board => board.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = action.payload;
        // Сохраняем в localStorage
        LocalStorageManager.saveBoards(state.boards);
      }
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
      // Сохраняем в localStorage
      LocalStorageManager.saveBoards(state.boards);
    },
  },
});

export const { addBoard, removeBoard, updateBoard, setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;