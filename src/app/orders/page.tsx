"use client";
import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react"; 
import { RootState } from "@/redux/store";
import MobileOrderCard from "@/components/orders/MobileOrderCard";
import OrderHistorySection from "@/components/orders/OrderHistorySection";

const isMobile = () => window.innerWidth <= 820;

const OrderHistory = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set()); 

  // Access the orders from the Redux store
  const orders = useSelector((state: RootState) => state.orderHistory);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectAll = () => {
    const allOrderIds = new Set(orders.map((order) => order.id));
    setSelectedOrders(allOrderIds);
  };

  const handleCancelSelection = () => {
    setIsSelecting(false);
    setSelectedOrders(new Set());
  };

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        // Mobile Layout
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 p-4 space-y-4 h-screen">
              <div className="flex flex-col space-y-4">
                <h1 className="text-2xl ml-1 font-bold">Order History</h1>
                <div className="flex space-x-2">
                  {!isSelecting ? (
                    <>
                      <Button
                        variant="outline"
                        className="rounded-full text-xs"
                        onClick={() => setIsSelecting(true)}
                      >
                        Select
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full flex items-center text-xs text-white bg-[#3CAE06]"
                      >
                        <span>Export</span>
                        <Download size={8} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="rounded-full text-xs"
                        onClick={handleSelectAll}
                      >
                        Select All
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full text-xs"
                        onClick={handleCancelSelection}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full flex items-center text-xs text-white bg-[#3CAE06]"
                      >
                        <span>Export</span>
                        <Download size={8} />
                      </Button>
                    </>
                  )}
                </div>
                <div className="pb-20">
                <MobileOrderCard
                  isSelecting={isSelecting}
                  selectedOrders={selectedOrders}
                  setSelectedOrders={setSelectedOrders}
                />
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
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Order History</h1>
                  <div className="flex space-x-4">
                    {!isSelecting ? (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={() => setIsSelecting(true)}
                        >
                          Select
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full flex items-center text-white bg-[#3CAE06]"
                        >
                          <span>Export</span>
                          <Download size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={handleSelectAll}
                        >
                          Select All
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={handleCancelSelection}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full flex items-center text-white bg-[#3CAE06]"
                        >
                          <span>Export</span>
                          <Download size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <OrderHistorySection
                  isSelecting={isSelecting}
                  selectedOrders={selectedOrders}
                  setSelectedOrders={setSelectedOrders}
                  onOrderClick={(order) => console.log("Order clicked", order)}
                />
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
