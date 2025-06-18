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
  MoreHorizontal,
  Edit3,
  Trash2,
  Archive,
  Star,
  Clock,
  Filter,
  SortAsc,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  { icon: MessageSquare, label: "New Chat", href: "#", primary: true },
  { icon: BookOpen, label: "Library", href: "#library" },
  { icon: Settings, label: "Settings", href: "#" },
]

const chatHistory = {
  Today: [
    { id: "1", title: "Quantum Physics Basics", timestamp: "2 hours ago", starred: true },
    { id: "2", title: "Calculus Integration Methods", timestamp: "4 hours ago", starred: false },
    { id: "3", title: "World War II Timeline", timestamp: "6 hours ago", starred: false },
  ],
  Yesterday: [
    { id: "4", title: "Shakespeare Analysis", timestamp: "1 day ago", starred: false },
    { id: "5", title: "Chemical Bonding Types", timestamp: "1 day ago", starred: true },
    { id: "6", title: "Linear Algebra Concepts", timestamp: "1 day ago", starred: false },
  ],
  "Last 7 Days": [
    { id: "7", title: "Machine Learning Introduction", timestamp: "3 days ago", starred: false },
    { id: "8", title: "Ancient Rome History", timestamp: "4 days ago", starred: false },
    { id: "9", title: "Organic Chemistry Reactions", timestamp: "5 days ago", starred: true },
    { id: "10", title: "Statistics and Probability", timestamp: "6 days ago", starred: false },
  ],
  "Last 30 Days": [
    { id: "11", title: "Philosophy of Science", timestamp: "2 weeks ago", starred: false },
    { id: "12", title: "Molecular Biology", timestamp: "3 weeks ago", starred: false },
    { id: "13", title: "Art History Renaissance", timestamp: "3 weeks ago", starred: false },
    { id: "14", title: "Advanced Mathematics", timestamp: "4 weeks ago", starred: true },
  ],
}

const libraryCategories = {
  "Saved Chats": [
    { id: "s1", title: "Quantum Mechanics Deep Dive", subject: "Physics", date: "Dec 15, 2024" },
    { id: "s2", title: "Calculus Problem Solving", subject: "Mathematics", date: "Dec 14, 2024" },
    { id: "s3", title: "World History Analysis", subject: "History", date: "Dec 13, 2024" },
  ],
  "Study Notes": [
    { id: "n1", title: "Chemistry Formulas", subject: "Chemistry", date: "Dec 12, 2024" },
    { id: "n2", title: "Physics Constants", subject: "Physics", date: "Dec 11, 2024" },
    { id: "n3", title: "Math Theorems", subject: "Mathematics", date: "Dec 10, 2024" },
  ],
  "Favorites": [
    { id: "f1", title: "AI and Machine Learning", subject: "Computer Science", date: "Dec 9, 2024" },
    { id: "f2", title: "Ancient Civilizations", subject: "History", date: "Dec 8, 2024" },
  ],
}

interface ChatItem {
  id: string
  title: string
  timestamp: string
  starred: boolean
}

interface LibraryItem {
  id: string
  title: string
  subject: string
  date: string
}

export function Sidebar({ onNewChat }: { onNewChat: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<"chats" | "library">("chats")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Today: true,
    Yesterday: false,
    "Last 7 Days": false,
    "Last 30 Days": false,
    "Saved Chats": true,
    "Study Notes": false,
    "Favorites": false,
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userPlan, setUserPlan] = useState<"free" | "pro">("free")
  const [sortBy, setSortBy] = useState<"date" | "name">("date")
  const [filterStarred, setFilterStarred] = useState(false)

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleChatAction = (action: string, chatId: string) => {
    console.log(`${action} chat:`, chatId)
    // Implement chat actions here
  }

  const handleLibraryAction = (action: string, itemId: string) => {
    console.log(`${action} library item:`, itemId)
    // Implement library actions here
  }

  const filteredHistory = Object.entries(chatHistory).reduce(
    (acc, [period, chats]) => {
      let filtered = chats.filter((chat) => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      if (filterStarred) {
        filtered = filtered.filter(chat => chat.starred)
      }

      if (sortBy === "name") {
        filtered.sort((a, b) => a.title.localeCompare(b.title))
      }

      if (filtered.length > 0) {
        acc[period] = filtered
      }
      return acc
    },
    {} as Record<string, ChatItem[]>,
  )

  const filteredLibrary = Object.entries(libraryCategories).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, LibraryItem[]>,
  )

  const ChatItemComponent = ({ chat, onAction }: { chat: ChatItem; onAction: (action: string, id: string) => void }) => (
    <div className="group flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate font-medium">{chat.title}</span>
          {chat.starred && <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />}
        </div>
        <div className="text-xs text-gray-500 mt-1 ml-6">{chat.timestamp}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onAction("edit", chat.id)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("star", chat.id)}>
            <Star className="w-4 h-4 mr-2" />
            {chat.starred ? "Unstar" : "Star"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("archive", chat.id)}>
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction("delete", chat.id)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  const LibraryItemComponent = ({ item, onAction }: { item: LibraryItem; onAction: (action: string, id: string) => void }) => (
    <div className="group flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate font-medium">{item.title}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 ml-6">
          <Badge variant="secondary" className="text-xs px-2 py-0">{item.subject}</Badge>
          <span className="text-xs text-gray-500">{item.date}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onAction("open", item.id)}>
            <BookOpen className="w-4 h-4 mr-2" />
            Open
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("edit", item.id)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("favorite", item.id)}>
            <Star className="w-4 h-4 mr-2" />
            Add to Favorites
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction("delete", item.id)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
            <h1 className="text-lg font-semibold text-gray-900">Polymath</h1>
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
                      onClick={(e) => {
                        if (item.label === "New Chat") {
                          e.preventDefault()
                          onNewChat()
                          setActiveView("chats")
                        } else if (item.label === "Library") {
                          e.preventDefault()
                          setActiveView("library")
                        }
                      }}
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
          <SidebarGroupLabel className="text-sm font-medium text-gray-500 mb-3 flex items-center justify-between">
            {activeView === "chats" ? "Search Conversations" : "Search Library"}
            <div className="flex items-center gap-1">
              {activeView === "chats" && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterStarred(!filterStarred)}
                    className={`p-1 h-auto ${filterStarred ? "text-yellow-600" : "text-gray-400"}`}
                    title="Filter starred"
                  >
                    <Star className="w-3 h-3" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-400" title="Sort">
                        <SortAsc className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortBy("date")}>
                        <Clock className="w-4 h-4 mr-2" />
                        Sort by Date
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("name")}>
                        <SortAsc className="w-4 h-4 mr-2" />
                        Sort by Name
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder={activeView === "chats" ? "Search conversations..." : "Search library..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-200"
              />
            </div>

            <div className="space-y-2">
              {activeView === "chats" ? (
                Object.entries(filteredHistory).map(([period, chats]) => (
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
                      {chats.map((chat) => (
                        <ChatItemComponent key={chat.id} chat={chat} onAction={handleChatAction} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))
              ) : (
                Object.entries(filteredLibrary).map(([category, items]) => (
                  <Collapsible key={category} open={openSections[category]} onOpenChange={() => toggleSection(category)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-2 h-auto text-left rounded-lg hover:bg-gray-100"
                      >
                        <span className="text-sm font-medium text-gray-600">{category}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            openSections[category] ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-1">
                      {items.map((item) => (
                        <LibraryItemComponent key={item.id} item={item} onAction={handleLibraryAction} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))
              )}
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