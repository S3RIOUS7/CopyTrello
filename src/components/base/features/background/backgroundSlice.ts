import { LocalStorageManager } from "../../../../services/localStorageService";
import type { BackgroundButton, BackgroundState, ColorButton } from "../../../../store/types/backgroudTypes/backgroundTypes";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: BackgroundState = {
  selectedBackground: null,
  selectedColor: null,
  lastSelectedType: null,
};

// Загружаем сохраненные данные из localStorage при инициализации
const savedBackground = LocalStorageManager.getBackground();
if (savedBackground) {
  initialState.selectedBackground = savedBackground.selectedBackground;
  initialState.selectedColor = savedBackground.selectedColor;
  initialState.lastSelectedType = savedBackground.lastSelectedType;
}

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    selectBackground: (state, action: PayloadAction<BackgroundButton>) => {
      state.selectedBackground = action.payload.background;
      if (state.lastSelectedType === 'color') {
        state.selectedColor = null;
      }
      state.lastSelectedType = 'background';
      
      // Сохраняем в localStorage
      LocalStorageManager.saveBackground({
        selectedBackground: state.selectedBackground,
        selectedColor: state.selectedColor,
        lastSelectedType: state.lastSelectedType,
      });
    },
    selectColor: (state, action: PayloadAction<ColorButton>) => {
      state.selectedColor = action.payload.color;
      if (state.lastSelectedType === 'background') {
        state.selectedBackground = null;
      }
      state.lastSelectedType = 'color';
      
      // Сохраняем в localStorage
      LocalStorageManager.saveBackground({
        selectedBackground: state.selectedBackground,
        selectedColor: state.selectedColor,
        lastSelectedType: state.lastSelectedType,
      });
    },
    clearSelection: (state) => {
      state.selectedBackground = null;
      state.selectedColor = null;
      state.lastSelectedType = null;
      
      // Очищаем localStorage
      LocalStorageManager.clearBackground();
    },
  },
});

export const { selectBackground, selectColor, clearSelection } = backgroundSlice.actions;
export default backgroundSlice.reducer;