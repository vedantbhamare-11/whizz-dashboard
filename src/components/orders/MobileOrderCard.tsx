"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order } from "@/redux/orderHistorySlice";
import { MoreVertical } from "lucide-react";
import { differenceInMinutes, parse, isValid } from "date-fns";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
  return deliveryTime ? "Delivered" : "Canceled";
};

const MobileOrderCard: React.FC<MobileOrderCardProps> = ({ isSelecting, selectedOrders, setSelectedOrders }) => {
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
            <button className="text-gray-600 hover:text-black">
              <MoreVertical size={16} />
            </button>
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
              <div className="text-xs text-[#808080]">
                {getOrderStatus(order.pickupTime, order.deliveryTime)}
              </div>
            </div>

            {/* Pickup */}
            <div>
              <div className="text-sm text-[#050505] font-medium">Pickup</div>
              <div className="text-xs text-[#808080]">
                {order.pickup.split(",").map((line, index) => (
                  <div key={index}>{line.trim()}</div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div>
              <div className="text-sm text-[#050505] font-medium">Delivery</div>
              <div className="text-xs text-[#808080]">
                {order.delivery.split(",").map((line, index) => (
                  <div key={index}>{line.trim()}</div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MobileOrderCard;
