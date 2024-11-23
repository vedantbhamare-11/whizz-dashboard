"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Bell, User, Menu } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onMenuToggle?: () => void;
  showSwitch?: boolean; // Controls the visibility of the Online/Offline Switch
  showBell?: boolean; // Controls the visibility of the Bell icon
  showUser?: boolean; // Controls the visibility of the User icon
  showHamburger?: boolean; // Controls the visibility of the Hamburger Menu icon
}

const Header = ({
  onMenuToggle,
  showSwitch = true,
  showBell = true,
  showUser = true,
  showHamburger = true,
}: HeaderProps) => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left: Hamburger Menu and Logo */}
      <div className="flex items-center space-x-4">
        {showHamburger && onMenuToggle && (
          <button onClick={onMenuToggle} className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        )}
        <Image
          src="/whizz_logo.png"
          alt="Whizz Logo"
          width={100}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Right: Switch, Bell, and User */}
      <div className="flex items-center space-x-6">
        {/* Online/Offline Switch */}
        {showSwitch && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              {isOnline ? "Online" : "Offline"}
            </span>
            <Switch id="online-status" onCheckedChange={() => setIsOnline(!isOnline)} />
          </div>
        )}

        {/* Bell and User Icons */}
        <div className="hidden lg:flex items-center space-x-6">
          {showBell && (
            <div className="relative cursor-pointer">
              <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
          )}
          {showUser && <User className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />}
        </div>
      </div>
    </div>
  );
};

export default Header;
