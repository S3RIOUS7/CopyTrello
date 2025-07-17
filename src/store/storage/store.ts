import { configureStore } from '@reduxjs/toolkit';
// Импортируйте ваши редьюсеры здесь
// import someReducer from './features/someSlice';

export const store = configureStore({
  reducer: {
    // Добавьте ваши редьюсеры здесь
    // some: someReducer,
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;