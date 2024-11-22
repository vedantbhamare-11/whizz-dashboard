import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the dashboard
  redirect("/dashboard");
  return null; // This ensures the component doesn't render anything
}
