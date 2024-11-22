"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import to get current pathname
import { LayoutDashboard, CircleHelp, Package, Settings, X, Bell, User } from "lucide-react";
import Image from "next/image";

const Sidebar = ({
  onClose,
  className = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}) => {
  const pathname = usePathname(); // Get the current path

  // Helper function to determine if a tab is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className={`w-3/4 sm:w-64 h-full bg-gray-100 shadow-md p-4 ${className}`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8 lg:hidden">
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
        <Image
          src="/whizz_logo.png"
          alt="Whizz Logo"
          width={100}
          height={40}
          className="object-contain"
        />
        <div className="flex items-center space-x-4">
          {/* Bell Icon */}
          <div className="relative cursor-pointer">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* User Icon */}
          <User className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
      </div>

      {/* Sidebar Links */}
      <nav className="space-y-8">
        <Link
          href="/dashboard"
          className={`flex items-center space-x-4 ${
            isActive("/dashboard") ? "text-black" : "text-[#808080]"
          }`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-xl">Dashboard</span>
        </Link>
        <Link
          href="/orders"
          className={`flex items-center space-x-4 ${
            isActive("/orders") ? "text-black" : "text-[#808080]"
          }`}
        >
          <Package className="w-6 h-6" />
          <span className="text-xl">Orders</span>
        </Link>
        <Link
          href="/help"
          className={`flex items-center space-x-4 ${
            isActive("/help") ? "text-black" : "text-[#808080]"
          }`}
        >
          <CircleHelp className="w-6 h-6" />
          <span className="text-xl">Help & Support</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center space-x-4 ${
            isActive("/settings") ? "text-black" : "text-[#808080]"
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xl">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
