"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/profileSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState(profile);
  const [profilePic, setProfilePic] = useState<string | null>(
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
  );

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
    dispatch(updateProfile(formData));
    console.log("Profile Saved:", { ...formData, profilePic });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 mt-[4rem] ml-[6rem]">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <div className="mt-6 w-full mx-auto">
            <Card className="p-16 flex items-center justify-center rounded-lg shadow-sm">
              <div className="flex w-1/2 h-auto space-y-8 flex-col items-center">
                <label htmlFor="profile-pic" className="cursor-pointer">
                  <div className="relative">
                    <img
                      src={profilePic || "https://via.placeholder.com/150"}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover border border-gray-200"
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

                <div className="w-full space-y-8">
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
                  className="rounded-full w-[75%] bg-[#3CAE06] text-white hover:bg-green-700"
                >
                  Save Profile Settings
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
