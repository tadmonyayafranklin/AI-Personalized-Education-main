"use client"

import Image from "next/image"
import { Roboto_Mono } from "next/font/google"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/landing_page/navigation"

const robotoMono = Roboto_Mono({
  weight: "500",
  subsets: ["latin"],
})

interface BrainLandingBackgroundProps {
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  onStartLearning?: () => void
  onPricingClick?: () => void
  onFaqsClick?: () => void
  onFeaturesClick?: () => void
}

export default function BrainLandingBackground({
  primaryCtaLabel = "Start Your Journey",
  secondaryCtaLabel = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
  onStartLearning,
  onPricingClick,
  onFaqsClick,
  onFeaturesClick,
}: BrainLandingBackgroundProps) {
  const [imageSize, setImageSize] = useState({ width: 500, height: 400 })
  const [isMounted, setIsMounted] = useState(false)

  // Handle responsive sizing
  useEffect(() => {
    setIsMounted(true)

    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.6, 600)
      const height = width * 0.8 // Maintain aspect ratio
      setImageSize({ width, height })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isMounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <>
      <Navigation
        onStartLearning={onStartLearning}
        onPricingClick={onPricingClick}
        onFaqsClick={onFaqsClick}
        onFeaturesClick={onFeaturesClick}
      />
      <style jsx>{`
        @keyframes brainFloat {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg) rotateX(5deg);
          }
          25% {
            transform: translateY(-10px) rotateY(90deg) rotateX(5deg);
          }
          50% {
            transform: translateY(-5px) rotateY(180deg) rotateX(5deg);
          }
          75% {
            transform: translateY(-15px) rotateY(270deg) rotateX(5deg);
          }
        }

        @keyframes brainPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brain-container {
          animation: brainFloat 8s ease-in-out infinite, brainPulse 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .brain-container:hover {
          animation-play-state: paused;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in-up-delay {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .cta-buttons {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
      <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-4 py-8 pt-24">
        {/* Brain Image */}
        <div className="relative brain-container mb-8" style={{ width: imageSize.width, height: imageSize.height }}>
          <Image
            src="/images/brain.png"
            alt="3D Brain"
            fill
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 600px"
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Title Text */}
        <div className="text-center mb-8 max-w-4xl">
          <h1
            className={`${robotoMono.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-black tracking-wider fade-in-up`}
          >
            Learn Like Never Before
          </h1>
          <h2
            className={`${robotoMono.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-black mt-2 sm:mt-4 tracking-wider fade-in-up-delay`}
          >
            AI Made Just for You
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 cta-buttons">
          <Button
            onClick={onPrimaryClick}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl"
          >
            {primaryCtaLabel}
          </Button>
          <Button
            onClick={onSecondaryClick}
            variant="outline"
            size="lg"
            className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-medium rounded-lg"
          >
            {secondaryCtaLabel}
          </Button>
        </div>
      </section>
    </>
  )
}
