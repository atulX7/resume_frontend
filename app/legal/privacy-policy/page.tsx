"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"  // Changed from next/router

export default function PrivacyPolicy() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardContent className="p-6 md:p-8">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Privacy Policy
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <div className="bg-accent/50 rounded-lg p-6 mb-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  ResuWin is a specialized platform focusing on resume analysis and career development services. 
                  To provide our services effectively, we need to collect certain personal information that is stored 
                  in our secure internal systems. This privacy policy explains how we use the personal information 
                  we collect when you use our website and services.
                </p>
              </div>

              <div className="grid gap-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Contents</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "What information do we collect?",
                      "How will your information be used?",
                      "Future Services",
                      "Access to your information and correction",
                      "Third-party websites",
                      "Maintenance of Privacy Policy",
                      "How to contact us",
                      "Article 6: Lawful processing of personal data"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <Separator className="my-8" />

                {/* Existing sections with enhanced styling */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">What Information Do We Collect?</h2>
                  <Card className="bg-card/50">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">
                        When you submit information to ResuWin, it is stored in our internal system. Additional information 
                        may be collected from various career-related platforms such as LinkedIn, Github, and other professional 
                        networks. Notes from interview sessions and AI analysis, along with customer feedback, are stored in 
                        our system as supplements to previously provided information. Other information that may be collected 
                        includes personality assessments and various certificates if required for specific services.
                      </p>
                    </CardContent>
                  </Card>
                </section>

                {/* Repeat the Card pattern for other sections */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-primary">How Will Your Information Be Used?</h2>
                  <Card className="bg-card/50">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {/* Existing content */}
                      </p>
                    </CardContent>
                  </Card>
                </section>

                {/* Continue with other sections... */}

                <section className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4 text-primary">Article 6: Lawful Processing of Personal Data</h2>
                  <Card className="bg-card/50">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">
                        Processing is lawful only if and to the extent that at least one of the following applies:
                      </p>
                      <ol type="a" className="space-y-2 text-muted-foreground">
                        {/* Existing list items with enhanced styling */}
                        <li className="flex items-start space-x-2">
                          <span className="font-semibold text-primary">a)</span>
                          <span>The data subject has given consent to the processing of their personal data for specific purposes.</span>
                        </li>
                        {/* Continue with other list items... */}
                      </ol>
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
      </div>
    </div>
  )
}