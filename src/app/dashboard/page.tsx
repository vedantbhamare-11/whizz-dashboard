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
      <Sidebar
        onClose={() => setIsSidebarOpen(false)}
        className=""
      />
      <div className="flex-1 flex flex-col">
        <div className="mb-16">
        <Header />
        </div>
        <main className="flex-1 p-4 ml-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <OrderSection />
            {!isMobile && <MapSection />}
          </div>
          <UpcomingOrdersSection />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
