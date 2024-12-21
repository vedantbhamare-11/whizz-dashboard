import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react"; // Import the icon for the button
import Link from "next/link"; // To use Link for navigating
import { Dialog, DialogContent } from "../ui/dialog";
import { Order } from "@/redux/orderHistorySlice"; // Import the Order type from the correct location
import { Separator } from "@/components/ui/separator"; // Import the Separator component
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, useLayoutEffect } from "react";

interface OrderDetailModalProps {
  order: Order; // Specify the type for the order prop
  onClose: () => void;
}

const isMobile = () => window.innerWidth <= 820;

const getOrderStatus = (pickupTime: string | undefined, deliveryTime: string | undefined) => {
  return deliveryTime ? "Delivered" : "Canceled"; // Return status based on deliveryTime
};

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {isMobileView ? (
        // Mobile Layout
        <DialogContent className="w-full sm:w-[90%] rounded-xl">
          <div className="space-y-4">
            <DialogTitle className="flex gap-4 items-center">
              <div className="text-lg text-[#050505] font-bold">Order ID-</div>
              <div className="text-lg text-[#808080]">#{order.id}</div>
            </DialogTitle>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 gap-4">
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

              {/* Status */}
              <div>
                <div className="text-lg text-[#050505]">Status</div>
                <div className="text-lg text-[#808080]">{getOrderStatus(order.pickupTime, order.deliveryTime)}</div>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : (
        // Desktop Layout
        <DialogContent className="w-full sm:w-[75%] md:w-[60%] lg:w-[50%] rounded-xl">
          <div className="space-y-4">
            <DialogTitle className="flex gap-4 items-center">
              <div className="text-lg text-[#050505] font-bold">Order ID-</div>
              <div className="text-lg text-[#808080]">#{order.id}</div>
            </DialogTitle>

            <Separator className="my-4" />

            <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
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

              {/* Status */}
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
      )}
    </Dialog>
  );
};

export default OrderDetailModal;
