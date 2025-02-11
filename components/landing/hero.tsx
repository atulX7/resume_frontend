'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images/resume1.png",
    "/images/resume2.png",  // Make sure you have this image
    "/images/resume3.png",  // Make sure you have this image
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds (including 1s transition)

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="container mx-auto px-6 pt-32 pb-16 relative">
      {/* Background gradient decoration */}
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-50/50 via-transparent to-secondary-50/50 blur-3xl" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Text Content */}
        <div className="flex flex-col gap-8 lg:-mt-32">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-gray-900">{siteConfig.name}&apos;s </span>
              <span className="text-gradient">
                Resume Builder
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gradient-dark">
              helps you get hired at top companies
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Create professional resumes in minutes with our AI-powered builder. Stand out from the crowd and increase your chances of landing your dream job.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button 
              size="lg" 
              className="btn-gradient shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              Build Your Resume →
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 hover:bg-gray-50/50 text-lg"
            >
              Get Your Resume Score
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 text-gray-600 mt-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Rating</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <span>10K+ Resumes Created</span>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative hidden lg:block lg:-mt-20">
          <div className="relative w-[400px] h-[500px] mx-auto">
            {images.map((img, index) => (
              <Image
                key={img}
                src={img}
                alt={`Resume Builder Preview ${index + 1}`}
                width={400}
                height={500}
                className={`object-contain absolute top-0 left-0 transition-all duration-1000
                  ${currentImage === index 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 rotate-12 scale-95'}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 