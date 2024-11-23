// ./redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import upcomingOrdersSlice from "./upcomingOrdersSlice";

const store = configureStore({
  reducer: {
    orders: orderSlice,
    upcomingOrders: upcomingOrdersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
