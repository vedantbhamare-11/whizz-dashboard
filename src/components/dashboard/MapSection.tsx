"use client";

const MapSection = () => {
  return (
    <div className="mt-6 w-full bg-gray-200 rounded-2xl overflow-hidden sm:h-[450px] sm:w-[90%] h-[300px]">
    <iframe
      src="https://maps.google.com/maps?q=cityville&t=&z=13&ie=UTF8&iwloc=&output=embed"
      className="w-full h-full border-[#E5E5E5] border-2 rounded-xl sm:rounded-lg"
      allowFullScreen
    ></iframe>
  </div>
  
  );
};

export default MapSection;
