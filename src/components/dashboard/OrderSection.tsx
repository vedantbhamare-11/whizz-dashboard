"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapSection from "@/components/dashboard/MapSection";

const OrderSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Layout for smaller screens
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Buttons */}
          <div className="flex justify-between mb-4 gap-2">
            <Button className="rounded-full w-1/2">Order Details</Button>
            <Button className="rounded-full w-1/2">Payment Details</Button>
          </div>

          {/* Order ID Card */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Order ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-[#808080]">0001</p>
            </CardContent>
          </Card>

          {/* Map Section */}
          <MapSection />

          {/* Remaining Cards */}
          <div className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Name</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">John Doe</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Number</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">9876543210</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ETA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">15 min</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg px-2 py-1 bg-yellow-200 text-[#000000] rounded-full">
                  In Progress
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Type</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg px-2 py-1 bg-[#E8E8E8] text-[#000000] rounded-full">
                  Food
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">
                  545, Main Street, Kannagi Street, Arumbakkam, Chennai - 600014
                </p>
                <Button className="mt-2 w-full rounded-full">View Map</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">
                  545, Main Street, Kannagi Street, Arumbakkam, Chennai - 600014
                </p>
                <Button className="mt-2 w-full rounded-full">View Map</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Layout for larger screens (unchanged)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">0001</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Number</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">9876543210</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg px-2 py-1 bg-yellow-200 text-[#000000] rounded-full">
                  In Progress
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">
                  545, Main Street, Kannagi Street, Arumbakkam, Chennai - 600014
                </p>
                <Button className="mt-2 rounded-full">View Map</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Name</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">John Doe</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ETA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">15 min</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Type</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-lg px-2 py-1 bg-[#E8E8E8] text-[#000000] rounded-full">
                  Food
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-[#808080]">
                  545, Main Street, Kannagi Street, Arumbakkam, Chennai - 600014
                </p>
                <Button className="mt-2 rounded-full">View Map</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSection;
