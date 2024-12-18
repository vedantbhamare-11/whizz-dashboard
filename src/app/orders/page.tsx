"use client";
import { useState, useLayoutEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrderHistorySection from "@/components/orders/OrderHistorySection";
import { Download } from "lucide-react"; // Importing the Download icon
import { Button } from "@/components/ui/button";

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
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Order History</h1>
                <div className="flex space-x-4">
                  {/* Select All Button */}
                  <button className="px-4 py-2 text-white rounded-md text-sm">
                    Select All
                  </button>
                  {/* Cancel Button */}
                  <Button className="px-4 py-2 bg-red-500 text-white rounded-md text-sm">
                    Cancel
                  </Button>
                  {/* Export Button with Download Icon */}
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md text-sm flex items-center space-x-2">
                    <Download className="text-white" size={16} />
                    <span>Export</span>
                  </button>
                </div>
              </div>
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
            <main className="flex-1 p-4 mt-[4rem] ml-[6rem]">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Order History</h1>
                <div className="flex space-x-4">
                  {/* Select All Button */}
                  <Button variant={"outline"} className="px-4 py-2  rounded-full text-sm">
                    Select All
                  </Button>
                  {/* Cancel Button */}
                  <Button variant={"outline"} className="px-4 py-2 rounded-full text-sm">
                    Cancel
                  </Button>
                  {/* Export Button with Download Icon */}
                  <Button className="px-4 py-2 bg-[#3CAE06] text-white rounded-full text-sm flex items-center">
                    <span>Export</span>
                    <Download className="text-white" size={16} />
                  </Button>
                </div>
              </div>
              <OrderHistorySection />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
