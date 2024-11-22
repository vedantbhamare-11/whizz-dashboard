import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl font-bold">Welcome to Whizz Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage orders, deliveries, and more.</p>
        </main>
      </div>
    </div>
  );
}
