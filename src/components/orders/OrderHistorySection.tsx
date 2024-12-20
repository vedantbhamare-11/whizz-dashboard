import { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { RootState } from "@/redux/store"; // Import RootState for type safety
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 
import { Order, OrderType } from "@/redux/orderHistorySlice"; // Import Order type
import { parse, differenceInMinutes, isValid } from 'date-fns'; // Using date-fns for time manipulation
import { MoreVertical, Eye, Download, Trash } from "lucide-react"; // Icons
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Shadcn Popover components
import { Separator } from "@/components/ui/separator";

interface OrderHistorySectionProps {
  isSelecting: boolean;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
  onOrderClick: (order: Order) => void; // Add onOrderClick function prop
}

const OrderHistorySection = ({
  isSelecting,
  selectedOrders,
  setSelectedOrders,
  onOrderClick,
}: OrderHistorySectionProps) => {
  const orders = useSelector((state: RootState) => state.orderHistory);

  const handleCheckboxChange = (orderId: string) => {
    const newSelectedOrders = new Set(selectedOrders);
    if (newSelectedOrders.has(orderId)) {
      newSelectedOrders.delete(orderId);
    } else {
      newSelectedOrders.add(orderId);
    }
    setSelectedOrders(newSelectedOrders);
  };

  const calculateDeliveredTime = (pickupTime: string | undefined, deliveryTime: string | undefined) => {
    if (!pickupTime || !deliveryTime) return "N/A";
    const pickupDate = parse(pickupTime, "hh:mm a", new Date());
    const deliveryDate = parse(deliveryTime, "hh:mm a", new Date());
    if (!isValid(pickupDate) || !isValid(deliveryDate)) return "N/A";
    const minutes = differenceInMinutes(deliveryDate, pickupDate);
    return `${minutes}m`;
  };

  const getOrderStatus = (pickupTime: string | undefined, deliveryTime: string | undefined) => {
    return deliveryTime ? "Delivered" : "Canceled";
  };

  const getOrderTypeColor = (type: OrderType) => {
    switch (type) {
      case OrderType.FOOD:
        return "text-[#FF8000]";
      case OrderType.MEDICINE:
        return "text-[#188F00]";
      case OrderType.CUSTOM_PACKAGE:
        return "text-[#BDA700]";
      default:
        return "text-[#808080]";
    }
  };

  // Handle the popover actions (e.g., View Details, Export, Delete)
  const handleViewDetails = (order: Order) => {
    // Trigger the order detail view
    onOrderClick(order);
  };

  const handleExport = (orderId: string) => {
    console.log("Exporting order", orderId);
    // Add export functionality here
  };

  const handleDelete = (orderId: string) => {
    console.log("Deleting order", orderId);
    // Add delete functionality here
  };

  return (
    <div className="p-4 flex flex-col h-full lg:border lg:rounded-lg lg:shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {isSelecting && <TableHead className="text-black">Select</TableHead>}
            <TableHead className="text-black">Order</TableHead>
            <TableHead className="text-black">Customer Name</TableHead>
            <TableHead className="text-black">Customer Number</TableHead>
            <TableHead className="text-black">Pickup</TableHead>
            <TableHead className="text-black">Delivery</TableHead>
            <TableHead className="text-black">Delivered</TableHead>
            <TableHead className="text-black">Status</TableHead>
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
                {isSelecting && (
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.has(order.id)}
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </TableCell>
                )}
                <TableCell className="text-[#808080]">#{order.id}</TableCell>
                <TableCell className="text-[#808080]">{order.customerName}</TableCell>
                <TableCell className="text-[#808080]">{order.customerNumber}</TableCell>
                <TableCell className="text-[#808080]">{order.pickup}</TableCell>
                <TableCell className="text-[#808080]">{order.delivery}</TableCell>
                <TableCell className="text-[#808080]">{calculateDeliveredTime(order.pickupTime, order.deliveryTime)}</TableCell>
                <TableCell className="text-[#808080]">{getOrderStatus(order.pickupTime, order.deliveryTime)}</TableCell>
                <TableCell className={getOrderTypeColor(order.type)}>{order.type}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-600 hover:text-black">
                        <MoreVertical size={16} /> {/* Vertical 3 dots icon */}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-auto p-2 flex flex-col space-y-2">
                      <button
                        onClick={() => handleViewDetails(order)} 
                        className="w-auto flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>
                      <Separator />
                      <button
                        onClick={() => handleExport(order.id)}
                        className=" w-auto flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
                      >
                        <Download size={16} />
                        <span>Export</span>
                      </button>
                      <Separator />
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="w-auto flex items-center space-x-2 text-sm text-red-600 hover:bg-gray-100 rounded-md px-2 py-1"
                      >
                        <Trash size={16} />
                        <span>Delete</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistorySection;
