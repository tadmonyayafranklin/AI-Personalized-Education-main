"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { User, Bot, AlertCircle, ArrowDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Message } from "@/types/chat"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChatInput } from "./chat-input"
import { motion, AnimatePresence } from "framer-motion"

interface ChatInterfaceProps {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  isFirstQuery: boolean
}

// Constants
const USER_EMAIL = "sarthak24910@gmail.com"
const APP_NAME = "Polymath"
const SCROLL_THRESHOLD = 100
const SUGGESTIONS = ["Explain quantum physics", "Help with calculus", "World history timeline", "Chemistry basics"]

// Animation variants
const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

const SCALE_FADE = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 20 }
}

// Utility functions
const extractFirstNameFromEmail = (email: string): string => {
  if (!email) return "there"
  const localPart = email.split("@")[0]
  const cleanName = localPart.replace(/[^a-zA-Z]/g, "")
  return cleanName.length > 0 
    ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase()
    : "there"
}

const getMessageConfig = (role: string) => {
  const configs = {
    user: {
      name: "You",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      avatarBg: "bg-gray-100",
      avatarText: "text-gray-600",
      icon: User,
      alignment: "justify-end"
    },
    assistant: {
      name: APP_NAME,
      bgColor: "",
      textColor: "text-gray-900",
      avatarBg: "bg-gray-900",
      avatarText: "text-white",
      icon: Bot,
      alignment: "justify-start"
    },
    system: {
      name: "System",
      bgColor: "",
      textColor: "text-red-600", 
      avatarBg: "bg-red-100",
      avatarText: "text-red-600",
      icon: AlertCircle,
      alignment: "justify-start"
    }
  }
  return configs[role as keyof typeof configs] || configs.assistant
}

// Components
function TypingDots() {
  return (
    <div className="flex items-center ml-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full mx-0.5"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ 
            duration: 1.2, 
            repeat: Number.POSITIVE_INFINITY, 
            delay: dot * 0.15, 
            ease: "easeInOut" 
          }}
        />
      ))}
    </div>
  )
}

function Header() {
  return (
    <div className="flex-shrink-0 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
        <div className="text-sm font-medium text-gray-700">{APP_NAME}</div>
        <div className="w-7" />
      </div>
    </div>
  )
}

function WelcomeScreen({ input, handleInputChange, handleSubmit, isLoading }: {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}) {
  const handleSuggestionClick = (suggestion: string) => {
    const event = { target: { value: suggestion } } as React.ChangeEvent<HTMLTextAreaElement>
    handleInputChange(event)
  }

  return (
    <motion.div
      key="welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black leading-tight px-4">
              Today, what do you want to learn,{" "}
              <span className="font-semibold text-black">
                {extractFirstNameFromEmail(USER_EMAIL)}
              </span>?
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="w-full px-4"
          >
            <ChatInput
              value={input}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              placeholder="Ask me anything to get started..."
              isLoading={isLoading}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4"
          >
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 hover:bg-white hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function MessageBubble({ message, index }: { message: Message; index: number }) {
  const config = getMessageConfig(message.role)
  const Icon = config.icon
  const isUser = message.role === "user"

  return (
    <motion.div
      key={message.id}
      {...FADE_IN_UP}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="space-y-3"
    >
      {isUser ? (
        // User message - right aligned without avatar
        <div className="flex justify-end">
          <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%]">
            <div className="flex justify-end mb-2">
              <span className={`text-sm font-medium ${config.textColor}`}>
                {config.name}
              </span>
            </div>
            <div className="inline-block px-4 py-3 bg-gray-100 rounded-2xl text-gray-900">
              <div className="whitespace-pre-wrap leading-relaxed text-base">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Assistant/System message - left aligned with avatar
        <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%] md:max-w-[65%]">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className={`${config.avatarBg} ${config.avatarText} text-sm`}>
              <Icon className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-start flex-1">
            <div className="flex items-center mb-2">
              <span className={`text-sm font-medium ${config.textColor}`}>
                {config.name}
              </span>
            </div>
            <div className="text-gray-900 leading-relaxed text-base whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function LoadingIndicator() {
  return (
    <motion.div
      {...FADE_IN_UP}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <div className="flex items-center space-x-3 mb-2">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-gray-900 text-white text-sm">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-900">{APP_NAME}</span>
      </div>
      <div className="ml-11">
        <div className="flex items-center gap-2 text-base text-gray-600">
          <span>Thinking</span>
          <TypingDots />
        </div>
      </div>
    </motion.div>
  )
}

export function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  isFirstQuery,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollToBottom, setShowScrollToBottom] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    setIsUserScrolling(false)
    setShowScrollToBottom(false)
  }

  const handleScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return
    
    const { scrollTop, scrollHeight, clientHeight } = container
    const isNearBottom = scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD
    
    // Only show scroll button if user has scrolled up significantly AND there are messages
    setShowScrollToBottom(!isNearBottom && messages.length > 0)
    
    // Mark user as actively scrolling
    setIsUserScrolling(!isNearBottom)
  }

  // Auto-scroll for new messages when user is at bottom or it's a new conversation
  useEffect(() => {
    if (!isUserScrolling || messages.length === 1) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [messages, isUserScrolling])

  useEffect(() => {
    if (isFirstQuery && messages.length === 0) {
      setIsUserScrolling(false)
      setShowScrollToBottom(false)
    }
  }, [isFirstQuery, messages.length])

  const shouldShowWelcome = isFirstQuery && messages.length === 0
  const shouldShowMessages = messages.length > 0
  const placeholderText = shouldShowMessages 
    ? "Continue the conversation..." 
    : "Ask me anything to get started..."

  return (
    <div className="flex flex-col h-full bg-white relative">
      <Header />

      <div className="flex-1 flex flex-col min-h-0">
        <AnimatePresence>
          {shouldShowWelcome && (
            <WelcomeScreen
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>

        {/* Messages Container */}
        {shouldShowMessages && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages scroll area */}
            <div 
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{ scrollbarGutter: 'stable' }}
            >
              <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="w-full space-y-6 sm:space-y-8">
                  {messages.map((message, index) => (
                    <MessageBubble 
                      key={message.id}
                      message={message} 
                      index={index} 
                    />
                  ))}
                  
                  <AnimatePresence>
                    {isLoading && <LoadingIndicator />}
                  </AnimatePresence>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
            
            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollToBottom && (
                <motion.div
                  {...SCALE_FADE}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-24 sm:bottom-28 right-4 sm:right-6 lg:right-8 z-10"
                >
                  <Button
                    onClick={scrollToBottom}
                    size="sm"
                    className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                    variant="outline"
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span className="sr-only">Scroll to bottom</span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Input area */}
            <div className="flex-shrink-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="w-full">
                  <ChatInput
                    value={input}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    placeholder={placeholderText}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}