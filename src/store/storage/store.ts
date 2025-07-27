import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '../../components/base/features/background/backgroundSlice';

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;