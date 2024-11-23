"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const UpcomingOrdersSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const upcomingOrders = useSelector(
    (state: RootState) => state.upcomingOrders
  );

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define hardcoded colors
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

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Upcoming Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingOrders.map((order) => (
            <Card key={order.id} className="p-4">
              {isMobile ? (
                // Layout for smaller screens
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Order ID</span>
                      <span className="text-sm text-gray-800">{order.id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Order Type</span>
                      <div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${getTypeColor(
                            order.type
                          )}`}
                        >
                          {order.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Pickup</span>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 " />
                        <Button variant="link" className="p-0 text-sm">
                          View Map
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Status</span>
                      <div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Delivery</span>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 " />
                        <Button variant="link" className="p-0 text-sm">
                          View Map
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button className="rounded-full w-full text-white px-4 py-2">
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // Layout for larger screens
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Order ID</span>
                    <span className="text-sm text-gray-800">{order.id}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Status</span>
                    <div>
                      <span
                        className={`text-sm py-1 px-2 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Order Type</span>
                    <div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${getTypeColor(
                          order.type
                        )}`}
                      >
                        {order.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Pickup</span>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <Button variant="link" className="p-0 text-sm">
                        View Map
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">Delivery</span>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <Button variant="link" className="p-0 text-sm">
                        View Map
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-px bg-gray-400 mx-2"></div>
                    <Button className="rounded-full text-white w-full px-4 py-2">
                      Accept
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingOrdersSection;
