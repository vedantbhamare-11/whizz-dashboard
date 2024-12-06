// ./redux/orderHistorySlice.ts
import { createSlice } from "@reduxjs/toolkit";

export enum OrderType {
  FOOD = "Food",
  MEDICINE = "Medicine",
  CUSTOM_PACKAGE = "Custom Package",
}

export interface Order {
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
    pickupTime: "1:00 PM",
    deliveryTime: "1:45 PM",
  },
  {
    id: "0003",
    customerName: "Alice Johnson",
    customerNumber: "5555555555",
    type: OrderType.CUSTOM_PACKAGE,
    pickup: "321 Oak St, Old Town",
    delivery: "654 Pine St, West End",
    pickupTime: "10:00 AM",
    deliveryTime: "12:00 PM",
  },
  {
    id: "0004",
    customerName: "Michael Brown",
    customerNumber: "4444444444",
    type: OrderType.FOOD,
    pickup: "789 Maple St, Downtown",
    delivery: "123 Birch St, Midtown",
    pickupTime: "6:30 PM",
    deliveryTime: "7:00 PM",
  },
  {
    id: "0005",
    customerName: "Emily White",
    customerNumber: "3333333333",
    type: OrderType.MEDICINE,
    pickup: "101 Pine St, Uptown",
    delivery: "432 Oak St, East Side",
    pickupTime: "9:00 AM",
    deliveryTime: "9:30 AM",
  },
  {
    id: "0006",
    customerName: "James Green",
    customerNumber: "2222222222",
    type: OrderType.CUSTOM_PACKAGE,
    pickup: "555 Oak St, Suburbia",
    delivery: "333 Maple St, City Center",
    pickupTime: "3:30 PM",
    deliveryTime: "4:30 PM",
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
