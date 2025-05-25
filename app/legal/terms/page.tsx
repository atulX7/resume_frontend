"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsAndConditions() {
  const handleGDPROptOut = () => {
    // TODO: Implement GDPR opt-out functionality
    window.location.href = "mailto:hello@resuwin.com?subject=GDPR%20Opt-Out%20Request"
  }

  return (
    <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-6 md:p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Terms and Conditions
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-accent/50 rounded-lg p-6 mb-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              These terms and conditions outline the rules and regulations for the use of ResuWin&apos;s services.
              By accessing our platform, you agree to these terms. Please read them carefully before using our services.
            </p>
          </div>

          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Contents</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Acceptance of Terms",
                  "Services Description",
                  "User Accounts",
                  "Privacy and GDPR Compliance",
                  "Intellectual Property",
                  "User Content",
                  "Limitation of Liability",
                  "Changes to Terms"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Separator className="my-8" />

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using ResuWin, you agree to be bound by these Terms and Conditions.
                    If you do not agree with any part of these terms, please do not use our services.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Services Description</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    ResuWin provides resume analysis, interview preparation, and career development tools.
                    We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. User Accounts</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials
                    and for all activities that occur under your account.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Privacy and GDPR Compliance</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Your use of ResuWin is governed by our Privacy Policy and GDPR guidelines.
                    By using our services, you acknowledge that you have read and understood our privacy practices.
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-primary">GDPR Rights and Consent</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Under GDPR, you have the following rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access your stored personal information</li>
                    <li>Request corrections to your data</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw your consent at any time</li>
                    <li>Appeal to relevant supervisory authorities</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    If you no longer wish to be contacted about our services,{" "}
                    <button
                      onClick={handleGDPROptOut}
                      className="text-primary hover:underline font-medium"
                    >
                      click here
                    </button>
                    .
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Intellectual Property</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    All content, features, and functionality of ResuWin are owned by us and are protected
                    by international copyright, trademark, and other intellectual property laws.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. User Content</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    By submitting content to ResuWin, you grant us a worldwide, non-exclusive license to use,
                    reproduce, modify, and distribute your content for the purpose of providing our services.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Limitation of Liability</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    ResuWin is provided &quot;as is&quot; without any warranties. We shall not be liable for any
                    indirect, incidental, special, consequential, or punitive damages.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Changes to Terms</h2>
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. Continued use of ResuWin after
                    any changes constitutes acceptance of the new terms.
                  </p>
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