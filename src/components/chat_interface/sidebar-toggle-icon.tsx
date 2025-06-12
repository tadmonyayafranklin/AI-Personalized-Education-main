"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeft, PanelLeftClose } from "lucide-react"

export function SidebarToggleIcon() {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className="w-8 h-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 group"
      aria-label={open ? "Close sidebar" : "Open sidebar"}
    >
      <div className="relative">
        {open ? (
          <PanelLeftClose className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <PanelLeft className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
        )}
      </div>
    </Button>
  )
}
