"use client";

import FeatureCard from "@/components/extra/FeatureCard";
import Tag from "@/components/extra/Tag";
import { motion } from "framer-motion";

const features = [
    "AI Resume Analysis",
    "ATS Optimization",
    "Mock Interviews",
    "Job Tracking",
    "Skills Assessment",
    "Career Insights",
    "Expert Feedback",
];

const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.7,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="flex justify-center">
                    <Tag className="bg-teal-50 text-teal-600">Core Features</Tag>
                </div>
                <h2 className="text-6xl font-medium text-center mt-6 max-w-2xl m-auto text-gray-800">
                    Tools for your{" "}
                    <span className="text-teal-600">career success</span>
                </h2>
                <motion.div variants={parentVariants} initial="hidden" animate="visible">
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
                        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                            <FeatureCard
                                title="AI-Powered Resume Analysis"
                                description="Get instant feedback on your resume with our advanced AI analysis"
                                className="md:col-span-2 lg:col-span-1 bg-white shadow-sm border border-gray-100 hover:border-teal-100 h-full"
                            >
                                <div className="aspect-video flex items-center justify-center">
                                    <div className="text-5xl">📄✨</div>
                                </div>
                            </FeatureCard>
                        </motion.div>

                        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                            <FeatureCard
                                title="Mock Interview Practice"
                                description="Practice with AI-driven interviews tailored to your industry"
                                className="md:col-span-2 lg:col-span-1 bg-white shadow-sm border border-gray-100 hover:border-teal-100 h-full"
                            >
                                <div className="aspect-video flex items-center justify-center">
                                    <div className="text-5xl">🎯💬</div>
                                </div>
                            </FeatureCard>
                        </motion.div>

                        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                            <FeatureCard
                                title="ATS Score Optimization"
                                description="Ensure your resume passes ATS systems with smart optimization"
                                className="md:col-span-2 lg:col-span-1 bg-white shadow-sm border border-gray-100 hover:border-teal-100 h-full"
                            >
                                <div className="aspect-video flex items-center justify-center">
                                    <div className="text-5xl">📊⭐</div>
                                </div>
                            </FeatureCard>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="my-8 flex items-center justify-center flex-wrap gap-2 max-w-3xl m-auto">
                    {features.map((feature) => (
                        <div
                            className="bg-teal-50 border border-teal-100 inline-flex px-3 md:px-5 md:py-2 py-1.5 rounded-2xl gap-3 items-center hover:scale-105 transition duration-500 group hover:bg-teal-100/50"
                            key={feature}
                        >
                            <span className="bg-teal-600 text-white size-5 rounded-full inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500">
                                ✓
                            </span>
                            <span className="font-medium md:text-lg text-gray-700">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
