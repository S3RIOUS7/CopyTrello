
import type { BackgroundButton, BackgroundState, ColorButton } from "../../../../../store/types/backgroudTypes/backgroundTypes";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { backgroundButtons } from "../../../../../utils/constants/mainPageConstants/buttonsBackground/backgroundButtonsFirstmenu";

const initialState: BackgroundState = {
  selectedBackground: backgroundButtons[0].background,
  selectedColor: null,
  lastSelectedType: 'background',
  isHeaderTransparent: false,
  // Убираем сохранение фона при инициализации, так как теперь фон хранится в каждой доске
};

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
    },
    selectColor: (state, action: PayloadAction<ColorButton>) => {
      state.selectedColor = action.payload.color;
      if (state.lastSelectedType === 'background') {
        state.selectedBackground = null;
      }
      state.lastSelectedType = 'color';
    },
    clearSelection: (state) => {
      state.selectedBackground = null;
      state.selectedColor = null;
      state.lastSelectedType = null;
    },
    setHeaderTransparent: (state, action: PayloadAction<boolean>) => {
      state.isHeaderTransparent = action.payload;
    },
    // Новый action для установки фона конкретной доски
    setBoardBackground: (state, action: PayloadAction<{background: string | null, color: string | null}>) => {
      if (action.payload.background) {
        state.selectedBackground = action.payload.background;
        state.selectedColor = null;
        state.lastSelectedType = 'background';
      } else if (action.payload.color) {
        state.selectedColor = action.payload.color;
        state.selectedBackground = null;
        state.lastSelectedType = 'color';
      } else {
        // Если ничего не передано, используем фон по умолчанию
        state.selectedBackground = backgroundButtons[0].background;
        state.selectedColor = null;
        state.lastSelectedType = 'background';
      }
    },
  },
});

export const { selectBackground, selectColor, clearSelection, setHeaderTransparent, setBoardBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;