import type { BackgroundButton, BackgroundState, ColorButton } from "../../../../store/types/backgroudTypes/backgroundTypes";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: BackgroundState = {
  selectedBackground: null,
  selectedColor: null,
  lastSelectedType: null,
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    selectBackground: (state, action: PayloadAction<BackgroundButton>) => {
      state.selectedBackground = action.payload.background;
      state.selectedColor = null;
      state.lastSelectedType = 'background';
    },
    selectColor: (state, action: PayloadAction<ColorButton>) => {
      state.selectedColor = action.payload.color;
      state.selectedBackground = null;
      state.lastSelectedType = 'color';
    },
    clearSelection: (state) => {
      state.selectedBackground = null;
      state.selectedColor = null;
      state.lastSelectedType = null;
    },
  },
});

export const { selectBackground, selectColor, clearSelection } = backgroundSlice.actions;
export default backgroundSlice.reducer;