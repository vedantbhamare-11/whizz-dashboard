// ./app/dashboard/page.tsx
"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OrderSection from "@/components/dashboard/OrderSection";
import MapSection from "@/components/dashboard/MapSection";
import UpcomingOrdersSection from "@/components/dashboard/UpcomingOrdersSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <OrderSection />
            <MapSection />
          </div>
          <UpcomingOrdersSection />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
