// ./redux/orderSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Order {
  id: string;
  customerName: string;
  customerNumber: string;
  eta: string;
  status: string;
  type: string;
  pickup: string;
  delivery: string;
}

const initialState: Order[] = [
  {
    id: "0004",
    customerName: "John Doe",
    customerNumber: "9876543210",
    eta: "15 min",
    status: "In Progress",
    type: "Food",
    pickup: "123 Main St, City Center",
    delivery: "456 Elm St, Suburbia",
  },
];

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    removeOrder: (state, action) => {
      return state.filter((order) => order.id !== action.payload.id);
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
