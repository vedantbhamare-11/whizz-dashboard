// ./redux/orderHistorySlice.ts
import { createSlice } from "@reduxjs/toolkit";

export enum OrderType {
  FOOD = "Food",
  MEDICINE = "Medicine",
  CUSTOM_PACKAGE = "Custom Package",
}


interface Order {
  id: string;
  customerName: string;
  customerNumber: string;
  type: OrderType;
  pickup: string;
  delivery: string;
  pickupTime?: string;  // Optional
  deliveryTime?: string;  // Optional
}

const initialState: Order[] = [
  {
    id: "0001",
    customerName: "Jane Doe",
    customerNumber: "1234567890",
    type: OrderType.FOOD,
    pickup: "123 Main St, City Center",
    delivery: "456 Elm St, Suburbia",
    pickupTime: "2:00 PM",
    deliveryTime: "2:30 PM",
  },
  {
    id: "0002",
    customerName: "John Smith",
    customerNumber: "9876543210",
    type: OrderType.MEDICINE,
    pickup: "789 Oak St, Downtown",
    delivery: "101 Pine St, Uptown",
  },
];

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    addOrderHistory: (state, action) => {
      state.push(action.payload);
    },
    removeOrderHistory: (state, action) => {
      return state.filter((order) => order.id !== action.payload.id);
    },
   
  },
});

export const { addOrderHistory, removeOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
