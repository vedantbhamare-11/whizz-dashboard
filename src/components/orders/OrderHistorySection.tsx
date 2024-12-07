import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import OrderDetailModal from "./OrderDetailModal"; 
import { Order } from "@/redux/orderHistorySlice";

const OrderHistorySection = () => {
  const orders = useSelector((state: RootState) => state.orderHistory); 
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null); // Track selected order
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleOrderClick = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId); 
    if (order) {
      setSelectedOrder(order); 
    } else {
      setSelectedOrder(null); 
    }
  };

  // Filter orders based on the search query (by Order ID)
  const filteredOrders = orders.filter((order) => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  );

  return (
    <div className="flex flex-col h-full lg:border lg:rounded-lg lg:shadow-sm">
      <CardHeader className="lg:p-6 p-4 flex flex-row justify-between items-center">
        <CardTitle>Order History</CardTitle>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </CardHeader>

      <CardContent className="lg:px-6 p-4">
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div>No orders found</div>
          ) : (
            filteredOrders.map((order) => (
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
