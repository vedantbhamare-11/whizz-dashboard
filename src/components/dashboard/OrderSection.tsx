"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapSection from "@/components/dashboard/MapSection";
import { OrderType, OrderStatus } from "@/redux/orderSlice";

const OrderSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const orders = useSelector((state: RootState) => state.orders);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define color mappings for types and statuses
  const typeColors: Record<OrderType, string> = {
    [OrderType.FOOD]: "bg-[#E8E8E8]",
    [OrderType.MEDICINE]: "bg-[#D8FFC6]",
    [OrderType.CUSTOM_PACKAGE]: "bg-[#FFC370]",
  };

  const statusColors: Record<OrderStatus, string> = {
    [OrderStatus.IN_PROGRESS]: "bg-[#FFE18E]",
    [OrderStatus.PENDING]: "bg-[#FF7D7D]",
  };

  if (isMobile) {
    // Layout for smaller screens
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4 gap-2">
            <Button className="rounded-full w-1/2">Order Details</Button>
            <Button className="rounded-full w-1/2">Payment Details</Button>
          </div>
          {orders.map((order) => (
            <Card key={order.id} className="mb-4">
              <CardHeader>
                <CardTitle>Order ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">{order.id}</p>
              </CardContent>
            </Card>
          ))}
          <MapSection />
          {orders.map((order) => (
            <div key={order.id} className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.customerName}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.customerNumber}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>ETA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.eta}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <span
                    className={`text-lg px-2 py-1 rounded-full text-[#000000] ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <span
                    className={`text-lg px-2 py-1 rounded-full text-[#000000] ${typeColors[order.type]}`}
                  >
                    {order.type}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.pickup}</p>
                  <Button className="mt-2 w-full rounded-full">View Map</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.delivery}</p>
                  <Button className="mt-2 w-full rounded-full">View Map</Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Layout for larger screens
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Orders</CardTitle>
          <div className="flex space-x-4">
            <a href="/order-details" className="text-[#808080]">
              Order Details
            </a>
            <a href="/payment-details" className="text-[#808080]">
              Payment Details
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order ID</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.id}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">
                    {order.customerNumber}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <span
                    className={`text-lg px-2 py-1 rounded-full text-[#000000] ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.pickup}</p>
                  <Button className="mt-2 rounded-full">View Map</Button>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.customerName}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>ETA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.eta}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <span
                    className={`text-lg px-2 py-1 rounded-full text-[#000000] ${typeColors[order.type]}`}
                  >
                    {order.type}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-[#808080]">{order.delivery}</p>
                  <Button className="mt-2 rounded-full">View Map</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderSection;
