'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">Page not found</h2>
          <p className="text-gray-600 max-w-lg">
            We apologize for the inconvenience. Our team has been notified and is working 
            to resolve this issue. In the meantime, you can return to the homepage or try 
            your request again later.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild variant="outline">
            <Link href="/">Go back home</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 