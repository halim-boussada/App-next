import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserProfile } from "./user-profile";
import { SidebarNav } from "./sidebar-nav";
import { ThemeSwitcher } from "./theme-switcher";

export async function Sidebar() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <aside className="w-64 bg-content1 border-r border-divider flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b border-divider">
        <UserProfile user={user} />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4">
        <SidebarNav />
      </nav>

      {/* Theme Switcher Section */}
      <div className="p-4 border-t border-divider">
        <ThemeSwitcher />
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-divider">
        <a
          href="/logout"
          className="block w-full text-center text-sm text-danger hover:underline"
        >
          Logout
        </a>
      </div>
    </aside>
  );
}
