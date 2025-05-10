"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const paths = pathname?.split('/').filter(path => path) ?? [];

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="px-4 sm:px-8 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {paths.map((path, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mx-1 sm:mx-2 flex-shrink-0" />
              )}
              <span className="text-muted-foreground capitalize text-sm sm:text-base">
                {path.replace(/-/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}