// ./app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrderSection from "@/components/dashboard/OrderSection";
import MapSection from "@/components/dashboard/MapSection";
import UpcomingOrdersSection from "@/components/dashboard/UpcomingOrdersSection";
import { useLayoutEffect } from "react";


const isMobile = () => window.innerWidth <= 840;

const Dashboard = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    <div className="flex flex-col h-screen w-hw-full bg-[#F3F3F3]">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="fixed inset-0 z-40"></div>
        <Sidebar
        />
       {/* Main Content */}
       <main className="flex-1 p-4 flex flex-col">
          {/* Stacked Sections for Mobile */}
          <div className="w-full">
            {/* Order Section */}
            <div className="mb-4">
              <OrderSection />
            </div>

            {/* Map Section */}
            <div className="mb-4">
              <MapSection />
            </div>

            {/* Upcoming Orders Section */}
            <div>
              <UpcomingOrdersSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  ) : (

    <div className="flex flex-col h-screen bg-[#F3F3F3]">
      <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar />

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
            <div className=" h-[60%] mb-4">
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
    </div>
  )}
  </div>
    
  );
};

export default Dashboard;
