"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const OTPVerificationPage = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format remaining time (mm:ss)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      e.target.value = ""; // Clear invalid input
    }
  };

  // Handle keydown for backspace to move to the previous field
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    const enteredOtp = otp.join(""); // Combine the OTP digits
    if (enteredOtp === "1234") {
      setIsOtpValid(true);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setIsOtpValid(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F3F3F3]">
      <Header
        showBell={false}
        showUser={false}
        showSwitch={false}
        showHamburger={false}
      />

      {/* Main Content */}
      <div className="flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 bg-gray-50">
        {/* Card */}
        <Card className="w-full max-w-sm sm:max-w-md  sm:p-6 lg:p-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold ">
              OTP Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Description Text */}
            <p className="text-sm text-gray-600 mb-4 text-left">
              Please enter the OTP sent to your phone number to complete your
              verification.
            </p>

            {/* OTP Input */}
            <div className="flex justify-center gap-4 mb-6">
              {[...Array(4)].map((_, index) => (
                <Input
                  key={index}
                  maxLength={1}
                  ref={(el) => {
                    inputRefs.current[index] = el; // Assign ref
                  }}
                  style={{
                    width: "64px",
                    height: "64px",
                    fontSize: "24px",
                    fontWeight: "700",
                    textAlign: "center",
                    border: `1px solid ${
                      isOtpValid === null
                        ? "#D1D5DB"
                        : isOtpValid
                        ? "#3CAE06"
                        : "#FF0000"
                    }`,
                    borderRadius: "8px",
                  }}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            {/* Timer Text */}
            <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
              <span>
                Remaining time:{" "}
                <span className="font-semibold">{formatTime(timeLeft)}</span>
              </span>
              {!isMobile && (
                <span>
                  Didn’t get the code?{" "}
                  <button className=" hover:underline font-semibold">
                    Resend
                  </button>
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-4">
            {/* Verify Button */}
            <Button className="w-full rounded-lg text-base" onClick={verifyOtp}>
              Verify
            </Button>

            {/* Resend Text for Mobile */}
            {isMobile && (
              <p className="text-sm text-gray-600">
                Didn’t get the code?{" "}
                <button className="hover:underline font-semibold">
                  Resend
                </button>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* OTP Validation Result */}
      {isOtpValid !== null && (
        <div
          className={`absolute bg-white rounded-lg flex items-center shadow-md py-2 px-4`}
          style={{
            top: isMobile ? "85%" : "82%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            fontSize: isMobile ? "14px" : "16px",
            padding: isMobile ? "8px 12px" : "12px 16px",
          }}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isOtpValid ? "bg-green-500" : "bg-red-500"
            }`}
            style={{
              width: isMobile ? "32px" : "40px",
              height: isMobile ? "32px" : "40px",
            }}
          >
            {isOtpValid ? (
              <CheckCircle
                className={`${isMobile ? "w-4 h-4" : "w-6 h-6"} text-white`}
              />
            ) : (
              <AlertTriangle
                className={`${isMobile ? "w-4 h-4" : "w-6 h-6"} text-white`}
              />
            )}
          </div>
          <span
            className={`ml-4 ${
              isOtpValid ? "text-green-700" : "text-red-700"
            } font-medium`}
          >
            {isOtpValid ? "OTP Verification Successful" : "Invalid OTP"}
          </span>
        </div>
      )}
    </div>
  );
};

export default OTPVerificationPage;
