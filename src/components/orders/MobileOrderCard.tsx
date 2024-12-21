"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order } from "@/redux/orderHistorySlice";
import { MoreVertical, SquareArrowOutUpRight, Eye, Download, Trash } from "lucide-react";
import { differenceInMinutes, parse, isValid } from "date-fns";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import OrderDetailModal from "@/components/orders/OrderDetailModal";

interface MobileOrderCardProps {
  isSelecting: boolean;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
}

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

const getOrderStatus = (pickupTime: string | undefined, deliveryTime: string | undefined) => {
  if (deliveryTime) return <span className="text-[#3CAE06]">Delivered</span>;
  return <span className="text-[#EE5F69]">Canceled</span>;
};

const MobileOrderCard: React.FC<MobileOrderCardProps> = ({ isSelecting, selectedOrders, setSelectedOrders }) => {
  const orders = useSelector((state: RootState) => state.orderHistory);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCheckboxChange = (orderId: string) => {
    const newSelectedOrders = new Set(selectedOrders);
    if (newSelectedOrders.has(orderId)) {
      newSelectedOrders.delete(orderId);
    } else {
      newSelectedOrders.add(orderId);
    }
    setSelectedOrders(newSelectedOrders);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleExport = (orderId: string) => {
    console.log("Exporting order", orderId);
  };

  const handleDelete = (orderId: string) => {
    console.log("Deleting order", orderId);
  };

  return (
    <div className=" space-y-4">
      {orders.map((order: Order) => (
        <Card
          key={order.id}
          className="border border-gray-200 rounded-md p-4 bg-white space-y-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {isSelecting && (
                <Checkbox
                  checked={selectedOrders.has(order.id)}
                  onCheckedChange={() => handleCheckboxChange(order.id)}
                />
              )}
              <div className="text-sm text-[#808080] font-medium">Order ID: #{order.id}</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-600 hover:text-black">
                  <MoreVertical size={16} />
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
                  className="w-auto flex items-center space-x-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md px-2 py-1"
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <div className="text-sm text-[#050505] font-medium">Customer Name</div>
              <div className="text-xs text-[#808080]">{order.customerName}</div>
            </div>

            {/* Customer Number */}
            <div>
              <div className="text-sm text-[#050505] font-medium">Customer Number</div>
              <div className="text-xs text-[#808080]">{order.customerNumber}</div>
            </div>

            {/* Delivered In */}
            <div>
              <div className="text-sm text-[#050505] font-medium">Delivered In</div>
              <div className="text-xs text-[#808080]">
                {calculateDeliveredTime(order.pickupTime, order.deliveryTime)}
              </div>
            </div>

            {/* Status */}
            <div>
              <div className="text-sm text-[#050505] font-medium">Status</div>
              <div className="text-xs">{getOrderStatus(order.pickupTime, order.deliveryTime)}</div>
            </div>

            {/* Pickup */}
            <div>
              <div className="text-sm text-[#050505] flex items-center font-medium">
                Pickup
                <SquareArrowOutUpRight size={16} className="ml-1 text-gray-600" />
              </div>
              <div className="text-xs text-[#808080]">
                {order.pickup.split(",").map((line, index) => (
                  <div key={index}>{line.trim()}</div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div>
              <div className="text-sm text-[#050505] flex items-center font-medium">
                Delivery
                <SquareArrowOutUpRight size={16} className="ml-1 text-gray-600" />
              </div>
              <div className="text-xs text-[#808080]">
                {order.delivery.split(",").map((line, index) => (
                  <div key={index}>{line.trim()}</div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default MobileOrderCard;
