"use client"

import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Package, DollarSign, Calendar, AlertTriangle, MessageSquare, Star } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Notification, markAsRead, markAllAsRead } from "@/redux/notificationsSlice";

const getIconForType = (type: string) => {
  switch (type) {
    case 'new_order': return Package
    case 'order_update': return Package
    case 'earnings': return DollarSign
    case 'schedule': return Calendar
    case 'system': return AlertTriangle
    case 'feedback': return Star
    case 'support': return MessageSquare
    default: return Bell
  }
}

const isMobile = () => window.innerWidth <= 820;

export default function NotificationsPage() {
  const [isMobileView, setIsMobileView] = useState(false);
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch<AppDispatch>();

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <main className="flex-1 p-4 mb-[5rem] flex flex-col space-y-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold">Notifications</h1>
                  <Button onClick={() => dispatch(markAllAsRead())} variant="outline">Mark All as Read</Button>
                </div>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <NotificationList notifications={notifications} markAsRead={(id: string) => dispatch(markAsRead(id))} />
                  </TabsContent>
                  <TabsContent value="unread">
                    <NotificationList notifications={notifications.filter(n => !n.read)} markAsRead={(id: string) => dispatch(markAsRead(id))} />
                  </TabsContent>
                </Tabs>
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
                  <Button onClick={() => dispatch(markAllAsRead())} variant="outline">Mark All as Read</Button>
                </div>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <NotificationList notifications={notifications} markAsRead={(id: string) => dispatch(markAsRead(id))} />
                  </TabsContent>
                  <TabsContent value="unread">
                    <NotificationList notifications={notifications.filter(n => !n.read)} markAsRead={(id: string) => dispatch(markAsRead(id))} />
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationList({ notifications, markAsRead }: { notifications: Notification[], markAsRead: (id: string) => void }) {
  return (
    <Card>
      <CardContent className="p-0">
        <ul className="divide-y">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`mt-1 rounded-full p-2 ${notification.read ? 'bg-muted' : 'bg-gray-200'}`}>
                  {React.createElement(getIconForType(notification.type), { className: 'h-4 w-4 text-primary' })}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
                {!notification.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
