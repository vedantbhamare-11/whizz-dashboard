import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { format } from "date-fns";

const OrderHistorySection = () => {
  const deliveredOrders = useSelector(
    (state: RootState) => state.deliveredOrders
  );

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

  const formatAddress = (address: string) => {
    return address.split(",").map((part, index, array) => (
      <span key={index}>
        {part.trim()}
        {index < array.length - 1 && ","} <br />
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="lg:p-6 p-2">
        <CardTitle className="mb-4">Order History</CardTitle>
      </CardHeader>

      <CardContent
        className=" lg:px-6 p-0"
        
      >
        <div className="space-y-4">
          {deliveredOrders.length === 0 ? (
            <div>No orders in history</div>
          ) : (
            deliveredOrders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <span
                      className={`text-sm py-1 px-2 rounded-full ${getTypeColor(
                        order.type
                      )}`}
                    >
                      {order.type}
                    </span>
                  </div>
                  <span className="text-sm">
                    {format(new Date(), "MM/dd/yyyy")}
                  </span>
                </div>
                <div className="font-semibold mb-2">Order ID: #{order.id}</div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <span className="font-semibold flex items-center">
                      Pickup{" "}
                      <Button variant="link" className="p-0 text-sm">
                        <SquareArrowOutUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span>{formatAddress(order.pickup)}</span>
                    </div>
                  </div>
                  <div className="border-l pl-4">
                    <span className="font-semibold flex items-center">
                      Delivery{" "}
                      <Button variant="link" className="p-0 text-sm">
                        <SquareArrowOutUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span>{formatAddress(order.delivery)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default OrderHistorySection;
