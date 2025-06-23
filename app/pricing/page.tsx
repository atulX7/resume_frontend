'use client'

import { useState } from 'react';
import { initiatePayment } from '@/services/payment-service';

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'usd' | 'inr'>('usd');

  // Pricing logic
  const priceMap = {
    usd: {
      pro: billing === 'monthly' ? 19 : 190,
      proLabel: billing === 'monthly' ? '$19' : '$190',
      proPeriod: billing === 'monthly' ? '/mo' : '/yr',
      freeLabel: '$0',
      freePeriod: '/mo',
    },
    inr: {
      pro: billing === 'monthly' ? 1499 : 14999,
      proLabel: billing === 'monthly' ? '₹1,499' : '₹14,999',
      proPeriod: billing === 'monthly' ? '/mo' : '/yr',
      freeLabel: '₹0',
      freePeriod: '/mo',
    },
  };
  const prices = priceMap[currency];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-300 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Choose the plan that fits your career journey. No hidden fees, cancel anytime.
        </p>
        <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
          {/* Billing Switch */}
          <div className="flex gap-0.5 border rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 font-semibold focus:outline-none transition ${billing === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-300'}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 font-semibold focus:outline-none transition ${billing === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-300'}`}
              onClick={() => setBilling('yearly')}
            >
              Yearly
            </button>
          </div>
          {/* Currency Switch */}
          <div className="flex gap-0.5 border rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 font-semibold focus:outline-none transition ${currency === 'usd' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-300'}`}
              onClick={() => setCurrency('usd')}
            >
              $ USD
            </button>
            <button
              className={`px-4 py-2 font-semibold focus:outline-none transition ${currency === 'inr' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-300'}`}
              onClick={() => setCurrency('inr')}
            >
              ₹ INR
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col border-2 border-indigo-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Free</h2>
          <p className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-200 mb-4">{prices.freeLabel}<span className="text-base font-medium text-gray-500">{prices.freePeriod}</span></p>
          <ul className="text-gray-700 dark:text-gray-300 mb-8 space-y-2 flex-1">
            <li>✔️ Basic Resume Analysis</li>
            <li>✔️ 1 Resume Tailoring / month</li>
            <li>✔️ 1 Mock Interview / month</li>
            <li>❌ Priority Support</li>
            <li>❌ Advanced Analytics</li>
          </ul>
          <button className="w-full py-3 rounded-lg bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-200 dark:hover:bg-gray-700 transition">Get Started</button>
        </div>
        {/* Pro Plan */}
        <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl shadow-2xl p-8 flex flex-col border-4 border-indigo-300 dark:border-indigo-500 scale-105 z-10">
          <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
          <p className="text-4xl font-extrabold text-white mb-4">{prices.proLabel}<span className="text-base font-medium text-indigo-200">{prices.proPeriod}</span></p>
          <ul className="text-indigo-100 mb-8 space-y-2 flex-1">
            <li>✔️ Unlimited Resume Analysis</li>
            <li>✔️ 10 Resume Tailoring / month</li>
            <li>✔️ 10 Mock Interviews / month</li>
            <li>✔️ Priority Support</li>
            <li>❌ Advanced Analytics</li>
          </ul>
          <button className="w-full py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition" onClick={() => initiatePayment('pro')}>Upgrade to Pro</button>
        </div>
        {/* Enterprise Plan */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col border-2 border-indigo-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Enterprise</h2>
          <p className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-200 mb-4">Custom</p>
          <ul className="text-gray-700 dark:text-gray-300 mb-8 space-y-2 flex-1">
            <li>✔️ Unlimited Everything</li>
            <li>✔️ Dedicated Account Manager</li>
            <li>✔️ Advanced Analytics</li>
            <li>✔️ Team Collaboration</li>
            <li>✔️ Priority Support</li>
          </ul>
          <button className="w-full py-3 rounded-lg bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-200 dark:hover:bg-gray-700 transition" onClick={() => initiatePayment('enterprise')}>Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
