import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receiver Dashboard — Smart Food Rescue Network",
  description: "Find available food near you and track your collections.",
};

export default function ReceiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role="receiver" />
      <main className="lg:pl-64">
        <div className="pt-14 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
