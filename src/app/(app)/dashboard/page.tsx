import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>;
}
