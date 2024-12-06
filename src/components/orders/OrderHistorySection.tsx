import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import the Card component
import OrderDetailModal from "./OrderDetailModal"; // Import the modal component
import { Order } from "@/redux/orderHistorySlice";

const OrderHistorySection = () => {
  const orders = useSelector((state: RootState) => state.orderHistory); // Select order history from redux store
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null); // Track selected order

  const handleOrderClick = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId); // Find the selected order by ID
    if (order) {
      setSelectedOrder(order); // Set the clicked order as selected if found
    } else {
      setSelectedOrder(null); // If no order is found, reset to null
    }
  };

  return (
    <div className="flex flex-col h-full lg:border lg:rounded-lg lg:shadow-sm ">
      <CardHeader className="lg:p-6 p-4">
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent className="lg:px-6 p-4">
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div>No orders in history</div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => handleOrderClick(order.id)} // Add onClick handler
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
          onClose={() => setSelectedOrder(null)} // Close modal when clicking close button
        />
      )}
    </div>
  );
};

export default OrderHistorySection;
