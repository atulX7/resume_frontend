'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Choose the perfect plan for your interview preparation needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Free Tier */}
          <Card className="relative p-8 bg-white shadow-lg rounded-2xl border-2 border-gray-100">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Free</h3>
              <p className="mt-4 text-gray-500">Perfect for getting started</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </p>
              <Button className="mt-8 w-full">Get Started</Button>
              <ul className="mt-8 space-y-4">
                <Feature>2 mock interviews per month</Feature>
                <Feature>Basic AI feedback</Feature>
                <Feature>Interview history</Feature>
                <Feature>Basic analytics</Feature>
              </ul>
            </div>
          </Card>

          {/* Pro Tier */}
          <Card className="relative p-8 bg-gradient-to-br from-primary/90 to-primary shadow-lg rounded-2xl border-2 border-primary">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <p className="mt-4 text-white/90">Best for serious job seekers</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-white/90">/month</span>
              </p>
              <Button variant="secondary" className="mt-8 w-full bg-white hover:bg-white/90 text-primary">
                Start Pro Trial
              </Button>
              <ul className="mt-8 space-y-4">
                <Feature light>Unlimited mock interviews</Feature>
                <Feature light>Advanced AI feedback</Feature>
                <Feature light>Detailed performance analytics</Feature>
                <Feature light>Custom interview scenarios</Feature>
                <Feature light>Interview recording & playback</Feature>
                <Feature light>Priority support</Feature>
              </ul>
            </div>
          </Card>

          {/* Enterprise Tier */}
          <Card className="relative p-8 bg-white shadow-lg rounded-2xl border-2 border-gray-100">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-gray-500">For teams and organizations</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-500">/month</span>
              </p>
              <Button className="mt-8 w-full">Contact Sales</Button>
              <ul className="mt-8 space-y-4">
                <Feature>Everything in Pro</Feature>
                <Feature>Team management dashboard</Feature>
                <Feature>Custom AI training</Feature>
                <Feature>Dedicated account manager</Feature>
                <Feature>API access</Feature>
                <Feature>Custom integrations</Feature>
              </ul>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-gray-500">
            Have a different question? Contact our{' '}
            <a href="#" className="text-primary hover:underline">
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function Feature({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <li className="flex items-center">
      <Check className={`h-5 w-5 mr-3 ${light ? 'text-white' : 'text-primary'}`} />
      <span>{children}</span>
    </li>
  )
}