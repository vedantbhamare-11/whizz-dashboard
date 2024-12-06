"use client";
import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrderHistorySection from "@/components/orders/OrderHistorySection";

const isMobile = () => window.innerWidth <= 820;

const OrderHistory = () => {
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
            <main className="flex-1 p-4 mb-[5rem] flex flex-col space-y-4">
              <OrderHistorySection />
            </main>
          </div>
        </div>
      ) : (
        // Desktop Layout
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 mt-[3rem] ml-[5rem]">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 p-4">
                  <OrderHistorySection />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
