"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  return (
    <>
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

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">How Will Your Information Be Used?</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Your information will be used to provide and improve our services, including:
                      - Analyzing your resume and providing detailed feedback
                      - Conducting mock interviews and providing performance assessments
                      - Personalizing career recommendations and job matching
                      - Improving our AI models to better serve your needs
                      - Communicating important updates about our services
                      We do not sell your personal information to third parties.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Future Services</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      As we develop new features and services, we may collect additional information to support these enhancements.
                      We will always notify you and update this privacy policy accordingly. Future services may include advanced
                      career tracking, skill assessments, and integrated job application systems.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Access to Your Information and Correction</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      You have the right to request a copy of the information we hold about you. If you would like a copy of your
                      personal information, please contact us. We want to ensure that your personal information is accurate and up
                      to date. You may ask us to correct or remove information you think is inaccurate.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Third-party Websites</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Our website may contain links to other websites. This privacy policy only applies to ResuWin, so when you
                      link to other websites, you should read their privacy policies. We integrate with professional networks
                      like LinkedIn and GitHub, but we only access the information you explicitly authorize.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Maintenance of Privacy Policy</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      We regularly review our privacy policy and place any updates on this webpage. This privacy policy was last
                      updated to reflect our commitment to transparency and to incorporate feedback from our users. We encourage
                      you to periodically review this policy to stay informed about how we protect your information.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">How to Contact Us</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      If you have any questions about our privacy policy or the information we hold about you, please contact us at:
                      <br />
                      Email: hello@resuwin.com
                      <br />
                      We aim to respond to all inquiries within 48 business hours.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Article 6: Lawful Processing of Personal Data</h2>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Processing is lawful only if and to the extent that at least one of the following applies:
                    </p>
                    <ol type="a" className="space-y-2 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="font-semibold text-primary">a)</span>
                        <span>The data subject has given consent to the processing of their personal data for specific purposes.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-semibold text-primary">b)</span>
                        <span>Processing is necessary for the performance of a contract to which the data subject is party.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-semibold text-primary">c)</span>
                        <span>Processing is necessary for compliance with a legal obligation.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-semibold text-primary">d)</span>
                        <span>Processing is necessary to protect vital interests of the data subject or another natural person.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-semibold text-primary">e)</span>
                        <span>Processing is necessary for the performance of a task carried out in the public interest.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-semibold text-primary">f)</span>
                        <span>Processing is necessary for the legitimate interests pursued by the controller or third party.</span>
                      </li>
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
    </>
  )
}