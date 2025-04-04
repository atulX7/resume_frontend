"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CallToAction() {
    const animation = useRef<AnimationPlaybackControls>();
    const [scope, animate] = useAnimate();
    const [slowDownAnimation, setSlowDownAnimation] = useState(false);

    useEffect(() => {
        animation.current = animate(
            scope.current,
            { x: "-50%" },
            { duration: 30, ease: "linear", repeat: Infinity }
        );
    }, []);

    useEffect(() => {
        if (animation.current) {
            if (slowDownAnimation) {
                animation.current.speed = 0.5;
            } else {
                animation.current.speed = 1;
            }
        }
    }, [slowDownAnimation]);

    return (
        <section className="py-24 bg-gradient-to-r from-teal-50 to-white">
            <div className="overflow-x-clip p-4 flex">
                <motion.div
                    ref={scope}
                    className="flex flex-none gap-16 pr-16 text-6xl md:text-7xl font-medium text-gray-900"
                    onMouseEnter={() => setSlowDownAnimation(true)}
                    onMouseLeave={() => setSlowDownAnimation(false)}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-16">
                            <span className="text-teal-600 text-6xl">
                                ★
                            </span>
                            <span className={twMerge(
                                "transition-colors duration-300",
                                slowDownAnimation ? "text-teal-600" : "text-gray-900"
                            )}>
                                Try it for free
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
