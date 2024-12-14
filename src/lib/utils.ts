import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Bell,
  Package,
  IndianRupee,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Star,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils.ts

export const getIconForType = (type: string) => {
  switch (type) {
    case "new_order":
      return Package;
    case "order_update":
      return Package;
    case "earnings":
      return IndianRupee;
    case "schedule":
      return Calendar;
    case "system":
      return AlertTriangle;
    case "feedback":
      return Star;
    case "support":
      return MessageSquare;
    default:
      return Bell;
  }
};

// utils.ts
export const OrderColors = {
  FOOD: "#E8E8E8",
  MEDICINE: "#D8FFC6",
  CUSTOM_PACKAGE: "#FFC370",
};

export const OrderStatusColors = {
  IN_PROGRESS: "#FFE18E",
  PENDING: "#E8E8E8",
};

export const PaymentTypeColors = {
  CASH_ON_DELIVERY: "#FFE18E",
  PREPAID: "#D8FFC6", 
};