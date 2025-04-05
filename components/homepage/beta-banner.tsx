"use client";

import { motion } from "framer-motion";

export function BetaBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto px-4 py-12 text-center"
    >
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-indigo-950/30 dark:via-gray-900 dark:to-indigo-950/30 rounded-2xl p-8 shadow-lg border border-indigo-100 dark:border-indigo-900">
        <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-4 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-4">
          Beta Access
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Try It Free During Beta
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Get early access to all premium features during our beta period. Limited time offer - start enhancing your career journey today!
        </p>
      </div>
    </motion.div>
  );
}