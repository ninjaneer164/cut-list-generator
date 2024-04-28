import { configureStore } from '@reduxjs/toolkit';
import cutListReducer from './cutListSlice';

export const store = configureStore({
  reducer: {
    cutList: cutListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
