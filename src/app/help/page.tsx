"use client";
import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header"; // Import Header
import Sidebar from "@/components/layout/Sidebar"; // Import Sidebar
import { Mail, Phone } from "lucide-react"; // Import Lucide icons for email and phone

const isMobile = () => window.innerWidth <= 820;

const HelpCenterPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        // Mobile Layout
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 p-4 ">
              <h1 className="text-2xl font-bold mb-6">Help Center</h1>
              {/* Cards container */}
              <div className="w-full grid grid-cols-1 gap-6">
                {/* First Card - Senior Support Specialist */}
                <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col space-y-4">
                  <h2 className="text-xl font-semibold">Support Team</h2>
                  {/* Name and Designation */}
                  <div>
                    <p className="font-medium text-black">John Doe</p>
                    <p className="text-sm text-[#808080]">
                      Senior Support Specialist | john.doe@example.com
                    </p>
                  </div>
                  {/* Email and Phone */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail size={18} className="" />
                      <span className="text-sm text-black">
                        support.john@example.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={18} className="" />
                      <span className="text-sm text-[#2793EC]">
                        +1 800-123-4567
                      </span>
                    </div>
                  </div>
                </div>

                {/* Second Card - Technical Support */}
                <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col space-y-4">
                  <h2 className="text-xl font-semibold">Support Team</h2>
                  {/* Name and Designation */}
                  <div>
                    <p className="font-medium text-black">Jane Smith</p>
                    <p className="text-sm text-[#808080]">
                      Technical Support | jane.smith@example.com
                    </p>
                  </div>
                  {/* Email and Phone */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail size={18} className="" />
                      <span className="text-sm text-black">
                        support.jane@example.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={18} className="" />
                      <span className="text-sm text-[#2793EC]">
                        +1 800-987-6543
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        // Desktop Layout
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 mt-[4rem] ml-[6rem]">
              <h1 className="text-2xl font-bold mb-6">Help Center</h1>
              {/* Cards container */}
              <div className="flex gap-4">
                {/* First Card - Senior Support Specialist */}
                <div className="bg-white border border-gray-300 rounded-lg p-6  w-1/3 flex flex-col space-y-4">
                  <h2 className="text-xl font-semibold">Support Team</h2>
                  {/* Name and Designation */}
                  <div>
                    <p className="font-medium text-black">John Doe</p>
                    <p className="text-sm text-[#808080]">
                      Senior Support Specialist | john.doe@example.com
                    </p>
                  </div>
                  {/* Email and Phone */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail size={18} className="" />
                      <span className="text-sm text-black">
                        support.john@example.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={18} className="" />
                      <span className="text-sm text-[#2793EC]">
                        +1 800-123-4567
                      </span>
                    </div>
                  </div>
                </div>

                {/* Second Card - Technical Support */}
                <div className="bg-white border border-gray-300 rounded-lg w-1/3 p-6 flex flex-col space-y-4">
                  <h2 className="text-xl font-semibold">Support Team</h2>
                  {/* Name and Designation */}
                  <div>
                    <p className="font-medium text-black">Jane Smith</p>
                    <p className="text-sm text-[#808080]">
                      Technical Support | jane.smith@example.com
                    </p>
                  </div>
                  {/* Email and Phone */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail size={18} className="" />
                      <span className="text-sm text-black">
                        support.jane@example.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={18} className="" />
                      <span className="text-sm text-[#2793EC]">
                        +1 800-987-6543
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenterPage;
