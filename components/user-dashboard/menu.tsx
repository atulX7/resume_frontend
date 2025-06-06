"use client";

import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/user";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { userMenuItems } from "@/config/user-sidebar";

interface MenuProps {
  isOpen: boolean | undefined;
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

export function Menu({ isOpen, isMobile, closeMobileMenu }: MenuProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col h-[calc(100vh-120px)] items-start space-y-1 px-2">
          {userMenuItems.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus?.map(({ href, label, icon: Icon, active }, index) => (
                <div className="w-full" key={index}>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={(active === undefined && pathname === href) || active ? "secondary" : "ghost"}
                          className="w-full justify-start h-10 mb-1"
                          asChild
                        >
                          <Link href={href} onClick={isMobile && closeMobileMenu ? closeMobileMenu : undefined}>
                            <span className={cn(isOpen === false ? "" : "mr-4")}>
                              <Icon size={18} />
                            </span>
                            <p className={cn("max-w-[200px] truncate", isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100")}>
                              {label}
                            </p>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      {isOpen === false && (
                        <TooltipContent side="right">{label}</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "w-full p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer",
                    isOpen === false ? "p-2" : "p-4"
                  )}>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user?.image || ''} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={cn("flex-1 overflow-hidden transition-all duration-200", 
                        isOpen === false ? "w-0 opacity-0" : "w-auto opacity-100"
                      )}>
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
} 