"use client";

import { motion } from "framer-motion";
import React from "react";

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix",
    "Adobe",
    "Salesforce",
];

export default function LogoTicker() {
    return (
        <section className="py-24 overflow-x-clip bg-white">
            <div className="container">
                <h3 className="text-center text-gray-600 text-xl">
                    Our users successfully landed jobs at
                </h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{
                            x: "-50%",
                        }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex gap-24 pr-24"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <React.Fragment key={i}>
                                {companies.map((company) => (
                                    <div
                                        key={company}
                                        className="flex items-center px-8 py-4 bg-teal-50 rounded-lg border border-teal-100"
                                    >
                                        <span className="text-gray-800 font-semibold text-lg">
                                            {company}
                                        </span>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
