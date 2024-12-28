"use client";

import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationsSettings from "@/components/settings/NotificationsSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

const isMobile = () => window.innerWidth <= 820;

const SettingsPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

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

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTabs = () => (
    <Tabs defaultValue="notifications" className="w-full">
      <TabsList className="flex justify-around bg-white border border-gray-200">
        <TabsTrigger
          value="notifications"
          className="w-full text-center text-sm font-medium rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="w-full text-center text-sm font-medium rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
        >
          Security
        </TabsTrigger>
        <TabsTrigger
          value="appearance"
          className="w-full text-center text-sm font-medium rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
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
  );

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        // Mobile Layout
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 p-4">
              <div className="mt-6 mx-auto w-full max-w-md">{renderTabs()}</div>
            </main>
          </div>
        </div>
      ) : (
        // Desktop Layout
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 mt-[4rem] ml-[6rem]">
              <div className="w-3/4 mx-auto">{renderTabs()}</div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
