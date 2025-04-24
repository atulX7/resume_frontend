"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Contact() {
  const router = useRouter()
  return (
    <div className="pt-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Have questions or need assistance? We&apos;re here to help!
            </p>
            
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <a 
                href="mailto:support@resuwin.com"
                className="hover:underline"
              >
                support@resuwin.com
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}