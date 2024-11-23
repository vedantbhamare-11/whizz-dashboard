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
import { CheckedState } from "@radix-ui/react-checkbox";

const SignUpPage = () => {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    terms: "",
  });

  // Validation logic
  const validateInputs = () => {
    let valid = true;
    const newErrors = { name: "", phone: "", terms: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      valid = false;
    }

    if (!isTermsChecked) {
      newErrors.terms = "You must agree to the terms and conditions.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Sign Up
  const handleSignUp = () => {
    if (validateInputs()) {
      // Navigate to OTP Verification screen
      router.push("/otp-verification");
    }
  };

  // Restrict input to numeric values only
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setPhone(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault(); // Prevent non-numeric input
    }
  };

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  className="mt-1 placeholder:text-[#B3B3B3]"
                  value={phone}
                  onChange={handlePhoneInput}
                  onKeyPress={handleKeyPress}
                  maxLength={10} // Limit to 10 digits
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start mt-4 space-x-2">
              <Checkbox
                id="terms"
                checked={isTermsChecked}
                onCheckedChange={(checked: CheckedState) => setIsTermsChecked(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="hover:underline">
                  Terms and Conditions
                </Link>
              </Label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            {/* Sign Up Button */}
            <Button className="w-full rounded-lg text-base" onClick={handleSignUp}>
              Sign Up
            </Button>

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
