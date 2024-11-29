"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderType, OrderStatus } from "@/redux/orderSlice";
import { format } from "date-fns";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const isMobile = () => window.innerWidth <= 640;

const OrderSection = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  

  useEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());

    // Initialize on load
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  
  const orders = useSelector((state: RootState) => state.orders);
  const [buttonStates, setButtonStates] = useState<{
    [key: string]: { pickup: boolean; delivery: boolean };
  }>({});

  const handlePickupClick = (orderId: string) => {
    setButtonStates((prev) => ({
      ...prev,
      [orderId]: { pickup: true, delivery: false },
    }));
  };

  const handleDeliveryClick = (orderId: string) => {
    setButtonStates((prev) => ({
      ...prev,
      [orderId]: { pickup: true, delivery: true },
    }));
  };

  return (
    <div>
      {isMobileView ? (
        // Mobile layout
        <div className="h-full w-full space-y-4 mt-16">
          <h1 className="text-2xl font-bold ml-1">Current Order</h1>
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-200 rounded-md bg-white space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <div
                    className={`text-sm px-2 py-1 rounded-full ${
                      order.type === OrderType.FOOD
                        ? "bg-[#E8E8E8]"
                        : "bg-[#FFC370]"
                    }`}
                  >
                    {order.type}
                  </div>
                  <div
                    className={`text-sm px-2 py-1 rounded-full ${
                      order.status === OrderStatus.IN_PROGRESS
                        ? "bg-[#FFE18E]"
                        : "bg-[#FF7D7D]"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
                <div className="text-sm text-[#808080]">
                  {format(new Date(), "dd/mm/yyyy")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg text-[#050505] font-bold">
                    Order ID
                  </div>
                  <div className="text-[#808080] text-sm">#{order.id}</div>
                </div>
                <div>
                  <div className="text-lg text-[#050505] font-bold">
                    Customer Name
                  </div>
                  <div className="text-[#808080] text-sm">
                    {order.customerName}
                  </div>
                </div>
                <div>
                  <div className="text-lg text-[#050505] font-bold">
                    Customer Number
                  </div>
                  <div className="text-[#808080] text-sm">
                    {order.customerNumber}
                  </div>
                </div>
                <div>
                  <div className="text-lg text-[#050505] font-bold">
                    Delivery In
                  </div>
                  <div className="text-[#808080] text-sm">{order.eta}</div>
                </div>
                <div>
                <div className="text-lg text-[#050505] flex items-center font-bold">
                      Pickup
                      <Button variant="ghost">
                        <SquareArrowOutUpRight />
                      </Button>
                    </div>
                  <div className="text-[#808080] text-sm">
                    {order.pickup.split(",").map((line, index) => (
                      <div key={index}>{line.trim()}</div>
                    ))}
                  </div>
                </div>
                
                <div>
                <div className="text-lg text-[#050505] flex items-center font-bold">
                      Delivery
                      <Button variant="ghost">
                        <SquareArrowOutUpRight />
                      </Button>
                    </div>
                  <div className="text-[#808080] text-sm">
                    {order.delivery.split(",").map((line, index) => (
                      <div key={index}>{line.trim()}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className={`w-full rounded-full ${
                    buttonStates[order.id]?.pickup
                      ? "bg-gray-400 text-white"
                      : "bg-[#3CAE06] text-white"
                  }`}
                  onClick={() => handlePickupClick(order.id)}
                  disabled={buttonStates[order.id]?.pickup}
                >
                  Pickup
                </Button>
                <Button
                  className={`w-full rounded-full ${
                    buttonStates[order.id]?.pickup
                      ? buttonStates[order.id]?.delivery
                        ? "bg-gray-400 text-white"
                        : "bg-[#3CAE06] text-white"
                      : "bg-gray-400 text-white"
                  }`}
                  onClick={() => handleDeliveryClick(order.id)}
                  disabled={
                    !buttonStates[order.id]?.pickup ||
                    buttonStates[order.id]?.delivery
                  }
                >
                  Delivery
                </Button>
                <Button
                  className={`w-full rounded-full ${
                    buttonStates[order.id]?.delivery
                      ? "bg-[#8BC34A] text-white"
                      : "bg-gray-400 text-white"
                  }`}
                  disabled={!buttonStates[order.id]?.delivery}
                >
                  Delivered
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop layout

        <div className="h-full w-full space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="space-y-4 p-4 border border-gray-200 rounded-md"
            >
              {/* Header with Order Info */}
              <div className="flex justify-between items-center">
                <div className="flex ">
                  <div className="text-2xl font-bold text-[#050505]">
                    Orders
                  </div>
                  <div className="text-sm ml-6 mt-2 font-semibold">
                    Order ID - #{order.id}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-[#808080]">
                    {format(new Date(), "dd/mm/yyyy")}
                  </div>
                  <div
                    className={`text-sm px-2 py-1 rounded-full text-[#000000] ${
                      OrderStatus.IN_PROGRESS === order.status
                        ? "bg-[#FFE18E]"
                        : "bg-[#FF7D7D]"
                    }`}
                  >
                    {order.status}
                  </div>
                  <div
                    className={`text-sm px-2 py-1 rounded-full text-[#000000] ${
                      OrderType.FOOD === order.type
                        ? "bg-[#E8E8E8]"
                        : "bg-[#FFC370]"
                    }`}
                  >
                    {order.type}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex">
                <div className="grid grid-rows-2 grid-cols-3 w-full">
                  <div>
                    <div className="text-lg text-[#050505]">Customer Name</div>
                    <div className="text-lg text-[#808080]">
                      {order.customerName}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-[#050505]">
                      Customer Number
                    </div>
                    <div className="text-lg text-[#808080]">
                      {order.customerNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-[#050505]">Delivery In</div>
                    <div className="text-lg text-[#808080]">{order.eta}</div>
                  </div>
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

                <div>
                  {" "}
                  <Separator orientation="vertical" className="h-full" />
                </div>

                <div className="flex flex-col w-1/2 space-y-6 p-4">
                  <Button
                    className={`w-full rounded-full ${
                      buttonStates[order.id]?.pickup
                        ? "bg-gray-400 text-white"
                        : "bg-[#3CAE06] text-white"
                    }`}
                    onClick={() => handlePickupClick(order.id)}
                    disabled={buttonStates[order.id]?.pickup}
                  >
                    Pickup
                  </Button>
                  <Button
                    className={`w-full rounded-full ${
                      buttonStates[order.id]?.pickup
                        ? buttonStates[order.id]?.delivery
                          ? "bg-gray-400 text-white"
                          : "bg-[#3CAE06] text-white"
                        : "bg-gray-400 text-white"
                    }`}
                    onClick={() => handleDeliveryClick(order.id)}
                    disabled={
                      !buttonStates[order.id]?.pickup ||
                      buttonStates[order.id]?.delivery
                    }
                  >
                    Delivery
                  </Button>
                  <Button
                    className={`w-full rounded-full ${
                      buttonStates[order.id]?.delivery
                        ? "bg-[#8BC34A] text-white"
                        : "bg-gray-400 text-white"
                    }`}
                    disabled={!buttonStates[order.id]?.delivery}
                  >
                    Delivered
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSection;
