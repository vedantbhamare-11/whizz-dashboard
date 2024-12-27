"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    newOrganizationRegistrations: true,
    newFeedbackSubmissions: false,
    systemUpdates: true,
  });

  const handleSwitchChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSaveNotifications = () => {
    console.log("Notification Settings Saved:", notificationSettings);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 flex justify-center p-4 mt-[4rem] ml-[6rem]">
          <div className="flex flex-col items-center w-1/2">
            <Tabs defaultValue="notifications" className="w-full">
              <TabsList className="flex justify-around bg-white border border-gray-200">
                <TabsTrigger
                  value="notifications"
                  className="w-full text-center text-sm font-medium  rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full text-center text-sm font-medium  rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full text-center text-sm font-medium  rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
                >
                  Appearance
                </TabsTrigger>
              </TabsList>
              <TabsContent value="notifications">
                <Card className="p-6 space-y-6">
                    <div>
                    <h2 className="text-lg font-bold text-center mb-2">Notifications</h2>
                    <h3 className="text-sm text-gray-500 text-center">Email Notifications</h3>
                    </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">New Organization Registrations</p>
                        <p className="text-xs text-gray-500">
                          Receive emails for new Organization sign-ups
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.newOrganizationRegistrations}
                        onCheckedChange={() =>
                          handleSwitchChange("newOrganizationRegistrations")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">New Feedback Submissions</p>
                        <p className="text-xs text-gray-500">
                          Get notified when new feedback is submitted
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.newFeedbackSubmissions}
                        onCheckedChange={() =>
                          handleSwitchChange("newFeedbackSubmissions")
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">System Updates</p>
                        <p className="text-xs text-gray-500">
                          Receive important system update notifications
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={() => handleSwitchChange("systemUpdates")}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center ">
                  <Button
                    onClick={handleSaveNotifications}
                    className="w-1/2 rounded-full bg-[#3CAE06] text-white hover:bg-green-700"
                  >
                    Save Notification Settings
                  </Button>
                  </div>
                 
                </Card>
              </TabsContent>
              <TabsContent value="security">
                <Card className="p-6 space-y-6">
                  <h2 className="text-lg font-bold text-center">Security Settings</h2>
                </Card>
              </TabsContent>
              <TabsContent value="appearance">
                <Card className="p-6 space-y-6">
                  <h2 className="text-lg font-bold text-center">Appearance Settings</h2>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
