"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function Contact() {
  return (
    <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-6 md:p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-accent/50 rounded-lg p-6 mb-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Have questions or need assistance? We&apos;re here to help! Our team is dedicated to providing you with the best possible support.
            </p>
          </div>

          <div className="grid gap-8">
            <section>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Email Us</h2>
                  <div className="flex items-center gap-3 text-primary mb-4">
                    <Mail className="h-5 w-5" />
                    <a
                      href="mailto:hello@resuwin.com"
                      className="hover:underline text-lg"
                    >
                      hello@resuwin.com
                    </a>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Send us an email and we&apos;ll get back to you as soon as possible, usually within 1-2 business days.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Important Notes</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></span>
                      <span>Please check your spam/junk folder if you don&apos;t see our reply in your inbox.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></span>
                      <span>For urgent matters, please include &quot;URGENT&quot; in your email subject line.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></span>
                      <span>We respond to all inquiries in the order they are received.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="mt-8 text-sm text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}