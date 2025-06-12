"use client"

import type React from "react"

import { useState } from "react"
import { ChatInterface } from "@/components/chat_interface/chat-interface"
import { Sidebar } from "@/components/chat_interface/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import type { Message } from "@/types/chat"
import { nanoid } from "nanoid"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstQuery, setIsFirstQuery] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: nanoid(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsFirstQuery(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const botMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content: `I received your message: "${input}". This is a simulated response to demonstrate the chat interface functionality. I'm here to help you learn and understand any topic you're curious about!`,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: nanoid(),
        role: "system",
        content: "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setMessages([])
    setIsFirstQuery(true)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar onNewChat={startNewChat} />
        <SidebarInset className="flex-1">
          {/* This wrapper centers the chat interface and prevents layout shift */}
          <main className="flex justify-center w-full h-full">
            <div className="w-full h-full max-w-4xl">
              <ChatInterface
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                isFirstQuery={isFirstQuery}
              />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}