"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const UpcomingOrdersSection = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Upcoming Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="p-4">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Order ID
                  </span>
                  <span className="text-sm text-gray-800">000{index + 1}</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Status
                  </span>
                  <span className="text-sm p-2 bg-yellow-200 text-[#000000] rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Order Type
                  </span>
                  <span className="text-sm p-2 bg-gray-200 text-gray-800 rounded-full inline-block">
                    Food
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Pickup
                  </span>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-gray-600" />
                    <Button variant="link" className="p-0 text-sm">
                      View Map
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Delivery
                  </span>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-gray-600" />
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
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingOrdersSection;
