"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationsSettings from "@/components/settings/NotificationsSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

const SettingsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    newOrganizationRegistrations: true,
    newFeedbackSubmissions: false,
    systemUpdates: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuthentication: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState("light");

  const handleNotificationSwitchChange = (
    setting: keyof typeof notificationSettings
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSecurityChange = (
    field: keyof typeof securitySettings,
    value: string | boolean
  ) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNotifications = () => {
    console.log("Notification Settings Saved:", notificationSettings);
  };

  const handleSaveSecurity = () => {
    console.log("Security Settings Saved:", securitySettings);
  };

  const handleSaveAppearance = () => {
    console.log("Appearance Settings Saved:", appearanceSettings);
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
                <NotificationsSettings
                  settings={notificationSettings}
                  onSwitchChange={handleNotificationSwitchChange}
                  onSave={handleSaveNotifications}
                />
              </TabsContent>
              <TabsContent value="security">
                <SecuritySettings
                  settings={securitySettings}
                  onInputChange={handleSecurityChange}
                  onSwitchChange={handleSecurityChange}
                  onSave={handleSaveSecurity}
                />
              </TabsContent>
              <TabsContent value="appearance">
                <AppearanceSettings
                  theme={appearanceSettings}
                  onThemeChange={setAppearanceSettings}
                  onSave={handleSaveAppearance}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
