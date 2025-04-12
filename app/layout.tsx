"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar"
import Providers from "./providers"
import { LoadingProvider } from '@/context/loading-context'
import { usePathname } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"
import { useRouter } from 'next/navigation'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const hideNavbar = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')

  useEffect(() => {
    const handleStart = () => {
      // Don't show loading for mailto links
      if (!window.location.href.startsWith('mailto:')) {
        setIsLoading(true)
      }
    }
    const handleComplete = () => setIsLoading(false)

    // Add error handling
    const handleError = (error: Error | ErrorEvent) => {
      if ((error as { status?: number }).status === 403) {
        router.push('/error-403')
      }
    }

    window.addEventListener('error', handleError)
    document.addEventListener('navigationstart', handleStart)
    document.addEventListener('navigationend', handleComplete)
    window.addEventListener('beforeunload', handleStart)

    return () => {
      window.removeEventListener('error', handleError)
      document.removeEventListener('navigationstart', handleStart)
      document.removeEventListener('navigationend', handleComplete)
      window.removeEventListener('beforeunload', handleStart)
    }
  }, [router])

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          hideNavbar ? '' : 'pt-16'
        }`}
      >
        <Providers>
          <LoadingProvider>
            {!hideNavbar && <Navbar />}
            <Suspense fallback={<Loading />}>
              {isLoading && <Loading />}
              <main>{children}</main>
            </Suspense>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
