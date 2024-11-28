"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

const UpcomingOrdersSection = () => {
  const [activeTab, setActiveTab] = useState("Upcoming Orders");
  const upcomingOrders = useSelector(
    (state: RootState) => state.upcomingOrders
  );
  const deliveredOrders = useSelector(
    (state: RootState) => state.deliveredOrders
  );

  const ordersToDisplay =
    activeTab === "Upcoming Orders" ? upcomingOrders : deliveredOrders;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-[#FFE18E]";
      case "Pending":
        return "bg-[#FF7D7D]";
      default:
        return "bg-gray-200";
    }
  };

  interface Order {
  id: string;
  status: string;
  type: string;
  pickup: string;
  delivery: string;
}


  // Function to break the address at commas and preserve the commas
  const formatAddress = (address: string) => {
    return address
      .split(",")
      .map((part, index, array) => (
        <span key={index}>
          {part.trim()}
          {index < array.length - 1 && ","} <br />
        </span>
      ));
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Upcoming Orders</CardTitle>
        <div className="p-1 border rounded-lg flex space-x-4 mt-4">
          <Button
            variant={activeTab === "Upcoming Orders" ? "default" : "ghost"}
            onClick={() => setActiveTab("Upcoming Orders")}
            className={`w-1/2 h-10 rounded-lg border-[#E5E5E5] ${
              activeTab === "Upcoming Orders" ? "bg-[#3CAE06] text-white" : ""
            }`}
          >
            Upcoming Orders
          </Button>
          <Button
            variant={activeTab === "Delivered" ? "default" : "ghost"}
            onClick={() => setActiveTab("Delivered")}
            className={`w-1/2 h-10 rounded-lg border-[#E5E5E5] ${
              activeTab === "Delivered" ? "bg-[#3CAE06] text-white" : ""
            }`}
          >
            Delivered
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ordersToDisplay.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <span
                    className={`text-sm py-1 px-2 rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <span
                    className={`text-sm py-1 px-2 rounded-full ${getTypeColor(
                      order.type
                    )}`}
                  >
                    {order.type}
                  </span>
                </div>
                <span className="text-sm">
                  {new Date().toLocaleDateString()}
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
              <div className="mt-4">
                <Button
                  className={`rounded-full w-full px-4 py-2 ${
                    activeTab === "Upcoming Orders"
                      ? "bg-[#3CAE06] text-white"
                      : "bg-[#ECECEC] text-gray-500"
                  }`}
                  disabled={activeTab === "Delivered"}
                >
                  {activeTab === "Upcoming Orders" ? "Accept" : "Delivered"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingOrdersSection;
