import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const OrderDetailModal = ({
  order,
  onClose,
}: {
  order: any;
  onClose: () => void;
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-[450px] max-w-[400px] rounded-xl">
        {/* Delivery type tag */}
        <div className="absolute top-12 right-6 bg-blue-500 text-white text-sm py-1 px-2 rounded-full">
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
            <div className="flex justify-start mt-4">
              <Button
                variant="ghost"
                className="rounded-lg bg-[#3CAE06] hover:bg-[#33A305] text-white"
              >
                Order Details
              </Button>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
