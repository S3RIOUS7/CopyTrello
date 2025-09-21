import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '../../components/base/features/slices/background/backgroundSlice';
import boardsReducer from '../../components/base/features/slices/boardSlice/boardSlice'; // Добавляем импорт
import createSagaMiddleware from 'redux-saga';
import unsplashReducer from '../redusers/unsplashReducer/unsplashReducer';
import { unsplashSaga } from '../sagas/unsplashSaga/unsplashSaga';
import { addButtonReducer } from '../redusers/addButtonReducer/addButtonReducer';
import cardReducer from '../../components/base/features/slices/cardSlice/cardSlice'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    boards: boardsReducer,
    unsplash: unsplashReducer,
    container: addButtonReducer,
    cards: cardReducer, // Убедитесь, что это правильный импорт
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(unsplashSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;