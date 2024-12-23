"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order, OrderType } from "@/redux/orderHistorySlice";
import { MoreVertical, Eye, Download, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { parse, differenceInMinutes, isValid } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import OrderDetailModal from "./OrderDetailModal";

interface OrderHistorySectionProps {
  isSelecting: boolean;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
  onOrderClick: (order: Order) => void;
}

const isMobile = () => window.innerWidth <= 820;

const OrderHistorySection = ({
  isSelecting,
  selectedOrders,
  setSelectedOrders,
  onOrderClick,
}: OrderHistorySectionProps) => {
  const orders = useSelector((state: RootState) => state.orderHistory);
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheckboxChange = (orderId: string) => {
    const newSelectedOrders = new Set(selectedOrders);
    if (newSelectedOrders.has(orderId)) {
      newSelectedOrders.delete(orderId);
    } else {
      newSelectedOrders.add(orderId);
    }
    setSelectedOrders(newSelectedOrders);
  };

  const calculateDeliveredTime = (
    pickupTime: string | undefined,
    deliveryTime: string | undefined
  ) => {
    if (!pickupTime || !deliveryTime) return "N/A";
    const pickupDate = parse(pickupTime, "hh:mm a", new Date());
    const deliveryDate = parse(deliveryTime, "hh:mm a", new Date());
    if (!isValid(pickupDate) || !isValid(deliveryDate)) return "N/A";
    const minutes = differenceInMinutes(deliveryDate, pickupDate);
    return `${minutes}m`;
  };

  const getOrderStatus = (
    pickupTime: string | undefined,
    deliveryTime: string | undefined
  ) => {
    return deliveryTime ? "Delivered" : "Canceled";
  };
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
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

  if (isMobileView) {
    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {isSelecting && (
                  <Checkbox
                    checked={selectedOrders.has(order.id)}
                    onCheckedChange={() => handleCheckboxChange(order.id)}
                  />
                )}
                <div className="text-sm text-[#808080] font-medium">
                  Order ID: #{order.id}
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-600 hover:text-black">
                    <MoreVertical size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-auto p-2 flex flex-col space-y-2"
                >
                  <button
                    onClick={() => onOrderClick(order)}
                    className="flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  <Separator />
                  <button className="flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                  <Separator />
                  <button className="flex items-center space-x-2 text-sm text-red-600 hover:bg-gray-100 px-2 py-1 rounded-md">
                    <Trash size={16} />
                    <span>Delete</span>
                  </button>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-black">
                  Customer Name
                </div>
                <div className="text-sm text-[#808080]">
                  {order.customerName}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-black">
                  Customer Number
                </div>
                <div className="text-sm text-[#808080]">
                  {order.customerNumber}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-black">
                  Delivered In
                </div>
                <div className="text-sm text-[#808080]">
                  {calculateDeliveredTime(order.pickupTime, order.deliveryTime)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-black">Status</div>
                <div className="text-sm text-[#808080]">
                  {getOrderStatus(order.pickupTime, order.deliveryTime)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 lg:border lg:rounded-lg lg:shadow-sm">
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableRow>
            {isSelecting && (
              <TableHead className="text-black">Select</TableHead>
            )}
            <TableHead className="text-black">Order</TableHead>
            <TableHead className="text-black">Customer Name</TableHead>
            <TableHead className="text-black">Customer Number</TableHead>
            <TableHead className="text-black">Pickup</TableHead>
            <TableHead className="text-black">Delivery</TableHead>
            <TableHead className="text-black">Delivered</TableHead>
            {/* <TableHead className="text-black">Status</TableHead> */}
            <TableHead className="text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {isSelecting && (
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.has(order.id)}
                    onCheckedChange={() => handleCheckboxChange(order.id)}
                  />
                </TableCell>
              )}
              <TableCell>#{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerNumber}</TableCell>
              <TableCell>{order.pickup}</TableCell>
              <TableCell>{order.delivery}</TableCell>
              <TableCell>
                {calculateDeliveredTime(order.pickupTime, order.deliveryTime)}
              </TableCell>
              {/* <TableCell>
                {getOrderStatus(order.pickupTime, order.deliveryTime)}
              </TableCell> */}
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-600 hover:text-black">
                      <MoreVertical size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="w-auto p-2 flex flex-col space-y-2"
                  >
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <Separator />
                    <button className="flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 rounded-md">
                      <Download size={16} />
                      <span>Export</span>
                    </button>
                    <Separator />
                    <button className="flex items-center space-x-2 text-sm text-red-600 hover:bg-gray-100 px-2 py-1 rounded-md">
                      <Trash size={16} />
                      <span>Delete</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderHistorySection;
