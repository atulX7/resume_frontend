"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar"
import Providers from "./providers"
import { LoadingProvider } from '@/context/loading-context'
import { usePathname } from "next/navigation"

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
  const hideNavbar = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard')

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
            <main>{children}</main>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
