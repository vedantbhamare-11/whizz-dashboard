"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { CircleHelp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Function to check if the screen size is mobile
const isMobile = () => window.innerWidth <= 640;

const Header = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

 { // Update the isMobileView state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());

    // Initialize on load
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
}
  return (
    <div>
      {/* Conditional rendering for mobile and larger screens */}
      {isMobileView ? (
        // Mobile layout
        <div className="w-full fixed top-0 left-0 flex justify-between px-6 py-4 bg-[#3CAE06]  z-50">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Image
              src="/whizz_logo_white.png"
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
            <Link href="/profile">
                <Image
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full w-8 h-8 border-2"
                />
            </Link> 
          </div>
        </div>
      ) : (
        // Desktop layout
        <div className="w-full fixed flex  justify-end px-6 py-4 bg-white border-b border-gray-200">
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
