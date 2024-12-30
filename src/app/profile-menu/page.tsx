"use client";

import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { SquarePen, CircleHelp, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const isMobile = () => window.innerWidth <= 820;

const ProfileMenuPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  // Fetch profile data from Redux store
  const { name, email, profilePic } = useSelector((state: RootState) => state.profile);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderProfileContent = () => (
    <div className="flex flex-col items-center space-y-6">
      {/* Profile Picture */}
      <div className="relative">
        <Image
          src={profilePic}
          width={100}
          height={100}
          alt="Profile"
          className="lg:w-36 lg:h-36 w-24 h-24 rounded-full object-cover border border-gray-200"
        />
      </div>
      {/* Name and Email */}
      <div className="text-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* Buttons */}
      <div className="w-full lg:w-1/2">
        <Link href="/edit-profile">
        <Button
            variant="ghost"
            className="flex items-center justify-between mb-4 w-full px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1 border border-gray-300 rounded-full">
              <SquarePen size={16} color="gray"/>

              </div>
              <div>
              <span className="font-semibold">Edit Profile</span>

              </div>
            </div>
            <ChevronRight color="gray" size={18} />
          </Button>
        </Link>

        <Link href="/help">
          <Button
            variant="ghost"
            className="flex items-center justify-between mb-4 w-full px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1 border border-gray-300 rounded-full">
              <CircleHelp size={18} color="gray"/>

              </div>
              <div>
              <span className="font-semibold">Help Center</span>

              </div>
            </div>
            <ChevronRight color="gray" size={18} />
          </Button>
        </Link>

        <Link href="/">
        <Button
            variant="ghost"
            className="flex items-center justify-between mb-4 w-full px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1 border border-gray-300 rounded-full">
              <LogOut size={18} color="gray"/>

              </div>
              <div>
              <span className="font-semibold">Logout</span>

              </div>
            </div>
            <ChevronRight color="gray" size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        // Mobile Layout
        <div className="flex flex-col h-screen w-full">
          <Header />
          <div className="flex flex-1 pt-20">
            <Sidebar />
            <main className="flex-1 p-4">
              <div className="mt-6 mx-auto w-full">{renderProfileContent()}</div>
            </main>
          </div>
        </div>
      ) : (
        // Desktop Layout
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 w-full p-4 mt-[4rem] ml-[6rem]">
              <div className="">{renderProfileContent()}</div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenuPage;
