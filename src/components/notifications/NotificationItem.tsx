// components/NotificationItem.tsx
import { Button } from "@/components/ui/button";
import { getIconForType } from "@/lib/utils"; // You can place getIconForType function in a utils file for reusability
import { Notification } from "@/redux/notificationsSlice";
import React from "react";

interface NotificationItemProps {
  notification: Notification;
  markAsRead: (id: string) => void;
}

const NotificationItem = ({ notification, markAsRead }: NotificationItemProps) => {
  return (
    <div className={`p-4 hover:bg-muted/50 transition-colors ${notification.read ? 'bg-white' : 'bg-muted'}`}>
      <div className="flex items-start space-x-4">
        <div className={`mt-1 rounded-full p-2 bg-gray-200`}>
          {React.createElement(getIconForType(notification.type), { className: 'h-4 w-4 text-primary' })}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.title}</p>
            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
        </div>
        
      </div>
    </div>
  );
};

export default NotificationItem;
