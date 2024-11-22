"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Map</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        <div className="w-[500px] h-[500px] bg-gray-200 rounded-2xl mb-4">
          <iframe
            src="https://maps.google.com/maps?q=cityville&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full rounded-xl border-[#E5E5E5] border-2"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-col space-y-4 w-full justify-center items-center">
          <Button
            variant="secondary"
            className="w-[90%] h-12 rounded-full border-[#E5E5E5] border-2"
          >
            Way to Pickup
          </Button>
          <Button
            variant="secondary"
            className="w-[90%] h-12 rounded-full border-[#E5E5E5] border-2"
          >
            Way to Delivery
          </Button>
          <Button className="w-[90%] h-12 rounded-full">Delivered</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapSection;
