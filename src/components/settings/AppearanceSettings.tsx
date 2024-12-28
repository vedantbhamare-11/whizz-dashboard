"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppearanceSettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  onSave: () => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  theme,
  onThemeChange,
  onSave,
}) => {
  return (
    <Card className="p-6 space-y-8">
      <h2 className="text-lg font-bold lg:text-center">Appearance</h2>
      <div>
        <p className="text-sm font-medium mb-4">Color Theme</p>
        <Tabs defaultValue={theme} onValueChange={onThemeChange} className="flex justify-center w-full">
          <TabsList className="w-full bg-white border border-gray-200 flex space-x-2">
            <TabsTrigger
              value="light"
              className="w-full text-sm font-medium rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
            >
              Light
            </TabsTrigger>
            <TabsTrigger
              value="dark"
              className="w-full text-sm font-medium rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
            >
              Dark
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="w-full text-sm font-medium rounded-md hover:bg-gray-100 data-[state=active]:bg-[#3CAE06] data-[state=active]:text-white"
            >
              System
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={onSave}
          className="lg:w-1/2 w-full rounded-full bg-[#3CAE06] text-white hover:bg-green-700"
        >
          Save Appearance Settings
        </Button>
      </div>
    </Card>
  );
};

export default AppearanceSettings;
