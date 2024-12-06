import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OrderDetailModal from "./OrderDetailModal"; // Import the modal component

const OrderHistorySection = () => {
  const orders = useSelector((state: RootState) => state.orderHistory); // Select order history from redux store
  const [selectedOrder, setSelectedOrder] = useState(null);  // Track selected order

  const handleOrderClick = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId); // Find the selected order by ID
    setSelectedOrder(order);  // Set the clicked order as selected
  };

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="lg:p-6 p-2">
        <CardTitle className="mb-4">Order History</CardTitle>
      </CardHeader>

      <CardContent className="lg:px-6 p-0">
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div>No orders in history</div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg cursor-pointer"
                onClick={() => handleOrderClick(order.id)}  // Add onClick handler
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="font-semibold text-lg">
                    Order ID: #{order.id}
                  </div>
                
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {/* Modal for displaying selected order details */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}  // Close modal when clicking close button
        />
      )}
    </div>
  );
};

export default OrderHistorySection;
