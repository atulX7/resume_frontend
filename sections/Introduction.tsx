"use client";

import Tag from "@/components/extra/Tag";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Introduction() {
    return (
        <section className="py-28 lg:py-40 bg-gradient-to-b from-white to-teal-50/30">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <Tag className="bg-teal-50 text-teal-600">About Us</Tag>
                        <h2 className="text-4xl font-bold text-gray-900">
                            Transforming Resume Building with AI Technology
                        </h2>
                        
                        <div className="space-y-4 text-gray-600">
                            <p>
                                At BoostResume, we understand the challenges of modern job hunting. Our AI-powered platform 
                                combines cutting-edge technology with proven resume-writing strategies to help you create 
                                compelling resumes that get noticed.
                            </p>
                            <p>
                                Founded by industry experts and AI specialists, we&apos;ve developed sophisticated algorithms 
                                that analyze your resume against current industry standards, ATS requirements, and 
                                job-specific criteria. Our platform provides real-time feedback, suggestions for 
                                improvement, and tailored content recommendations.
                            </p>
                            <p>
                                Whether you&apos;re a recent graduate, career changer, or seasoned professional, our tools 
                                adapt to your needs, ensuring your resume reflects your unique value proposition.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative lg:h-[600px]"
                    >
                        <div className="relative h-full rounded-2xl overflow-hidden">
                            <Image
                                src="/images/team-working.jpg"
                                alt="Professional team working on resume solutions"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-teal-600/10"></div>
                        </div>
                        <div className="absolute -bottom-8 -left-8 size-32 bg-teal-100 rounded-full -z-10"></div>
                        <div className="absolute -top-8 -right-8 size-40 bg-teal-50 rounded-full -z-10"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
