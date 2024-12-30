"use client";
import React, { useEffect, useState } from "react";
import "../../../dist/style.css";
import { OlaMaps } from "../../../dist/olamaps-js-sdk.es";

const MapSection = () => {
  const [map, setMap] = useState<any>(null);

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
    const myMap = olaMaps.init(mapConfig);
    setMap(myMap);

    // Use Geolocation API to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update the map center to the user's location
          myMap.setCenter([longitude, latitude]);
          myMap.setZoom(15); // Adjust zoom level for better visibility

          // Add a marker at the user's location
          const marker = olaMaps
            .addMarker({
              offset: [0, -10], // Adjust the marker position offset
              anchor: "bottom", // Anchor position for the marker
            })
            .setLngLat([longitude, latitude]) // Set marker location
            .addTo(myMap);

          if (!marker) {
            console.error("Marker could not be added");
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);

          // Handle error and fallback to default coordinates
          myMap.setCenter([13.0849, 80.2065]); // Fallback to default coordinates
          myMap.setZoom(10);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");

      // Fallback to default coordinates
      myMap.setCenter([13.0849, 80.2065]);
      myMap.setZoom(10);
    }
  }, []);

  useEffect(() => {
    // Refresh the map's center if geolocation permissions are granted after initial load
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Re-center the map
          map.setCenter([longitude, latitude]);
          map.setZoom(15);
        },
        (error) => {
          console.error("Error refreshing location:", error);
        }
      );
    }
  }, [map]);

  return (
    <div className="mt-6 w-full bg-gray-200 rounded-2xl overflow-hidden lg:h-[450px] h-[500px]">
      <div id="map-container" className="w-full h-full border-[#E5E5E5] border-2 rounded-xl sm:rounded-lg"></div>
    </div>
  );
};

export default MapSection;
