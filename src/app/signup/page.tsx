"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F3F3F3]">
      {/* Header without Bell, User Icon, Switch, and Hamburger */}
      <Header showBell={false} showUser={false} showSwitch={false} showHamburger={false} />

      {/* Main Content */}
      <div className="flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* Card */}
        <Card className="w-full max-w-sm sm:max-w-md sm:p-6 lg:p-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold sm:text-left">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Input Fields */}
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1 placeholder:text-[#B3B3B3]"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-1 placeholder:text-[#B3B3B3]"
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start mt-4 space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="hover:underline">
                  Terms and Conditions
                </Link>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            {/* Sign Up Button */}
            <Button className="w-full rounded-lg text-base">Sign Up</Button>

            {/* Sign In Link */}
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
