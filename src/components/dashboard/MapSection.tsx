"use client";

const MapSection = () => {
  return (
        <div className=" mt-6 w-full  h-[450px] bg-gray-200 rounded-2xl">
          <iframe
            src="https://maps.google.com/maps?q=cityville&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full rounded-xl border-[#E5E5E5] border-2"
            allowFullScreen
          ></iframe>
        </div>
  );
};

export default MapSection;
