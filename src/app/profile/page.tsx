// ./components/pages/ProfilePage.tsx
"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/profileSlice";
import Image from "next/image";

const isMobile = () => window.innerWidth <= 820;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState(profile);
  const [profilePic, setProfilePic] = useState<string>(profile.profilePic); // Ensure profilePic is string
  const [isMobileView, setIsMobileView] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobileView(isMobile());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(updateProfile({ ...formData, profilePic }));
    console.log("Profile Saved:", { ...formData, profilePic });
  };

  const renderProfileContent = () => (
    <Card className="flex justify-center p-6 rounded-lg shadow-sm">
      <div className="flex space-y-8 flex-col lg:w-[70%] w-full items-center">
        <label htmlFor="profile-pic" className="cursor-pointer">
          <div className="relative">
            <Image
              src={profilePic}
              width={100}
              height={100}
              alt="Profile Preview"
              className="lg:w-36 lg:h-36 w-24 h-24 rounded-full object-cover border border-gray-200"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Change</span>
            </div>
          </div>
          <input
            id="profile-pic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="w-full mt-6 space-y-8">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-[#808080]"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-[#808080]"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-[#808080]"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="mt-6 w-[70%] bg-[#3CAE06] rounded-full text-white hover:bg-green-700"
        >
          Save Profile Settings
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col h-screen">
      {isMobileView ? (
        <div className="flex flex-col h-screen w-full">
          <Sidebar />
          <div className="flex flex-col w-full h-full">
            <Header />
            <main className="mt-[5rem] flex-1 p-4 space-y-4">
              <h1 className="text-2xl font-bold">Profile</h1>
              <div className="mt-6 mx-auto w-full max-w-md">{renderProfileContent()}</div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 mt-[4rem] ml-[6rem]">
              <h1 className="text-2xl font-bold mb-6">Profile</h1>
              <div className="mt-6 w-[70%]  mx-auto">{renderProfileContent()}</div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;