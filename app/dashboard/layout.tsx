"use client";

import { Footer } from "@/components/user-dashboard/footer";
import { Sidebar } from "@/components/user-dashboard/sidebar";
import { useUserSidebarStore } from "@/hooks/use-user-sidebar-store";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/user-dashboard/navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useUserSidebarStore();
  const pathname = usePathname();
  if (!sidebar) return null;
  const { isOpen, settings } = sidebar;

  // Check if current path is mock-mate session
  const isMockMateSession = pathname?.includes('/dashboard/mock-mate/session');

  // Return a clean layout for mock-mate session
  if (isMockMateSession) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <main
          className={cn(
            "flex-1 bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 pb-4",
            !settings.disabled && (!isOpen ? "lg:ml-[90px]" : "lg:ml-72")
          )}
        >
          <Navbar />
          {children}
        </main>
        <footer
          className={cn(
            "transition-[margin-left] ease-in-out duration-300 h-16",
            !settings.disabled && (!isOpen ? "lg:ml-[90px]" : "lg:ml-72")
          )}
        >
          <Footer />
        </footer>
      </div>
    </>
  );
}