"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  Bell,
  CircleHelp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Function to check if the screen size is mobile
const isMobile = () => window.innerWidth <= 640;

const Sidebar = ({ className = "" }: { className?: string }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isMobileView, setIsMobileView] = useState(false);

  // Update the isMobileView state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());

    // Initialize on load
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobileView ? (
        // Mobile layout
        <div
          className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50`}
        >
          <div className="flex justify-around items-center py-4">
            <Link href="/dashboard">
              <div className="flex flex-col items-center">
                <LayoutDashboard
                  className={`w-6 h-6 ${
                    isActive("/dashboard") ? "text-[#3CAE06]" : "text-[#808080]"
                  }`}
                />
              </div>
            </Link>
            <Link href="/orders">
              <div className="flex flex-col items-center">
                <Package
                  className={`w-6 h-6 ${
                    isActive("/orders") ? "text-[#3CAE06]" : "text-[#808080]"
                  }`}
                />
              </div>
            </Link>
            <Link href="/notifications">
              <div className="flex flex-col items-center">
                <Bell
                  className={`w-6 h-6 ${
                    isActive("/notifications")
                      ? "text-[#3CAE06]"
                      : "text-[#808080]"
                  }`}
                />
              </div>
            </Link>
            <Link href="/settings">
              <div className="flex flex-col items-center">
                <Settings
                  className={`w-6 h-6 ${
                    isActive("/settings")
                      ? "text-[#3CAE06]"
                      : "text-[#808080]"
                  }`}
                />
              </div>
            </Link>
         
          </div>
        </div>
      ) : (
        // Desktop layout
        <div
          className={`fixed w-auto z-50 h-full border-r border-gray-200 p-4 flex flex-col justify-between ${className}`}
        >
          {/* Top Section */}
          <div>
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/whizz_logo_black.png"
                alt="Whizz Logo"
                width={100}
                height={100}
                className="object-contain mb-6 w-16 h-8"
              />
            </div>
            <nav className="flex flex-col items-center space-y-6">
              <Link href="/dashboard">
                <div
                  className={`flex justify-center ${
                    isActive("/dashboard") ? "text-[#3CAE06]" : "text-[#808080]"
                  }`}
                >
                  <LayoutDashboard
                    className={`w-6 h-6 isActive("/dashboard")`}
                  />
                </div>
              </Link>
              <Link href="/orders">
                <div
                  className={`flex justify-center ${
                    isActive("/orders") ? "text-[#3CAE06]" : "text-[#808080]"
                  }`}
                >
                  <Package className={`w-6 h-6 isActive("/orders")`} />
                </div>
              </Link>
              <Link href="/settings">
                <div
                  className={`flex justify-center ${
                    isActive("/settings") ? "text-[#3CAE06]" : "text-[#808080]"
                  }`}
                >
                  <Settings className={`w-6 h-6 isActive("/settings")`} />
                </div>
              </Link>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center space-y-6">
            <Link href="/notifications">
              <div
                className={`flex justify-center ${
                  isActive("/notifications")
                    ? "text-[#3CAE06]"
                    : "text-[#808080]"
                }`}
              >
                <Bell className={`w-6 h-6 isActive("/notifications")`} />
              </div>
            </Link>
            <Link href="/help">
              <div
                className={`flex justify-center ${
                  isActive("/help") ? "text-[#3CAE06]" : "text-[#808080]"
                }`}
              >
                <CircleHelp className={`w-6 h-6 isActive("/help")`} />
              </div>
            </Link>
            <Link href="/profile-menu">
              <Image
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Profile Picture"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full border-2"
                style={{
                  borderColor: isActive("/profile-menu") ? "#3CAE06" : "transparent",
                }}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
