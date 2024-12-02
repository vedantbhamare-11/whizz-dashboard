"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, Bell, CircleHelp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Function to check if the screen size is mobile
const isMobile = () => window.innerWidth <= 640;

const Sidebar = ({
  className = "",
}: {
  className?: string;
}) => {
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
        <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50`}>
          <div className="flex justify-around items-center py-4">
            <Link href="/dashboard">
              <div className="flex flex-col items-center">
                <LayoutDashboard 
                  className={`w-6 h-6 ${isActive("/dashboard") ? "text-[#3CAE06]" : "text-[#808080]"}`} 
                  fill={isActive("/dashboard") ? "#3CAE06" : "none"} 
                />
                <span className={`text-xs ${isActive("/dashboard") ? "text-[#3CAE06]" : "text-[#808080]"}`}>Dashboard</span>
              </div>
            </Link>
            <Link href="/orders">
              <div className="flex flex-col items-center">
                <Package 
                  className={`w-6 h-6 ${isActive("/orders") ? "text-[#3CAE06]" : "text-[#808080]"}`} 
                  fill={isActive("/orders") ? "#3CAE06" : "none"} 
                />
                <span className={`text-xs ${isActive("/orders") ? "text-[#3CAE06]" : "text-[#808080]"}`}>Orders</span>
              </div>
            </Link>
            <Link href="/notifications">
              <div className="flex flex-col items-center">
                <Bell 
                  className={`w-6 h-6 ${isActive("/notifications") ? "text-[#3CAE06]" : "text-[#808080]"}`} 
                  fill={isActive("/notifications") ? "#3CAE06" : "none"} 
                />
                <span className={`text-xs ${isActive("/notifications") ? "text-[#3CAE06]" : "text-[#808080]"}`}>Notifications</span>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex flex-col items-center">
                <Image
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="rounded-full object-cover border-2"
                />
                <span className={`text-xs ${isActive("/profile") ? "text-[#3CAE06]" : "text-[#808080]"}`}>Profile</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        // Desktop layout
        <div className={`fixed w-auto z-50 h-full border-r border-gray-200 p-4 flex flex-col justify-between ${className}`}>
          {/* Top Section */}
          <div>
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/whizz_logo_black.png"
                alt="Whizz Logo"
                width={60}
                height={24}
                className="object-contain mb-6"
              />
            </div>
            <nav className="flex flex-col items-center space-y-6">
              <Link href="/dashboard">
                <div className={`flex justify-center ${isActive("/dashboard") ? "text-[#3CAE06]" : "text-[#808080]"}`}>
                  <LayoutDashboard
                    className={`w-6 h-6 ${isActive("/dashboard") ? "fill-current" : ""}`}
                    fill={isActive("/dashboard") ? "#3CAE06" : "none"}
                  />
                </div>
              </Link>
              <Link href="/orders">
                <div className={`flex justify-center ${isActive("/orders") ? "text-[#3CAE06]" : "text-[#808080]"}`}>
                  <Package
                    className={`w-6 h-6 ${isActive("/orders") ? "fill-current" : ""}`}
                    fill={isActive("/orders") ? "#3CAE06" : "none"}
                  />
                </div>
              </Link>
              <Link href="/settings">
                <div className={`flex justify-center ${isActive("/settings") ? "text-[#3CAE06]" : "text-[#808080]"}`}>
                  <Settings
                    className={`w-6 h-6 ${isActive("/settings") ? "fill-current" : ""}`}
                    fill={isActive("/settings") ? "#3CAE06" : "none"}
                  />
                </div>
              </Link>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center space-y-6">
            <Link href="/notifications">
              <div className={`flex justify-center ${isActive("/notifications") ? "text-[#3CAE06]" : "text-[#808080]"}`}>
                <Bell
                  className={`w-6 h-6 ${isActive("/notifications") ? "fill-current" : ""}`}
                  fill={isActive("/notifications") ? "#3CAE06" : "none"}
                />
              </div>
            </Link>
            <Link href="/help">
              <div className={`flex justify-center ${isActive("/help") ? "text-[#3CAE06]" : "text-[#808080]"}`}>
                <CircleHelp
                  className={`w-6 h-6 ${isActive("/help") ? "fill-current" : ""}`}
                  fill={isActive("/help") ? "#3CAE06" : "none"}
                />
              </div>
            </Link>
            <Link href="/profile">
              <Image
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Profile Picture"
                width={36}
                height={36}
                className="rounded-full border-2"
                style={{
                  borderColor: isActive("/profile") ? "#3CAE06" : "transparent",
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
