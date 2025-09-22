import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '../../store/redusers/features/slices/background/backgroundSlice';
import boardsReducer from '../redusers/features/slices/boardSlice/boardSlice'; // Добавляем импорт
import createSagaMiddleware from 'redux-saga';
import unsplashReducer from '../redusers/unsplashReducer/unsplashReducer';
import { unsplashSaga } from '../sagas/unsplashSaga/unsplashSaga';
import { addButtonReducer } from '../redusers/addButtonReducer/addButtonReducer';
import cardReducer from '../redusers/features/slices/cardSlice/cardSlice'
import modalReducer from '../../store/redusers/features/slices/modalWindow/modalWindowSlice'
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    boards: boardsReducer,
    unsplash: unsplashReducer,
    container: addButtonReducer,
    cards: cardReducer, // Убедитесь, что это правильный импорт
     modal: modalReducer,
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