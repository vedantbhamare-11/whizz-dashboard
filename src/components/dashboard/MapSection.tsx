"use client";
import  React, { useEffect } from "react";
import '../../../dist/style.css'
import { OlaMaps } from "../../../dist/olamaps-js-sdk.es";
const MapSection = () => {
  useEffect(() => {
    // Initialize Ola Maps once the component has mounted
    const olaMaps = new OlaMaps({
      apiKey: "ALTwalP5rFVnikRCD9JMpFK7o-B9",  // Replace with your actual API key
    });

    // Set the map configuration
    const myMap = olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json", // Add the link to your map tiles JSON style
      container: "map-container", // The ID of the container for the map
      center: [15.9716, 37.5946], // Initial coordinates (latitude, longitude)
      zoom: 13, // Set zoom level
    });

    return () => {
      // Clean up when the component is unmounted (important for proper memory management)
      // myMap.destroy();
    };
  }, []);

  return (
    <div className="mt-6 w-full bg-gray-200 rounded-2xl overflow-hidden lg:h-[450px] h-[500px]">
      <div id="map-container" className="w-full h-full border-[#E5E5E5] border-2 rounded-xl sm:rounded-lg"></div>
    </div>
  );
};

export default MapSection;