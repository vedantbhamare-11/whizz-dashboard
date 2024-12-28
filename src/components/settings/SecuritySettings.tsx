// SecuritySettings.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SecuritySettingsProps {
  settings: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorAuthentication: boolean;
  };
  onInputChange: (field: keyof SecuritySettingsProps["settings"], value: string) => void;
  onSwitchChange: (field: keyof SecuritySettingsProps["settings"], value: boolean) => void;
  onSave: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  settings,
  onInputChange,
  onSwitchChange,
  onSave,
}) => {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-lg font-bold text-center">Security Settings</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={settings.currentPassword}
            onChange={(e) => onInputChange("currentPassword", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={settings.newPassword}
            onChange={(e) => onInputChange("newPassword", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={settings.confirmPassword}
            onChange={(e) => onInputChange("confirmPassword", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Two-Factor Authentication</p>
        </div>
        <Switch
          checked={settings.twoFactorAuthentication}
          onCheckedChange={(checked) => onSwitchChange("twoFactorAuthentication", checked)}
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={onSave}
          className="w-1/2 rounded-full bg-[#3CAE06] text-white hover:bg-green-700"
        >
          Save Security Settings
        </Button>
      </div>
    </Card>
  );
};

export default SecuritySettings;
