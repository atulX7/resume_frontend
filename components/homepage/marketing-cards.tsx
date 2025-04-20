"use client";
import { motion } from "framer-motion"
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const ServicesData = [
  {
    id: 1,
    name: "ATS Score Analysis",
    description: "Get detailed insights on how your resume performs against ATS systems. Our AI analyzes and scores your resume, providing actionable improvements.",
    imageUrl: "https://img.icons8.com/fluency/96/analytics.png",
    url: "/auth/login",
    color: "from-[#2563eb] to-[#3b82f6]",
  },
  {
    id: 2,
    name: "Resume Enhancement",
    description: "Transform your resume with AI-powered suggestions, professional formatting, and industry-specific optimization to stand out from the competition.",
    imageUrl: "https://img.icons8.com/fluency/96/resume.png",
    url: "/auth/login",
    color: "from-[#059669] to-[#34d399]",
  },
  {
    id: 3,
    name: "Mock Interviews",
    description: "Practice with AI-driven interview simulations tailored to your industry. Receive instant feedback on your responses and communication skills.",
    imageUrl: "https://img.icons8.com/fluency/96/communication.png",
    url: "/auth/login",
    color: "from-[#7c3aed] to-[#8b5cf6]",
  },
  {
    id: 4,
    name: "Smart Career Tips",
    description: "Access personalized career advice and industry insights powered by AI to help you make informed decisions about your professional journey.",
    imageUrl: "https://img.icons8.com/fluency/96/light-on.png",
    url: "/auth/login",
    color: "from-[#db2777] to-[#ec4899]",
  }
];

export default function MarketingCards() {
  return (
    <section className="py-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
          Our Features
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Comprehensive tools and services to enhance your job search journey
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {ServicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <div className={`h-full w-full bg-gradient-to-br ${service.color}`}></div>
              </div>

              <div className="relative z-10">
                {/* Image and Link */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      width={100}
                      height={100}
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Link
                    href={service.url}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>

                {/* Content */}
                <Link href={service.url} className="block">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
