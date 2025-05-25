"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useUserSidebarStore } from "@/hooks/use-user-sidebar-store";
import { Menu } from "./menu";
import { siteConfig } from "@/config/site";
import { SidebarToggle } from "../admin-panel/sidebar-toggle";
import { useEffect, useCallback, useState } from "react";

// This component handles the responsive detection for the entire application
export function ResponsiveHandler() {
  const sidebar = useUserSidebarStore();

  // Use useCallback to avoid recreating the function on every render
  const checkMobile = useCallback(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      sidebar.setMobile(isMobile);
    }
  }, [sidebar]);

  useEffect(() => {
    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]); // Only depend on the stable callback

  return null; // This component just handles the responsive detection
}

export function Sidebar() {
  const sidebar = useUserSidebarStore();

  if (!sidebar) return null;
  const { isOpen, toggleOpen, settings, isMobile } = sidebar;

  // Don't render sidebar on mobile at all - it will be handled by the MobileSidebar component
  if (isMobile) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen transition-[width] ease-in-out duration-300",
        !isOpen ? "w-[90px]" : "w-72",
        settings.disabled && "hidden",
        "hidden lg:block" // Hide on mobile/tablet, show on desktop
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        className="relative h-full flex flex-col px-3 py-4 overflow-hidden shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300",
            !isOpen ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1 text-indigo-600 dark:text-indigo-400" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-indigo-600 dark:text-indigo-400",
                !isOpen
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              {siteConfig.name}
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebar = useUserSidebarStore();

  if (!sidebar) return null;
  const { settings, isMobile } = sidebar;
  if (settings.disabled) return null;

  // Don't render mobile sidebar if we're not on mobile
  if (!isMobile) return null;

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        )}
      </Button>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile sidebar drawer */}
      <div className={cn(
        "fixed top-0 right-0 z-50 h-screen w-3/4 max-w-sm bg-white dark:bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <PanelsTopLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
              {siteConfig.name}
            </h1>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
        <div className="p-4 pb-24">
          <Menu isOpen={true} isMobile={true} closeMobileMenu={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}