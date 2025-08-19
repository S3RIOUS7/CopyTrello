
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageManager, type Board } from '../../../../../services/localStorageService';


interface BoardsState {
  boards: Board[];
}

const initialState: BoardsState = {
  boards: LocalStorageManager.getBoards(),
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
      LocalStorageManager.saveBoards(state.boards);
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(board => board.id !== action.payload);
      LocalStorageManager.saveBoards(state.boards);
    },
    updateBoard: (state, action: PayloadAction<{id: string; updates: Partial<Board>}>) => {
      const index = state.boards.findIndex(board => board.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = { ...state.boards[index], ...action.payload.updates };
        LocalStorageManager.saveBoards(state.boards);
      }
    },
    clearBoards: (state) => {
      state.boards = [];
      LocalStorageManager.clearBoards();
    },
  },
});

export const { addBoard, removeBoard, updateBoard, clearBoards } = boardsSlice.actions;
export default boardsSlice.reducer;