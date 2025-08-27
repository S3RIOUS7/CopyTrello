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
      });
    },
    // Убрали resetBoardContainers
  },
});

export const { addContainer } = addButtonSlice.actions;
export const addButtonReducer = addButtonSlice.reducer;