'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const handleContactSupport = () => {
    window.location.href = "mailto:hello@resuwin.com?subject=Support%20Request"
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-5">
        <h1 className="text-9xl font-bold text-gray-900 dark:text-white">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Page not found</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg">
            We apologize for the inconvenience. Our team has been notified and is working 
            to resolve this issue. In the meantime, you can return to the homepage or try 
            your request again later.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button 
            asChild 
            variant="outline"
            className="border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-950"
          >
            <Link href="/">Go back home</Link>
          </Button>
          <Button 
            onClick={handleContactSupport}
            className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Contact support
          </Button>
        </div>
      </div>
    </div>
  )
}