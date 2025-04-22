"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation" 

export default function TermsAndConditions() {
  const router = useRouter()

  const handleGDPROptOut = () => {
    // TODO: Implement GDPR opt-out functionality
    window.location.href = "mailto:support@resuwin.com?subject=GDPR%20Opt-Out%20Request"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ResuWin, you agree to be bound by these Terms and Conditions.
            If you do not agree with any part of these terms, please do not use our services.
          </p>

          <h2>2. Services Description</h2>
          <p>
            ResuWin provides resume analysis, interview preparation, and career development tools.
            We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activities that occur under your account.
          </p>

          <h2>4. Privacy and GDPR Compliance</h2>
          <p>
            Your use of ResuWin is governed by our Privacy Policy and GDPR guidelines. 
            By using our services, you acknowledge that you have read and understood our privacy practices.
          </p>

          <h3>GDPR Rights and Consent</h3>
          <p>
            According to the GDPR, you provide consent by actively choosing to use our services 
            and accepting our privacy policy. This constitutes a confirmatory act that signals 
            your approval of how we handle your personal information.
          </p>

          <p>
            Under GDPR, you have the following rights:
          </p>
          <ul>
            <li>Access your stored personal information</li>
            <li>Request corrections to your data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw your consent at any time</li>
            <li>Appeal to relevant supervisory authorities</li>
          </ul>

          <p>
            Your personal data will be processed during your use of our services and stored in our 
            system when you have given active consent. If you no longer wish to be contacted about 
            our services,{" "}
            <button 
              onClick={handleGDPROptOut}
              className="text-primary hover:underline font-medium"
            >
              click here
            </button>
            .
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of ResuWin are owned by us and are protected
            by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>6. User Content</h2>
          <p>
            By submitting content to ResuWin, you grant us a worldwide, non-exclusive license to use,
            reproduce, modify, and distribute your content for the purpose of providing our services.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            ResuWin is provided &quot;as is&quot; without any warranties. We shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of ResuWin after
            any changes constitutes acceptance of the new terms.
          </p>

          <div className="mt-8 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}