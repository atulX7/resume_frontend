"use client";

import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarStore } from "@/hooks/use-sidebar-store";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/admin-panel/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebarStore();
  if (!sidebar) return null;
  const { isOpen, settings } = sidebar;

  return (
    <>
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <main
          className={cn(
            "flex-1 bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            !settings.disabled && (!isOpen ? "lg:ml-[90px]" : "lg:ml-72")
          )}
        >
          <Navbar />
          {children}
        </main>
        <footer
          className={cn(
            "transition-[margin-left] ease-in-out duration-300",
            !settings.disabled && (!isOpen ? "lg:ml-[90px]" : "lg:ml-72")
          )}
        >
          <Footer />
        </footer>
      </div>
    </>
  );
}
