"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const UpcomingOrdersSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Upcoming Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="p-4">
              {isMobile ? (
                // Layout for smaller screens
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        Order ID
                      </span>
                      <span className="text-sm text-gray-800">000{index + 1}</span>
                    </div>
                    <div className="flex flex-col item">
                      <span className="text-sm font-semibold">
                        Order Type
                      </span>
                      <div>
                      <span className="text-sm px-2 py-1 bg-gray-200 text-gray-800 rounded-full">
                        Food
                      </span>
                      </div>
                      
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        Pickup
                      </span>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 " />
                        <Button variant="link" className="p-0 text-sm">
                          View Map
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        Status
                      </span>
                      <div>
                      <span className="text-sm px-2 py-1 bg-yellow-200 text-[#000000] rounded-full">
                        In Progress
                      </span>
                      </div>
                     
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        Delivery
                      </span>
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
                // Layout for larger screens (unchanged)
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold ">
                      Order ID
                    </span>
                    <span className="text-sm text-gray-800">000{index + 1}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">
                      Status
                    </span>
                    <div>
                    <span className="text-sm py-1 px-2 bg-yellow-200 text-[#000000] rounded-full">
                      In Progress
                    </span>
                    </div>
                    
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">
                      Order Type
                    </span>
                    <div>
                    <span className="text-sm  px-2 bg-gray-200 text-gray-800 rounded-full inline-block">
                      Food
                    </span>
                    </div>
      
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">
                      Pickup
                    </span>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <Button variant="link" className="p-0 text-sm">
                        View Map
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">
                      Delivery
                    </span>
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
