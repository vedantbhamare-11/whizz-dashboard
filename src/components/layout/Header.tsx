"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Bell, User } from "lucide-react";
import Image from "next/image";

const Header = () => {
  // State to track online/offline status
  const [isOnline, setIsOnline] = useState(false);

  // Function to handle the switch toggle
  const handleSwitchToggle = () => {
    setIsOnline((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Image
          src="/whizz_logo.png" // Replace with the path to your "Whizz" logo
          alt="Whizz Logo"
          width={100}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Right Side: Switch, Bell Icon, and User Icon */}
      <div className="flex items-center space-x-6">
        {/* Online/Offline Switch */}
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium text-gray-600`}>
            {isOnline ? "Online" : "Offline"}
          </span>
          <Switch id="online-status" onCheckedChange={handleSwitchToggle} />
        </div>

        {/* Bell Icon */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          {/* Notification badge */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User Icon */}
        <div className="cursor-pointer">
          <User className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default Header;
