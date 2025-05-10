'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { siteConfig } from '@/config/site'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import React, { useState } from 'react'

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md z-50 shadow-sm pr-[var(--removed-body-scroll-bar-size)]">
      <div className="flex h-16 items-center px-4 sm:px-6 container mx-auto">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/" className="font-bold text-lg sm:text-xl text-primary">
            {title || siteConfig.name}
            <i><p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Triumph Starts Here</p></i>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="ml-auto md:hidden flex items-center p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="ml-auto hidden md:flex items-center gap-4">
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-md flex flex-col p-4 space-y-4 border-t dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          
          {session ? (
            <Button
              variant="default"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
              onClick={() => {
                const dashboardPath = session.user.role === 'ADMIN' ? '/admin/dashboard/mock-mate' : '/dashboard/mock-mate';
                window.location.href = dashboardPath;
              }}
            >
              {session.user.role === 'ADMIN' ? 'Admin Dashboard' : 'User Dashboard'}
            </Button>
          ) : (
            <Link href="/auth/login" className="w-full">
              <Button 
                variant="default" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}