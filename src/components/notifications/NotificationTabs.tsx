// components/NotificationTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationList from "./NotificationList";
import { Notification } from "@/redux/notificationsSlice";

interface NotificationTabsProps {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
}

const NotificationTabs = ({ notifications, unreadCount, markAsRead }: NotificationTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mx-4">
        <TabsTrigger className="text-black" value="all">All</TabsTrigger>
        <TabsTrigger value="unread" className="text-black">Unread ({unreadCount})</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <NotificationList notifications={notifications} markAsRead={markAsRead} />
      </TabsContent>
      <TabsContent value="unread">
        <NotificationList notifications={notifications.filter(n => !n.read)} markAsRead={markAsRead} />
      </TabsContent>
    </Tabs>
  );
};

export default NotificationTabs;
