import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Smart Food Rescue Network",
  description: "Platform administration and analytics.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="admin" />
      <main className="lg:pl-64">
        <div className="pt-14 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
