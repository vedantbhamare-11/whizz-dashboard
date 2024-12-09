// components/NotificationList.tsx
import NotificationItem from "./NotificationItem";
import { Notification } from "@/redux/notificationsSlice";

interface NotificationListProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

const NotificationList = ({ notifications, markAsRead }: NotificationListProps) => {
  return (
    <div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} markAsRead={markAsRead} />
      ))}
    </div>
  );
};

export default NotificationList;
