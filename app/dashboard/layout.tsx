import { Suspense } from "react";
import { Sidebar } from "./components/sidebar";
import { SidebarSkeleton } from "./components/sidebar-skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 p-6 overflow-y-scroll max-h-screen">
        {children}
      </main>
    </div>
  );
}
