"use client";

import { Menu, X } from "lucide-react";
import Button from "@/components/extra/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="py-4 lg:py-8 fixed w-full top-0 z-50">
                <div className="container max-w-5xl">
                    <div className="border border-teal-100 rounded-[27px] lg:rounded-full bg-white/95 backdrop-blur shadow-sm">
                        <figure className="grid grid-cols-2 py-2 lg:px-4 px-4 items-center">
                            <div>
                                <span className="text-2xl font-bold">
                                    <span className="text-teal-600">Boost</span>
                                    <span className="text-teal-950">Resume</span>
                                </span>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="lg:hidden"
                                >
                                    {!isOpen ? (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: isOpen ? 0 : 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Menu className="text-teal-600" size={30} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isOpen ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <X className="text-teal-600" size={30} />
                                        </motion.div>
                                    )}
                                </button>
                                <Button
                                    variant="secondary"
                                    className="hidden lg:inline-flex items-center border-teal-200 text-teal-600 hover:border-teal-300"
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="primary"
                                    className="hidden lg:inline-flex items-center bg-teal-600 hover:bg-teal-700"
                                >
                                    Sign up
                                </Button>
                            </div>
                        </figure>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.figure
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden lg:hidden border-t border-teal-50"
                                >
                                    <div className="flex flex-col items-center gap-4 py-4">
                                    <Button 
                                            className="w-3/4 bg-teal-600 hover:bg-teal-700" 
                                            variant="primary"
                                        >
                                            Login
                                        </Button>
                                        <Button 
                                            className="w-3/4 bg-teal-600 hover:bg-teal-700" 
                                            variant="primary"
                                        >
                                            Sign up
                                        </Button>
                                    </div>
                                </motion.figure>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <div className="pb-[86px] md:pb-[98px]"></div>
        </>
    );
}
