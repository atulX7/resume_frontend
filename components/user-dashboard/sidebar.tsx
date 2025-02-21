"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useUserSidebarStore } from "@/hooks/use-user-sidebar-store";
import { Menu } from "./menu";
import { siteConfig } from "@/config/site";
import { SidebarToggle } from "../admin-panel/sidebar-toggle";

export function Sidebar() {
  const sidebar = useUserSidebarStore();
  if (!sidebar) return null;
  const { isOpen, toggleOpen, settings } = sidebar;
  
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !isOpen ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
        <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        className="relative h-full flex flex-col px-3 py-4 overflow-hidden shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !isOpen ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
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