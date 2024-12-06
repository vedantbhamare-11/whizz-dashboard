// ./redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import upcomingOrdersSlice from "./upcomingOrdersSlice";
import orderHistorySlice from "./orderHistorySlice";  // Import the new slice
 

const store = configureStore({
  reducer: {
    orders: orderSlice,
    upcomingOrders: upcomingOrdersSlice,
    orderHistory: orderHistorySlice,  // New order history slice

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
