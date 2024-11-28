"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import OrderSection from "@/components/dashboard/OrderSection";
import MapSection from "@/components/dashboard/MapSection";
import UpcomingOrdersSection from "@/components/dashboard/UpcomingOrdersSection";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-[3rem]">
          <Header />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 flex ml-[5rem]">
          {/* Left Column (40%) */}
          <div className="lg:w-[35%]">
            <UpcomingOrdersSection />
          </div>

          {/* Right Column (60%) */}
          <div className="lg:w-[70%] flex flex-col">
            {/* Top Row (70%) */}
            <div className=" mb-4">
              <MapSection />
            </div>

            {/* Bottom Row (30%) */}
            <div className="h-[30%]">
              <OrderSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
