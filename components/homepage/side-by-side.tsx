"use client"
import { FileCheck, Brain, Target, Users } from 'lucide-react'
import { OrbitingCirclesComponent } from './orbiting-circles'
import { motion } from "framer-motion"

const features = [
  {
    name: 'Smart ATS Analysis',
    description:
      'Our AI-powered system analyzes your resume against job descriptions in real-time, providing detailed feedback on ATS compatibility and optimization suggestions.',
    icon: Target,
  },
  {
    name: 'Resume Enhancement',
    description: 'Get personalized recommendations to improve your resume content, formatting, and keywords based on industry standards and job requirements.',
    icon: FileCheck,
  },
  {
    name: 'AI Mock Interviews',
    description: 'Practice with our advanced AI interviewer that adapts to your industry and experience level, providing instant feedback on your responses.',
    icon: Users,
  },
  {
    name: 'Career Insights',
    description: 'Access AI-driven career advice and industry insights to make informed decisions about your professional development.',
    icon: Brain,
  },
];

export default function SideBySide() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:pr-8 lg:pt-4"
          >
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Boost Your Career</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                AI-Powered Career Enhancement
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Transform your job search with our comprehensive suite of AI-powered tools designed to optimize your resume and prepare you for interviews.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-blue-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <OrbitingCirclesComponent />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
