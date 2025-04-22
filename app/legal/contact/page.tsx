'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" passHref>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

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
    </div>
  )
}