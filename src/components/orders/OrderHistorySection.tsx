import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 
import { Order, OrderType } from "@/redux/orderHistorySlice";
import OrderDetailModal from "./OrderDetailModal"; 

const OrderHistorySection = () => {
  const orders = useSelector((state: RootState) => state.orderHistory); 
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null); // Track selected order

  const handleOrderClick = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId); 
    if (order) {
      setSelectedOrder(order); 
    } else {
      setSelectedOrder(null); 
    }
  };

  // Function to get the color for the order type
  const getOrderTypeColor = (type: OrderType) => {
    switch (type) {
      case OrderType.FOOD:
        return "text-[#FF8000]";  // Food type color
      case OrderType.MEDICINE:
        return "text-[#188F00]";  // Medicine type color
      case OrderType.CUSTOM_PACKAGE:
        return "text-[#BDA700]";  // Custom Package type color
      default:
        return "text-[#808080]";  // Default gray color for unknown types
    }
  };

  return (
    <div className="p-4 flex flex-col h-full lg:border lg:rounded-lg lg:shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Order</TableHead>
            <TableHead className="text-black">Customer Name</TableHead>
            <TableHead className="text-black">Customer Number</TableHead>
            <TableHead className="text-black">Pickup</TableHead>
            <TableHead className="text-black">Delivery</TableHead>
            <TableHead className="text-black">Pickup Time</TableHead>
            <TableHead className="text-black">Delivery Time</TableHead>
            <TableHead className="text-black">Item</TableHead>
            <TableHead className="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-gray-500">No orders found</TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-[#808080]">#{order.id}</TableCell>
                <TableCell className="text-[#808080]">{order.customerName}</TableCell>
                <TableCell className="text-[#808080]">{order.customerNumber}</TableCell>
                <TableCell className="text-[#808080]">{order.pickup}</TableCell>
                <TableCell className="text-[#808080]">{order.delivery}</TableCell>
                <TableCell className="text-[#808080]">{order.pickupTime || "N/A"}</TableCell>
                <TableCell className="text-[#808080]">{order.deliveryTime || "N/A"}</TableCell>
                <TableCell className={getOrderTypeColor(order.type)}>{order.type}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleOrderClick(order.id)}
                    className="bg-[#3CAE06] text-xs text-white rounded-full px-4 py-1"
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
