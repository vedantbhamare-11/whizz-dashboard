import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the signup page
  redirect("/signup");
  return null; // This ensures the component doesn't render anything
}
