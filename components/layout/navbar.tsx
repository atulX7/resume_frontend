'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { siteConfig } from '@/config/site'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { LucideIcon } from 'lucide-react'
import React from 'react'

type NavItem = {
  title: string
  href?: string
  icon?: LucideIcon
  items?: {
    title: string
    href: string
    description: string
    icon?: LucideIcon
  }[]
}

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 shadow-sm pr-[var(--removed-body-scroll-bar-size)]">
      <div className="flex h-16 items-center px-6 container mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="font-bold text-xl text-primary">
            {title || siteConfig.name}
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              {siteConfig.mainNav.map((item: NavItem) => (
                <NavigationMenuItem key={item.href || `menu-item-${item.title}`}>
                  {item.items ? (
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-primary-foreground">
                      <span className="flex items-center gap-1">
                        {item?.icon && <item.icon className="w-4 h-4" />}
                        {item.title}
                      </span>
                    </NavigationMenuTrigger>
                  ) : (
                    <Link href={item.href || '#'} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        "text-muted-foreground hover:text-primary-foreground"
                      )}>
                        <span className="flex items-center gap-1">
                          {item?.icon && <item.icon className="w-4 h-4" />}
                          {item.title}
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  )}

                  {item.items && (
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.items.map((subItem) => (
                          <li key={subItem.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center gap-2">
                                  {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {session ? (
            <Button
              variant="default"
              onClick={() => {
                const dashboardPath = session.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
                window.location.href = dashboardPath;
              }}
            >
              {session.user.role === 'ADMIN' ? 'Admin Dashboard' : 'User Dashboard'}
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button variant="default">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 