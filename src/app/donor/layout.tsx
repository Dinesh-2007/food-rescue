import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donor Dashboard — Smart Food Rescue Network",
  description: "Manage your food donations and track your impact.",
};

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="donor" />
      <main className="lg:pl-64">
        <div className="pt-14 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
