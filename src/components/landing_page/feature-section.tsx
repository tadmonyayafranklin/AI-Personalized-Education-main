"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Feature {
  id: string
  title: string
  description: string
  mockupImage?: string
}

const features: Feature[] = [
  {
    id: "Animations",
    title: "Animated lessons, deeper insights",
    description:
      "Bring complex ideas to life with smooth, AI-generated Manim animations that break down tough concepts into simple, elegant visuals. Whether it's math, science, or logic, our animations turn abstract thoughts into clear, captivating stories—customized just for you.",
    mockupImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "Graphing",
    title: "Instant visuals for every equation",
    description:
      "Explore concepts through dynamic, real-time graphs powered by Desmos. Our AI model analyzes, enhances, and suggests in real time—helping you visualize anything with precision and clarity. Abstract ideas become tangible and easier to grasp.",
    mockupImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "Whiteboard",
    title: "Think it. Draw it. Learn it",
    description:
      "Draw, write, and interact freely—just like in a real classroom. Whether you're sketching diagrams, solving problems, or following AI explanations, the AI will watch, interpret, and respond. Your drawing board brings ideas to life with real-time, two-way visual interaction.",
    mockupImage: "/placeholder.svg?height=400&width=600",
  },
]

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState<string>("Animations")

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(activeFeature === featureId ? "" : featureId)
  }

  const activeFeatureData = features.find((f) => f.id === activeFeature)

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-stone-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Visual Display Area */}
          <div className="order-2 lg:order-1">
            <div className="relative bg-gradient-to-br from-stone-100 to-stone-200/50 rounded-2xl p-8 shadow-xl shadow-stone-200/50 border border-stone-200/50">
              {/* Mockup Container */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {activeFeatureData ? (
                  <div className="relative h-80 sm:h-96">
                    <Image
                      src={activeFeatureData.mockupImage || "/placeholder.svg?height=400&width=600"}
                      alt={`${activeFeatureData.title} mockup`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay with feature info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4"></div>
                  </div>
                ) : (
                  <div className="h-80 sm:h-96 flex items-center justify-center bg-stone-50">
                    <div className="text-center text-stone-400">
                      <div className="w-16 h-16 mx-auto mb-4 bg-stone-200 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-8 h-8" />
                      </div>
                      <p>Select a feature to see preview</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
            </div>
          </div>

          {/* Right Side - Feature List */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Features that make learning truly engaging
              </h2>
              <p className="text-lg text-gray-600">
                Discover how our platform transforms the way you learn, create, and understand.
              </p>
            </div>

            {/* Feature Accordion */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="border border-stone-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => handleFeatureClick(feature.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-stone-50/50 transition-colors rounded-xl"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <div className="flex-shrink-0 ml-4">
                      {activeFeature === feature.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 transition-transform" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 transition-transform" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Description */}
                  {activeFeature === feature.id && (
                    <div className="px-6 pb-4 pt-0">
                      <div className="border-t border-stone-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
