"use client";

import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MarkAllButton from "@/components/notifications/MarkAllButton";
import NotificationTabs from "@/components/notifications/NotificationTabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Notification, markAsRead, markAllAsRead } from "@/redux/notificationsSlice";

const isMobile = () => window.innerWidth <= 820;

export default function NotificationsPage() {
  const [isMobileView, setIsMobileView] = useState(false);
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch<AppDispatch>();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 mb-[5rem] flex flex-col space-y-4">
              <div className="space-y-6">
                <div className="flex p-4 justify-between items-center">
                  <h1 className="text-3xl font-bold">Notifications</h1>
                  <MarkAllButton onClick={() => dispatch(markAllAsRead())} />
                </div>
                <NotificationTabs
                  notifications={notifications}
                  unreadCount={unreadCount}
                  markAsRead={(id: string) => dispatch(markAsRead(id))}
                />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-10 mt-[3rem] ml-[5rem]">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold">Notifications</h1>
                  <MarkAllButton onClick={() => dispatch(markAllAsRead())} />
                </div>
                <NotificationTabs
                  notifications={notifications}
                  unreadCount={unreadCount}
                  markAsRead={(id: string) => dispatch(markAsRead(id))}
                />
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
