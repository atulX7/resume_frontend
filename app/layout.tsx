"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar"
import Providers from "./providers"
import { LoadingProvider } from '@/context/loading-context'
import { usePathname } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"


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
  const [isLoading, setIsLoading] = useState(false)
  const hideNavbar = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    document.addEventListener('navigationstart', handleStart)
    document.addEventListener('navigationend', handleComplete)
    window.addEventListener('beforeunload', handleStart)

    return () => {
      document.removeEventListener('navigationstart', handleStart)
      document.removeEventListener('navigationend', handleComplete)
      window.removeEventListener('beforeunload', handleStart)
    }
  }, [])

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
