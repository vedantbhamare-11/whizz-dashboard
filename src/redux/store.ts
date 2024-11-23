// ./redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';

const store = configureStore({
  reducer: {
    orders: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
