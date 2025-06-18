"use client"

import Image from "next/image"
import { Roboto_Mono } from "next/font/google"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/landing_page/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react"

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
      
      <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden flex flex-col items-center justify-center px-4 py-8 pt-24">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-full blur-3xl" />
        </div>

        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mb-8"
        >
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            AI-Powered Learning Platform
          </Badge>
        </motion.div>

        {/* Brain Image with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative mb-12"
          style={{ width: imageSize.width, height: imageSize.height }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotateY: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/brain.png"
              alt="3D Brain representing AI learning"
              fill
              priority
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 600px"
              style={{
                objectFit: "contain",
              }}
              className="drop-shadow-2xl"
            />
            
            {/* Floating elements around brain */}
            <motion.div
              animate={{ 
                x: [0, 20, 0],
                y: [0, -15, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -top-8 -right-8 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Zap className="w-6 h-6 text-blue-600" />
            </motion.div>
            
            <motion.div
              animate={{ 
                x: [0, -15, 0],
                y: [0, 10, 0],
                rotate: [0, -8, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-6 -left-6 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Brain className="w-5 h-5 text-purple-600" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Title Text with improved typography */}
        <div className="text-center mb-12 max-w-4xl relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Learn Like Never Before
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              AI Made Just for You
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Experience personalized education with AI-powered animations, interactive visualizations, and adaptive learning paths tailored to your unique style.
          </motion.p>
        </div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative z-10"
        >
          <Button
            onClick={onPrimaryClick}
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl border-0"
          >
            {primaryCtaLabel}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={onSecondaryClick}
            variant="outline"
            size="lg"
            className="group border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl shadow-sm hover:shadow-md"
          >
            {secondaryCtaLabel}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </Button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl relative z-10"
        >
          {[
            { icon: "🎬", title: "AI Animations", desc: "Complex concepts visualized" },
            { icon: "📊", title: "Interactive Graphs", desc: "Real-time mathematical exploration" },
            { icon: "✏️", title: "Smart Whiteboard", desc: "Draw, learn, and interact naturally" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  )
}