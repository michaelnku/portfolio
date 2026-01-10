import { getAdminAbout } from "@/components/helper/getAdminAbout";
import AdminNavbar from "@/components/layout/AdminNavbar";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { CurrentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await CurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const about = await getAdminAbout();

  return (
    <div className="min-h-screen">
      {/* TOP NAV */}
      <AdminNavbar initialUser={user} about={about} />

      <div className="flex">
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full max-w-full px-4 md:px-6 py-3 md:ml-64 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
