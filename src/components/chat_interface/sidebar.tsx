"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MessageSquare,
  BookOpen,
  Settings,
  User,
  Crown,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationItems = [
  { icon: MessageSquare, label: "New Chat", href: "#", primary: true },
  { icon: BookOpen, label: "Library", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

const chatHistory = {
  Today: ["Quantum Physics Basics", "Calculus Integration Methods", "World War II Timeline"],
  Yesterday: ["Shakespeare Analysis", "Chemical Bonding Types", "Linear Algebra Concepts"],
  "Last 7 Days": [
    "Machine Learning Introduction",
    "Ancient Rome History",
    "Organic Chemistry Reactions",
    "Statistics and Probability",
  ],
  "Last 30 Days": ["Philosophy of Science", "Molecular Biology", "Art History Renaissance", "Advanced Mathematics"],
}

export function Sidebar({ onNewChat }: { onNewChat: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Today: true,
    Yesterday: false,
    "Last 7 Days": false,
    "Last 30 Days": false,
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userPlan, setUserPlan] = useState<"free" | "pro">("free") // This would come from user context/API

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const filteredHistory = Object.entries(chatHistory).reduce(
    (acc, [period, chats]) => {
      const filtered = chats.filter((chat) => chat.toLowerCase().includes(searchQuery.toLowerCase()))
      if (filtered.length > 0) {
        acc[period] = filtered
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  return (
    <SidebarPrimitive
      className="border-r border-gray-200 bg-white transition-all duration-300 ease-in-out"
      collapsible="offcanvas"
    >
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">EduAI</h1>
            <p className="text-xs text-gray-500">Personalized Learning</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start rounded-lg transition-colors ${
                      item.primary ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <a
                      href={item.href === "#" ? undefined : item.href}
                      onClick={item.label === "New Chat" ? onNewChat : undefined}
                      className="flex items-center space-x-3 p-3"
                    >
                      {item.primary ? <Plus className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-sm font-medium text-gray-500 mb-3">
            Search Learning History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>

            <div className="space-y-2">
              {Object.entries(filteredHistory).map(([period, chats]) => (
                <Collapsible key={period} open={openSections[period]} onOpenChange={() => toggleSection(period)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto text-left rounded-lg hover:bg-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-600">{period}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          openSections[period] ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1">
                    {chats.map((chat, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto text-left rounded-lg hover:bg-gray-100"
                      >
                        <span className="text-sm text-gray-700 truncate">{chat}</span>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <div className="space-y-3">
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-left flex-1">
                  <div className="font-medium text-gray-900">Student Account</div>
                  <div className="text-xs text-gray-500">{userPlan === "pro" ? "Pro Plan" : "Free Plan"}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                {dropdownOpen ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                )}
              </Button>
            </div>

            {dropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-sm">
                    <Crown className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Upgrade Plan</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-sm">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Settings</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-sm">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Help Center</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-sm">
                    <Flag className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Report an Issue</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  )
}
