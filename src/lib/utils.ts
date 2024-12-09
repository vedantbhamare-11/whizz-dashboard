import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Bell, Package, IndianRupee, Calendar, AlertTriangle, MessageSquare, Star } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
