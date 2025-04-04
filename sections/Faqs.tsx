"use client";

import Tag from "@/components/extra/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
    {
        question: "How does the AI-powered resume analysis work?",
        answer: "Our AI analyzes your resume against industry standards, job descriptions, and ATS requirements. It provides detailed feedback on content, formatting, and keywords, helping you optimize your resume for maximum impact.",
    },
    {
        question: "What types of mock interviews do you offer?",
        answer: "We offer industry-specific mock interviews covering behavioral, technical, and role-specific questions. Our AI adapts to your responses and provides real-time feedback on your answers, body language, and communication skills.",
    },
    {
        question: "How accurate is the ATS optimization feature?",
        answer: "Our ATS optimization tool is regularly updated to match the latest ATS systems used by major companies. It has a 95% accuracy rate in identifying potential issues and suggesting improvements to help your resume pass ATS screenings.",
    },
    {
        question: "Can I track my job applications?",
        answer: "Yes! Our platform includes a comprehensive job tracking system where you can manage applications, set reminders for follow-ups, and track your interview progress across multiple companies.",
    },
    {
        question: "Do you offer personalized career coaching?",
        answer: "We provide AI-driven career insights and recommendations based on your profile and goals. For more personalized guidance, you can also connect with our network of certified career coaches through the platform.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="flex justify-center">
                    <Tag className="bg-teal-50 text-teal-600">FAQs</Tag>
                </div>
                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto text-gray-900">
                    Common questions{" "}
                    <span className="text-teal-600">answered</span>
                </h2>

                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <div
                            key={faq.question}
                            onClick={() => setSelectedIndex(faqIndex)}
                            className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal-100 transition-colors cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium m-0 text-gray-900">
                                    {faq.question}
                                </h3>
                                <Plus
                                    size={30}
                                    className={twMerge(
                                        "text-teal-600 flex-shrink-0 transition duration-300",
                                        selectedIndex === faqIndex &&
                                            "rotate-45"
                                    )}
                                />
                            </div>

                            <AnimatePresence>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            marginTop: 0,
                                        }}
                                        animate={{
                                            height: "auto",
                                            marginTop: 24,
                                        }}
                                        exit={{
                                            height: 0,
                                            marginTop: 0,
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
