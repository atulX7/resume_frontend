'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { siteConfig } from '@/config/site'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import React from 'react'

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
              className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
              onClick={() => {
                const dashboardPath = session.user.role === 'ADMIN' ? '/admin/dashboard/mock-mate' : '/dashboard/mock-mate';
                window.location.href = dashboardPath;
              }}
            >
              {session.user.role === 'ADMIN' ? 'Admin Dashboard' : 'User Dashboard'}
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}