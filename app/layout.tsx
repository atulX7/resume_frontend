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
import { Toaster } from 'sonner'


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
  const isLegalPage = pathname?.startsWith('/legal')  // Add this line

  useEffect(() => {
    const handleStart = () => {
      // Don't show loading for mailto links and legal pages
      if (!window.location.href.startsWith('mailto:') && !isLegalPage) {
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
  }, [router, isLegalPage])  // Add isLegalPage to dependencies

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
            <Suspense fallback={isLegalPage ? null : <Loading />}>
              {isLoading && !isLegalPage && <Loading />}
              <main>{children}</main>
            </Suspense>
            <Toaster position="top-right" />
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  )
}
