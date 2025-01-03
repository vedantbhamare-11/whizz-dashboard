// ./redux/upcomingOrdersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export enum OrderType {
  FOOD = "Food",
  MEDICINE = "Medicine",
  CUSTOM_DELIVERY = "Custom Package",
}



interface UpcomingOrder {
  id: string;
  type: OrderType;
  pickup: string;
  delivery: string;
}

const initialState: UpcomingOrder[] = [
  {
    id: "0001",
    type: OrderType.FOOD,
    pickup: "123 Main St, City Center",
    delivery: "456 Elm St, Suburbia",
  },
  {
    id: "0002",
    type: OrderType.MEDICINE,
    pickup: "789 Oak St, Downtown",
    delivery: "101 Pine St, Uptown",
  },
  {
    id: "0003",
    type: OrderType.CUSTOM_DELIVERY,
    pickup: "500 Market St, Old Town",
    delivery: "900 High St, New Suburb",
  },
];

const upcomingOrdersSlice = createSlice({
  name: "upcomingOrders",
  initialState,
  reducers: {
    addUpcomingOrder: (state, action) => {
      state.push(action.payload);
    },
    removeUpcomingOrder: (state, action) => {
      return state.filter((order) => order.id !== action.payload.id);
    },
  },
});

export const { addUpcomingOrder, removeUpcomingOrder } =
  upcomingOrdersSlice.actions;
export default upcomingOrdersSlice.reducer;
