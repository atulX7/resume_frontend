"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";


export function Navbar() {
  const pathname = usePathname();
  const paths = pathname?.split('/').filter(path => path) ?? [];

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-2">
          {paths.map((path, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
              <span className="text-muted-foreground capitalize">
                {path}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}