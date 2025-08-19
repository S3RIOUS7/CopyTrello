import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '../../components/base/features/slices/background/backgroundSlice';
import boardsReducer from '../../components/base/features/slices/boardSlice/boardslice'; // Добавляем импорт
import createSagaMiddleware from 'redux-saga';
import unsplashReducer from '../redusers/unsplashReducer/unsplashReducer';
import { unsplashSaga } from '../sagas/unsplashSaga/unsplashSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    boards: boardsReducer, // Добавляем редьюсер досок
    unsplash: unsplashReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(unsplashSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;