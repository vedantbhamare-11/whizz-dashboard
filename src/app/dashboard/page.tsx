// Dashboard.tsx
"use client";
import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrderSection from "@/components/dashboard/OrderSection";
import MapSection from "@/components/dashboard/MapSection";
import UpcomingOrdersSection from "@/components/dashboard/UpcomingOrdersSection";

const isMobile = () => window.innerWidth <= 820;

const Dashboard = () => {
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
        <div className="flex flex-col  h-screen w-full">
          <Header/>
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 p-4 flex flex-col space-y-4">
              <OrderSection />
              <MapSection />
              <div className="pb-16">
              <UpcomingOrdersSection />

              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 mt-[3rem] ml-[5rem] flex">
              <div className="lg:w-[35%] mb-[2rem]">
                <UpcomingOrdersSection />
              </div>
              <div className="lg:w-[70%] space-y-6">
                <MapSection />
                <OrderSection />
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
