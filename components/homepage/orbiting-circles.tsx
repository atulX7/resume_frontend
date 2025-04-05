"use client";

import { IconProps } from "@radix-ui/react-icons/dist/types";
import { motion } from "framer-motion";
import { FileText, Users, Target, Brain } from "lucide-react";

interface OrbitingCirclesProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  radius?: number;
  reverse?: boolean;
}

function OrbitingCircles({ 
  children, 
  className = "", 
  duration = 20, 
  delay = 0, 
  radius = 100,
  reverse = false 
}: OrbitingCirclesProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        rotate: reverse ? -360 : 360
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center center",
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

const Icons = {
  resume: (props: IconProps) => (
    <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform">
      <FileText width="35px" height="35px" color="white" {...props} />
    </div>
  ),
  interview: (props: IconProps) => (
    <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform">
      <Users width="35px" height="35px" color="white" {...props} />
    </div>
  ),
  ats: (props: IconProps) => (
    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg shadow-green-500/30 hover:scale-110 transition-transform">
      <Target width="35px" height="35px" color="white" {...props} />
    </div>
  ),
  ai: (props: IconProps) => (
    <div className="p-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform">
      <Brain width="35px" height="35px" color="white" {...props} />
    </div>
  )
};

export function OrbitingCirclesComponent() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02]" />
      
      <span className="pointer-events-none relative whitespace-pre-wrap bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-center text-7xl font-bold leading-none text-transparent">
        Boost{'\n'}Career
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        duration={25}
        delay={0}
        radius={100}
      >
        <Icons.resume />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        duration={25}
        delay={12.5}
        radius={100}
      >
        <Icons.interview />
      </OrbitingCircles>

      {/* Outer Circles */}
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={180}
        duration={30}
        delay={0}
      >
        <Icons.ats />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={180}
        duration={30}
        delay={15}
      >
        <Icons.ai />
      </OrbitingCircles>
    </div>
  );
}
