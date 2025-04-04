"use client";

import Button from "@/components/extra/Button";
import designExample1 from "@/assets/images/design-example-1.png";
import designExample2 from "@/assets/images/design-example-2.png";
import Image from "next/image";
import Pointer from "@/components/extra/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import cursorImage from "@/assets/images/cursor-you.svg";



export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();

    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
            [
                leftPointerScope.current,
                { y: [0, 16, 0], x: 0 },
                { duration: 0.5, ease: "easeInOut" },
            ],
        ]);

        rightDesignAnimate([
            [
                rightDesignScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        rightPointerAnimate([
            [
                rightPointerScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5 }],
            [
                rightPointerScope.current,
                { y: [0, 20, 0], x: 0 },
                { duration: 0.5, ease: "easeInOut" },
            ],
        ]);
    }, []);

    return (
        <section
            className="py-24 overflow-x-clip bg-white"
            style={{
                cursor: `url(${cursorImage.src}), auto`,
            }}
        >
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 100, x: -100 }}
                    className="absolute -left-32 top-16 hidden lg:block"
                    drag
                >
                    <Image
                        draggable={false}
                        src={designExample1}
                        alt="design example 1"
                    />
                </motion.div>
                <motion.div
                    ref={leftPointerScope}
                    initial={{ opacity: 0, y: 100, x: -200 }}
                    className="absolute top-96 left-56 hidden lg:block"
                >
                    <Pointer name="Andrea" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100, x: 100 }}
                    ref={rightDesignScope}
                    className="absolute -right-64 -top-16 hidden lg:block"
                    drag
                >
                    <Image
                        draggable={false}
                        src={designExample2}
                        alt="design example 2"
                    />
                </motion.div>
                <motion.div
                    ref={rightPointerScope}
                    initial={{ opacity: 0, x: 275, y: 100 }}
                    className="absolute -top-4 right-80 hidden lg:block"
                >
                    <Pointer color="red" name="Brew" />
                </motion.div>

                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-teal-500 rounded-full text-white font-semibold">
                        🎯 Trusted by 10,000+ job seekers
                    </div>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6 text-gray-900">
                    Land your dream job with confidence
                </h1>
                <p className="text-center text-xl text-gray-600 mt-8 max-w-2xl mx-auto">
                    Ace your interviews, optimize your resume for ATS, and stand out from the competition with AI-powered career tools.
                </p>
                <form className="mx-auto flex border border-teal-200 rounded-full p-2 mt-8 max-w-lg bg-white shadow-sm hover:border-teal-300 transition-colors">
                    <input
                        type="email"
                        placeholder="Enter your email to get started"
                        className="bg-transparent px-4 flex-1 w-full text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    />
                    <Button
                        size="sm"
                        className="whitespace-nowrap bg-teal-500 hover:bg-teal-600"
                        type="submit"
                        variant="primary"
                    >
                        Start Free Trial
                    </Button>
                </form>
            </div>
        </section>
    );
}
