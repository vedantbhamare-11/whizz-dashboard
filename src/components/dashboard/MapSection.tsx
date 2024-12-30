"use client";
import React, { useEffect, useState } from "react";
import "../../../dist/style.css";
import { OlaMaps } from "../../../dist/olamaps-js-sdk.es"; // Adjust based on actual export

// Define a custom type for the map instance
interface MapInstance {
  setCenter: (coords: [number, number]) => void;
  setZoom: (level: number) => void;
}

const MapSection = () => {
  const [map, setMap] = useState<MapInstance | null>(null);

  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: "3OJLTsPVvFVjWEJQyDnKpHzrIXPUqJzNe2yExXVU", // Replace with your actual API key
    });

    // Default map configuration
    const mapConfig = {
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: "map-container",
      center: [13.0849, 80.2065], // Default coordinates (Chennai, India)
      zoom: 10,
    };

    // Initialize the map and save the reference
    const myMap = olaMaps.init(mapConfig) as MapInstance;
    setMap(myMap);

    // Use Geolocation API to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update the map center to the user's location
          myMap.setCenter([longitude, latitude]);
          myMap.setZoom(15);

          // Add a marker at the user's location
          olaMaps
            .addMarker({ offset: [0, -10], anchor: "bottom" })
            .setLngLat([longitude, latitude])
            .addTo(myMap);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="mt-6 w-full bg-gray-200 rounded-2xl overflow-hidden lg:h-[450px] h-[500px]">
      <div id="map-container" className="w-full h-full border-[#E5E5E5] border-2 rounded-xl sm:rounded-lg"></div>
    </div>
  );
};

export default MapSection;
