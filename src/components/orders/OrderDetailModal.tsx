import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react"; // Import the icon for the button
import Link from "next/link"; // To use Link for navigating
import { Dialog, DialogContent } from "../ui/dialog";
import { Order } from "@/redux/orderHistorySlice"; // Import the Order type from the correct location
import { Separator } from "@/components/ui/separator"; // Import the Separator component
import { DialogTitle } from "@radix-ui/react-dialog";

interface OrderDetailModalProps {
  order: Order; // Specify the type for the order prop
  onClose: () => void;
}

const getOrderStatus = (pickupTime: string | undefined, deliveryTime: string | undefined) => {
  return deliveryTime ? "Delivered" : "Canceled"; // Return status based on deliveryTime
};

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[90%] rounded-xl">
        {/* Order Details */}
        <div className="space-y-4">
          {/* Order ID */}
          <DialogTitle className="flex gap-4 items-center">
            <div className="text-lg text-[#050505] font-bold">Order ID-</div>
            <div className="text-lg text-[#808080]">#{order.id}</div>
          </DialogTitle>

          {/* Separator */}
          <Separator className="my-4" />

          <div className="grid grid-rows-2 grid-cols-3 w-full gap-4">
            {/* Customer Name */}
            <div>
              <div className="text-lg text-[#050505]">Customer Name</div>
              <div className="text-lg text-[#808080]">{order.customerName}</div>
            </div>

            {/* Customer Number */}
            <div>
              <div className="text-lg text-[#050505]">Customer Number</div>
              <div className="text-lg text-[#808080]">{order.customerNumber}</div>
            </div>

            {/* Order Status */}
            <div>
              <div className="text-lg text-[#050505]">Status</div>
              <div className="text-lg text-[#808080]">{getOrderStatus(order.pickupTime, order.deliveryTime)}</div>
            </div>

            {/* Pickup */}
            <div>
              <div className="text-lg text-[#050505] flex items-center">
                Pickup
                <Button variant="ghost" className="ml-2">
                  <SquareArrowOutUpRight size={18} />
                </Button>
              </div>
              <div className="text-lg text-[#808080]">
                {order.pickup.split(",").map((line, index) => (
                  <div key={index}>{line.trim()}</div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div>
              <div className="text-lg text-[#050505] flex items-center">
                Delivery
                <Button variant="ghost" className="ml-2">
                  <SquareArrowOutUpRight size={18} />
                </Button>
              </div>
              <div className="text-lg text-[#808080]">
                {order.delivery.split(",").map((line, index) => (
                  <div key={index}>{line.trim()}</div>
                ))}
              </div>
            </div>

            {/* Downloads */}
            <div>
              <div className="text-lg text-[#050505]">Downloads</div>
              <div className="mt-2 text-[#808080] flex flex-col">
                <Link href="#" className="underline">
                  Order Details
                </Link>
                <Link href="#" className="underline">
                  Payment Details
                </Link>
              </div>
            </div>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
