"use client"

import BrainLandingBackground from "@/components/landing_page/brain-landing-background"
import FeatureSection from "@/components/landing_page/feature-section"
import FAQsSection from "@/components/landing_page/faqs-section"
import Footer from "@/components/landing_page/footer"
import { SignIn2 } from "@/components/ui/sign-in"
import { useEffect, useState } from "react"

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false)

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const handleStartJourney = () => {
    // Show sign-in component when "Start Your Journey" is clicked
    setShowSignIn(true)
  }

  const handleLearnMore = () => {
    // Add your navigation logic here
    console.log("Learn More clicked")
    // Example: scroll to features section
    const nextSection = document.getElementById("features")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleStartLearning = () => {
    // Show sign-in component when "Start Learning" is clicked
    setShowSignIn(true)
  }

  const handlePricingClick = () => {
    console.log("Pricing clicked")
    // Add your navigation logic here
    const pricingSection = document.getElementById("pricing")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFaqsClick = () => {
    console.log("FAQs clicked")
    // Add your navigation logic here
    const faqsSection = document.getElementById("faqs")
    if (faqsSection) {
      faqsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCloseSignIn = () => {
    setShowSignIn(false)
  }

  const handleFeaturesClick = () => {
    console.log("Features clicked")
    // Add your navigation logic here
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <BrainLandingBackground
        primaryCtaLabel="Start Your Journey"
        secondaryCtaLabel="Learn More"
        onPrimaryClick={handleStartJourney}
        onSecondaryClick={handleLearnMore}
        onStartLearning={handleStartLearning}
        onPricingClick={handlePricingClick}
        onFaqsClick={handleFaqsClick}
        onFeaturesClick={handleFeaturesClick}
      />

      {/* Feature Section */}
      <section id="features">
        <FeatureSection />
      </section>

      <section id="pricing" className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing</h2>
          <p className="text-xl text-gray-600">Your pricing content will go here.</p>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs">
        <FAQsSection />
      </section>

      {/* Footer */}
      <Footer />

      {/* Sign In Modal */}
      {showSignIn && <SignIn2 onClose={handleCloseSignIn} />}
    </main>
  )
}
