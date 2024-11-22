"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import to get current pathname
import { LayoutDashboard, CircleHelp, Package, Settings } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  // Helper function to determine if a tab is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 h-full bg-gray-100 shadow-md p-4">
      <nav className="space-y-8">
        <Link
          href="/dashboard"
          className={`flex items-center space-x-4 ml-4 ${
            isActive("/dashboard") ? "text-black" : "text-gray-500"
          }`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-xl">Dashboard</span>
        </Link>
        <Link
          href="/orders"
          className={`flex items-center space-x-4 ml-4 ${
            isActive("/orders") ? "text-black" : "text-gray-500"
          }`}
        >
          <Package className="w-6 h-6" />
          <span className="text-xl">Orders</span>
        </Link>
        <Link
          href="/help"
          className={`flex items-center space-x-4 ml-4 ${
            isActive("/help") ? "text-black" : "text-gray-500"
          }`}
        >
          <CircleHelp className="w-6 h-6" />
          <span className="text-xl">Help & Support</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center space-x-4 ml-4 ${
            isActive("/settings") ? "text-black" : "text-gray-500"
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
