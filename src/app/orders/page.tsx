'use client'
import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrderHistorySection from "@/components/orders/OrderHistorySection";
import { Download } from "lucide-react"; // Importing the Download icon
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store"; // Import RootState to ensure proper typing
import OrderDetailModal from "@/components/orders/OrderDetailModal"; // Import the OrderDetailModal
import { Order } from "@/redux/orderHistorySlice"; // Import the Order type from the Redux slice

const isMobile = () => window.innerWidth <= 820;

const OrderHistory = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false); // State for selecting orders
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set()); // Track selected orders
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null); // Track the selected order for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open/close state

  // Access the orders from the Redux store
  const orders = useSelector((state: RootState) => state.orderHistory);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectAll = () => {
    // Function to select all orders
    const allOrderIds = orders.map((order) => order.id);
    setSelectedOrders(new Set(allOrderIds));
  };

  const handleCancelSelection = () => {
    // Function to cancel selection
    setIsSelecting(false);
    setSelectedOrders(new Set());
  };

  const handleOrderClick = (order: Order) => {
    // Set selected order and open the modal
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        // Mobile Layout
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 p-4 mb-[5rem] flex flex-col space-y-4">
              {/* Move the heading and buttons to this section */}
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
                        className="rounded-full flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>Export</span>
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
                        className="rounded-full flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>Export</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <OrderHistorySection
                isSelecting={isSelecting}
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                onOrderClick={handleOrderClick} // Pass the handleOrderClick to OrderHistorySection
              />
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
              {/* Move the heading and buttons to this section */}
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
                onOrderClick={handleOrderClick} // Pass the handleOrderClick to OrderHistorySection
              />
            </main>
          </div>
        </div>
      )}

      {/* Modal for showing order details */}
      {isModalOpen && selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OrderHistory;
