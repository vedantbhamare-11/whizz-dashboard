// ./redux/notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Notification = {
  id: string;
  type: 'new_order' | 'order_update' | 'earnings' | 'schedule' | 'system' | 'feedback' | 'support';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  badge?: string; 
  body?: string;  
  data?: unknown; 
  dir?: string;   
};

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [
    { id: '1', type: 'new_order', title: 'New Order Assigned', message: 'You have been assigned a new delivery order #1234.', timestamp: '2 minutes ago', read: false },
    { id: '2', type: 'order_update', title: 'Order Status Update', message: 'Order #5678 has been picked up by the customer.', timestamp: '15 minutes ago', read: false },
    { id: '3', type: 'earnings', title: 'Weekly Earnings Posted', message: 'Your earnings for last week have been posted. Total: $450.75', timestamp: '2 hours ago', read: true },
    { id: '4', type: 'schedule', title: 'Shift Reminder', message: 'Your next shift starts in 1 hour.', timestamp: '3 hours ago', read: true },
    { id: '5', type: 'system', title: 'System Maintenance', message: 'The app will undergo maintenance tonight from 2 AM to 4 AM.', timestamp: '1 day ago', read: true },
    { id: '6', type: 'feedback', title: 'New Customer Rating', message: 'You received a 5-star rating from your last delivery!', timestamp: '2 days ago', read: true },
    { id: '7', type: 'support', title: 'Support Ticket Update', message: 'Your support ticket #789 has been resolved.', timestamp: '3 days ago', read: true },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
