"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: "what-is-polymath",
    question: "What is Polymath and how does it work?",
    answer:
      "Polymath is an AI-powered learning platform that adapts to your unique learning style. It uses advanced algorithms to create personalized lessons, interactive animations, and real-time feedback to help you master complex concepts more effectively than traditional learning methods.",
  },
  {
    id: "pricing-plans",
    question: "What pricing plans are available?",
    answer:
      "We offer flexible pricing plans to suit different needs: a free tier with basic features, a premium individual plan for advanced learning tools, and enterprise solutions for educational institutions. All plans include access to our core AI tutoring features with varying levels of customization and support.",
  },
  {
    id: "subjects-covered",
    question: "What subjects and topics does Polymath cover?",
    answer:
      "Polymath covers a wide range of subjects including mathematics, science, programming, languages, and more. Our AI can adapt to virtually any topic, creating custom animations, interactive graphs, and whiteboard sessions tailored to your specific learning goals and curriculum requirements.",
  },
  {
    id: "device-compatibility",
    question: "Is Polymath compatible with all devices?",
    answer:
      "Yes, Polymath is designed to work seamlessly across all devices. You can access your personalized learning experience on desktop computers, tablets, and smartphones through our responsive web platform. Your progress syncs automatically across all devices.",
  },
  {
    id: "getting-started",
    question: "How do I get started with Polymath?",
    answer:
      "Getting started is simple! Click 'Start Your Journey' to create your account, complete a brief assessment to help our AI understand your learning preferences, and begin exploring personalized lessons immediately. Our onboarding process takes less than 5 minutes.",
  },
  {
    id: "data-privacy",
    question: "How is my learning data protected?",
    answer:
      "We take data privacy seriously. All your learning data is encrypted and stored securely. We never share your personal information with third parties, and you have full control over your data. Our platform complies with GDPR and other international privacy standards.",
  },
  {
    id: "offline-access",
    question: "Can I use Polymath offline?",
    answer:
      "While Polymath requires an internet connection for real-time AI interactions and content generation, you can download certain lessons and materials for offline study. Your progress will sync automatically when you reconnect to the internet.",
  },
  {
    id: "support-help",
    question: "What kind of support is available?",
    answer:
      "We provide comprehensive support including 24/7 chat assistance, detailed documentation, video tutorials, and community forums. Premium users also get access to one-on-one onboarding sessions and priority support from our learning specialists.",
  },
]

export default function FAQsSection() {
  const [activeQuestion, setActiveQuestion] = useState<string>("")

  const handleQuestionClick = (questionId: string) => {
    setActiveQuestion(activeQuestion === questionId ? "" : questionId)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-stone-50 to-gray-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Polymath and how our AI-powered learning platform can transform your
            educational experience.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => handleQuestionClick(faq.id)}
                className={`w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between transition-all duration-200 hover:bg-gray-50/50 ${
                  activeQuestion === faq.id ? "bg-stone-50/80" : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {activeQuestion === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                  )}
                </div>
              </button>

              {/* Expanded Answer */}
              {activeQuestion === faq.id && (
                <div className="px-6 sm:px-8 pb-6 pt-0">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
