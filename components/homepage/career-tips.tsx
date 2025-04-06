"use client";
import { motion } from "framer-motion"
import Link from "next/link";
import { ArrowUpRight, Brain, BookOpen, Target, Sparkles } from "lucide-react";
import { Globe } from "@/components/magicui/globe";

const TipsData = [
  {
    id: 1,
    name: "Industry Insights",
    description: "Stay updated with the latest trends and requirements in your target industry.",
    icon: Target,
    url: "/career-tips/industry",
    color: "from-[#2563eb] to-[#3b82f6]",
  },
  {
    id: 2,
    name: "Career Growth",
    description: "Learn strategies for career advancement and professional development opportunities.",
    icon: Sparkles,
    url: "/career-tips/growth",
    color: "from-[#059669] to-[#34d399]",
  },
  {
    id: 3,
    name: "Learning Resources",
    description: "Access curated learning materials and courses to enhance your skills.",
    icon: BookOpen,
    url: "/career-tips/resources",
    color: "from-[#7c3aed] to-[#8b5cf6]",
  },
  {
    id: 4,
    name: "AI Career Coach",
    description: "Get personalized career advice and guidance from our AI-powered career coach.",
    icon: Brain,
    url: "/career-tips/ai-coach",
    color: "from-[#db2777] to-[#ec4899]",
  }
];

export default function CareerTips() {
  return (
    <section className="py-24 px-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-12 items-center">
          {/* Globe Section */}
          <div className="relative hidden lg:block">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-40 pt-8">
              <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Global{'\n'}Career
              </span>
              <Globe className="top-28" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
          </div>

          {/* Content Section */}
          <div>
            <div className="text-center lg:text-left mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
                Career Tips & Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto lg:mx-0">
                Enhance your professional journey with AI-powered insights and expert guidance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TipsData.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={tip.url}>
                    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                        <div className={`h-full w-full bg-gradient-to-br ${tip.color}`}></div>
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${tip.color}`}>
                            <tip.icon className="h-6 w-6 text-white" />
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {tip.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}