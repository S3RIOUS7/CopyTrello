import { LocalStorageManager } from "../../../../services/localStorageService";
import type { BackgroundButton, BackgroundState, ColorButton } from "../../../../store/types/backgroudTypes/backgroundTypes";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { backgroundButtons } from "../../../../utils/constants/mainPageConstants/buttonsBackground/backgroundButtonsFirstmenu";

const initialState: BackgroundState = {
  selectedBackground: backgroundButtons[0].background, // Устанавливаем первый фон по умолчанию
  selectedColor: null,
  lastSelectedType: 'background', // Устанавливаем тип, так как используем фон
   isHeaderTransparent: false // Добавляем новое поле
};

// Только если это не первый запуск - загружаем из localStorage
if (!LocalStorageManager.isFirstLaunch()) {
  const savedBackground = LocalStorageManager.getBackground();
  if (savedBackground) {
    initialState.selectedBackground = savedBackground.selectedBackground;
    initialState.selectedColor = savedBackground.selectedColor;
    initialState.lastSelectedType = savedBackground.lastSelectedType;
  }
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
      
      LocalStorageManager.clearBackground();
    },
      setHeaderTransparent: (state, action: PayloadAction<boolean>) => {
      state.isHeaderTransparent = action.payload;
    },
  },
});

export const { selectBackground, selectColor, clearSelection, setHeaderTransparent } = backgroundSlice.actions;
export default backgroundSlice.reducer;