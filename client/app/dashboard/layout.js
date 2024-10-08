// app/dashboard/layout.jsx
import { auth } from "@/auth";
import AdminHeader from "@/components/main/admin/admin-header";
import AdminNav from "@/components/main/admin/admin-nav";
import Sidebar from "@/components/main/admin/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar title="Solobuilderhub">
        <AdminNav />
      </Sidebar>
      <div className="flex flex-col">
        <AdminHeader session={session}>
          <AdminNav />
        </AdminHeader>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}