import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order } from "@/redux/orderHistorySlice"; // Import the Order type

interface OrderDetailModalProps {
  order: Order; // Specify the type for the order prop
  onClose: () => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Food":
      return "bg-[#E8E8E8]";
    case "Medicine":
      return "bg-[#D8FFC6]";
    case "Custom Package":
      return "bg-[#FFC370]";
    default:
      return "bg-gray-200";
  }
};

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[450px] max-w-[400px] rounded-xl">
        {/* Delivery type tag */}
        <div
          className={`absolute top-12 right-6 text-black text-sm py-1 px-2 rounded-full ${getTypeColor(
            order.type
          )}`}
        >
          {order.type}
        </div>

        <DialogHeader className="mt-8">
          <DialogTitle>Order #{order.id}</DialogTitle>
        </DialogHeader>

        {/* Order Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg text-[#050505] font-bold">
                Customer Name
              </div>
              <div className="text-[#808080] text-sm">{order.customerName}</div>
            </div>
            <div>
              <div className="text-lg text-[#050505] font-bold flex justify-end">
                Customer Number
              </div>
              <div className="text-[#808080] text-sm flex justify-end">
                {order.customerNumber}
              </div>
            </div>
            <div>
              <div className="text-lg text-[#050505] font-bold">Pickup</div>
              <div className="text-[#808080] text-sm">{order.pickup}</div>
            </div>
            <div>
              <div className="text-lg text-[#050505] font-bold flex justify-end">
                Pickup Time
              </div>
              <div className="text-[#808080] text-sm flex justify-end">
                {order.pickupTime || "Not available"}
              </div>
            </div>
            <div>
              <div className="text-lg text-[#050505] font-bold">Delivery</div>
              <div className="text-[#808080] text-sm">{order.delivery}</div>
            </div>
            <div>
              <div className="text-lg text-[#050505] font-bold flex justify-end">
                Delivery Time
              </div>
              <div className="text-[#808080] text-sm flex justify-end">
                {order.deliveryTime || "Not available"}
              </div>
            </div>
          </div>

          {/* Order Details Button */}
          <div className="flex justify-start mt-4">
            <Button
              variant="ghost"
              className="rounded-lg bg-[#3CAE06] hover:bg-[#33A305] text-white"
            >
              Order Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
