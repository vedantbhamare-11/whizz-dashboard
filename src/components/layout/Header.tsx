"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { CircleHelp } from "lucide-react";
import Image from "next/image";

// Function to check if the screen size is mobile
const isMobile = () => window.innerWidth <= 640;

const Header = () => {
  const [isOnline, setIsOnline] = useState(false);
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
      {/* Conditional rendering for mobile and larger screens */}
      {isMobileView ? (
        // Mobile layout
        <div className="w-full fixed top-0 left-0 flex justify-between px-6 py-4 bg-[#3CAE06]  z-50">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Image
              src="/whizz_logo.png"
              alt="Whizz Logo"
              width={60}
              height={24}
              className="object-contain"
            />
          </div>

          {/* Right Section: Switch and Help Icon */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-white">
              {isOnline ? "Online" : "Offline"}
            </span>
            <Switch
              id="online-status"
              onCheckedChange={() => setIsOnline(!isOnline)}
            />
            <CircleHelp className="text-white w-6 h-6" />
          </div>
        </div>
      ) : (
        // Desktop layout
        <div className="w-full fixed flex justify-end px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              {isOnline ? "Online" : "Offline"}
            </span>
            <Switch
              id="online-status"
              onCheckedChange={() => setIsOnline(!isOnline)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
