// NotificationsSettings.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface NotificationSettingsProps {
  settings: {
    newOrganizationRegistrations: boolean;
    newFeedbackSubmissions: boolean;
    systemUpdates: boolean;
  };
  onSwitchChange: (setting: keyof NotificationSettingsProps["settings"]) => void;
  onSave: () => void;
}

const NotificationsSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSwitchChange,
  onSave,
}) => {
  return (
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
            checked={settings.newOrganizationRegistrations}
            onCheckedChange={() => onSwitchChange("newOrganizationRegistrations")}
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
            checked={settings.newFeedbackSubmissions}
            onCheckedChange={() => onSwitchChange("newFeedbackSubmissions")}
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
            checked={settings.systemUpdates}
            onCheckedChange={() => onSwitchChange("systemUpdates")}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={onSave}
          className="w-1/2 rounded-full bg-[#3CAE06] text-white hover:bg-green-700"
        >
          Save Notification Settings
        </Button>
      </div>
    </Card>
  );
};

export default NotificationsSettings;
