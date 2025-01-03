"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderType, OrderStatus, PaymentType } from "@/redux/orderSlice";
import { format } from "date-fns";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderColors, OrderStatusColors, PaymentTypeColors } from "@/lib/utils";
import { Badge } from "../ui/badge";

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
    [key: string]: "pickup" | "deliver" | "delivered" | null;
  }>({});

  const handleButtonClick = (orderId: string) => {
    setButtonStates((prev) => {
      const currentState = prev[orderId] ?? "pickup";

      let newState: "pickup" | "deliver" | "delivered" | null;

      // Cycle through states: pickup -> deliver -> delivered
      if (currentState === "pickup") {
        newState = "deliver";
      } else if (currentState === "deliver") {
        newState = "delivered";
      } else {
        newState = null; // Reset to null after delivered (optional)
      }

      return {
        ...prev,
        [orderId]: newState,
      };
    });
  };

  // Function to determine button color based on state
  const getButtonColor = (state: "pickup" | "deliver" | "delivered" | null) => {
    const primaryColor = "bg-[#3CAE06]";
    const hoverColor = "hover:bg-[#33A305]";

    switch (state) {
      case "pickup":
        return `${primaryColor} ${hoverColor} text-white`;
      case "deliver":
        return `${primaryColor} ${hoverColor} text-white`;
      case "delivered":
        return `${primaryColor} ${hoverColor} text-white`;
      default:
        return "bg-green-500 hover:bg-green-600 text-white";
    }
  };

  return (
    <div>
      {isMobileView ? (
        // Mobile layout
        <div className="h-full w-full space-y-4">
          <h1 className="text-2xl font-bold ml-1">Current Order</h1>
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-200 rounded-md bg-white space-y-4"
            >
              {/* Header */}
                <div className="flex space-x-2 grid grid-cols-2 ">
                  <div className="flex justify-start items-start flex-col space-y-2 ">
                    <Badge
                      className={`text-black font-normal ${
                        order.type === OrderType.FOOD
                          ? `bg-[${OrderColors.FOOD}]`
                          : order.type === OrderType.MEDICINE
                          ? `bg-[${OrderColors.MEDICINE}]`
                          : `bg-[${OrderColors.CUSTOM_PACKAGE}]`
                      }`}
                    >
                      {order.type}
                    </Badge>
                    <Badge
                      className={`text-black font-normal ${
                        order.status === OrderStatus.IN_PROGRESS
                          ? `bg-[${OrderStatusColors.IN_PROGRESS}]`
                          : `bg-[${OrderStatusColors.PENDING}]`
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex justify-end items-end flex-col space-y-2  ">
                    <div className="text-sm text-[#808080]">
                      {format(new Date(), "dd/MM/yyyy")}
                    </div>
                    <Badge
                      className={`text-black font-normal ${
                        order.paymentType === PaymentType.CASH_ON_DELIVERY
                          ? `bg-[${PaymentTypeColors.CASH_ON_DELIVERY}]`
                          : `bg-[${PaymentTypeColors.PREPAID}]`
                      }`}
                    >
                      {order.paymentType}
                    </Badge>
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

              <Separator className="my-4" />
              {/* Action Buttons */}
              <div className="flex justify-center flex-col items-center w-full space-y-6">
                <Button
                  className={`w-full rounded-full ${getButtonColor(
                    buttonStates[order.id]
                  )}`}
                  onClick={() => handleButtonClick(order.id)}
                  disabled={buttonStates[order.id] === "delivered"} // Disable when delivered
                >
                  {buttonStates[order.id] === "pickup"
                    ? "Pickup"
                    : buttonStates[order.id] === "deliver"
                    ? "Deliver"
                    : buttonStates[order.id] === "delivered"
                    ? "Delivered"
                    : "Pickup"}{" "}
                  {/* Default text */}
                </Button>

                {/* <div className="flex w-full gap-2">
                  <div className="flex flex-col items-start w-[50%]">
                    <Button
                      variant="ghost"
                      className="w-full rounded-full bg-[#3CAE06] hover:bg-[#33A305] text-white flex items-center justify-center"
                      onClick={() =>
                        document.getElementById("picture")?.click()
                      } 
                    >
                      <Input
                        id="picture"
                        type="file"
                        className=" absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange} 
                      />
                      <span className="text-sm ">Upload Image</span>
                    </Button>

                    {fileName && uploadSuccess && (
                      <div className="text-xs text-[#3CAE06] mt-2">
                        <p className="text-green-500 text-sm">
                          Successfully uploaded!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row justify-center items-center w-auto gap-1">
                   
                    <Input
                      type="number"
                      className="w-full"
                      placeholder="Total Amount"
                    ></Input>
                  </div>
                </div>

                <Button className="w-full rounded-full bg-[#3CAE06] hover:bg-[#33A305] text-white flex items-center justify-center">
                  Submit
                </Button> */}
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
                  <Badge
                    className={`text-black text-sm font-normal ${
                      order.type === OrderType.FOOD
                        ? `bg-[${OrderColors.FOOD}]`
                        : order.type === OrderType.MEDICINE
                        ? `bg-[${OrderColors.MEDICINE}]`
                        : `bg-[${OrderColors.CUSTOM_PACKAGE}]`
                    }`}
                  >
                    {order.type}
                  </Badge>
                  <Badge
                    className={`text-black text-sm font-normal ${
                      order.status === OrderStatus.IN_PROGRESS
                        ? `bg-[${OrderStatusColors.IN_PROGRESS}]`
                        : `bg-[${OrderStatusColors.PENDING}]`
                    }`}
                  >
                    {order.status}
                  </Badge>
                  <Badge
                    className={`text-black text-sm font-normal ${
                      order.paymentType === PaymentType.CASH_ON_DELIVERY
                        ? `bg-[${PaymentTypeColors.CASH_ON_DELIVERY}]`
                        : `bg-[${PaymentTypeColors.PREPAID}]`
                    }`}
                  >
                    {order.paymentType}
                  </Badge>
                  <div className="text-sm text-[#808080]">
                    {format(new Date(), "dd/MM/yyyy")}
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

                <div className="flex justify-center flex-col items-center w-1/2 space-y-6 p-4">
                  <Button
                    className={`w-full rounded-full ${getButtonColor(
                      buttonStates[order.id]
                    )}`}
                    onClick={() => handleButtonClick(order.id)}
                    disabled={buttonStates[order.id] === "delivered"}
                  >
                    {buttonStates[order.id] === "pickup"
                      ? "Pickup"
                      : buttonStates[order.id] === "deliver"
                      ? "Deliver"
                      : buttonStates[order.id] === "delivered"
                      ? "Delivered"
                      : "Pickup"}{" "}
                    {/* Default text */}
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
