"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  // Form state
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Error state
  const [errors, setErrors] = useState({
    phone: "",
  });

  // Validation logic
  const validateInputs = () => {
    let valid = true;
    const newErrors = { phone: "" };

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Sign In
  const handleSignIn = () => {
    if (validateInputs()) {
      // Navigate to OTP Verification screen
      router.push("/otp-verification");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F3F3F3]">
      {/* Header without Bell, User Icon, Switch, and Hamburger */}

      {/* Main Content */}
      <div className="flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* Card */}
        <Card className="w-full max-w-sm sm:max-w-md p-2 sm:p-6 lg:p-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold sm:text-left">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Input Field */}
            <div className="space-y-4">
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start mt-4 space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember Me
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            {/* Sign In Button */}
            <Button className="w-full rounded-lg text-base" onClick={handleSignIn}>
              Sign In
            </Button>

            {/* Sign Up Link */}
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
