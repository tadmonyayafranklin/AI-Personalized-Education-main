"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  Plus,
  Sliders,
  Mic,
  X,
  Calculator,
  ArrowUp,
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Eye,
  EyeOff,
  Zap,
  FileText,
  FileCode,
  Github,
  FileImage,
  FileIcon,
} from "lucide-react"

// Types
interface Tool {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  file: File
}

interface FormatButton {
  icon: React.ReactNode
  label: string
  action: () => void
  shortcut?: string
}

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  placeholder?: string
  isLoading?: boolean
}

// Constants
const AVAILABLE_TOOLS: Tool[] = [
  {
    id: "calculator",
    name: "Desmos Calculator",
    icon: <Calculator className="w-4 h-4" />,
    color: "bg-green-100 text-green-800",
    description: "Solve math problems and create graphs",
  },
  {
    id: "animation",
    name: "Animation",
    icon: <Zap className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-800",
    description: "Create animated content",
  },
]

const FILE_TYPE_MAP: Record<string, string> = {
  // Documents
  pdf: "PDF",
  doc: "Word",
  docx: "Word",
  txt: "Text",
  md: "Markdown",
  json: "JSON",
  csv: "CSV",
  
  // Spreadsheets
  xls: "Excel",
  xlsx: "Excel",
  
  // Presentations
  ppt: "PowerPoint",
  pptx: "PowerPoint",
  
  // Programming languages
  js: "JavaScript",
  jsx: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  py: "Python",
  java: "Java",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  php: "PHP",
  rb: "Ruby",
  go: "Go",
  rs: "Rust",
  c: "C",
  cpp: "C++",
  cs: "C#",
  swift: "Swift",
  kt: "Kotlin",
  dart: "Dart",
  sql: "SQL",
  
  // Config files
  yaml: "YAML",
  yml: "YAML",
  toml: "TOML",
  xml: "XML",
  
  // Scripts
  sh: "Shell",
  bash: "Bash",
  ps1: "PowerShell",
  bat: "Batch",
  
  // Images
  jpg: "Image (JPG)",
  jpeg: "Image (JPEG)",
  png: "Image (PNG)",
  gif: "Image (GIF)",
  svg: "Image (SVG)",
  webp: "Image (WebP)",
  bmp: "Image (BMP)",
  ico: "Image (ICO)",
  tiff: "Image (TIFF)",
}

const MAX_TEXTAREA_HEIGHT = 158
const TEXTAREA_MIN_HEIGHT = 30

// Utility functions
const getFileExtension = (fileName: string): string => 
  fileName.split(".").pop()?.toLowerCase() || ""

const getFileTypeLabel = (fileName: string): string => {
  const extension = getFileExtension(fileName)
  return FILE_TYPE_MAP[extension] || extension.toUpperCase()
}

const isFileType = (fileName: string, types: string[]): boolean => {
  const extension = getFileExtension(fileName)
  return types.some(type => new RegExp(`^${type}$`, 'i').test(extension))
}

const getFileIcon = (fileName: string): React.ReactNode => {
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico', 'tiff']
  const codeTypes = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'html', 'css', 'scss', 'php', 'rb', 'go', 'rs', 'c', 'cpp', 'cs', 'swift', 'kt', 'dart', 'sql', 'yaml', 'yml', 'xml', 'sh', 'bash', 'ps1', 'bat']
  
  if (isFileType(fileName, imageTypes)) return <FileImage className="w-6 h-6" />
  if (isFileType(fileName, codeTypes)) return <FileCode className="w-6 h-6" />
  if (isFileType(fileName, ['pdf'])) return <FileText className="w-6 h-6" />
  
  return <FileIcon className="w-6 h-6" />
}

const getFileColor = (fileName: string): string => {
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico', 'tiff']
  const codeTypes = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'html', 'css', 'scss', 'php', 'rb', 'go', 'rs', 'c', 'cpp', 'cs', 'swift', 'kt', 'dart', 'sql', 'yaml', 'yml', 'xml', 'sh', 'bash', 'ps1', 'bat']
  
  if (isFileType(fileName, imageTypes)) return "bg-blue-100 text-blue-800"
  if (isFileType(fileName, codeTypes)) return "bg-orange-100 text-orange-800"
  if (isFileType(fileName, ['pdf'])) return "bg-pink-100 text-pink-800"
  
  return "bg-gray-100 text-gray-800"
}

const truncateFileName = (fileName: string, maxLength: number = 10): string => 
  fileName.length > maxLength ? `${fileName.substring(0, maxLength - 3)}...` : fileName

// Generate unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
}

// Simple markdown renderer component
const SimpleMarkdown: React.FC<{ children: string }> = ({ children }) => {
  const renderMarkdown = (text: string) => {
    // Basic markdown rendering
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$1. $2</li>')

    // Wrap consecutive <li> tags in <ul>
    html = html.replace(/(<li>.*<\/li>(?:\s*<li>.*<\/li>)*)/g, '<ul>$1</ul>')
    
    return { __html: html }
  }

  return <div dangerouslySetInnerHTML={renderMarkdown(children)} />
}

// Custom hooks
const useTextareaAutoResize = (value: string) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    const scrollHeight = textarea.scrollHeight
    const newHeight = Math.min(scrollHeight, MAX_TEXTAREA_HEIGHT)
    
    textarea.style.height = `${newHeight}px`
    textarea.style.overflowY = scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden"
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  return { textareaRef, adjustHeight }
}

const useClickOutside = (refs: React.RefObject<HTMLElement>[], callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refs.every(ref => 
        ref.current && !ref.current.contains(event.target as Node)
      )
      if (isOutside) callback()
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [refs, callback])
}

// Components
const FilePreview: React.FC<{
  file: UploadedFile
  onRemove: (id: string) => void
}> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/")
  const fileColor = getFileColor(file.name)

  if (isImage) {
    return (
      <div className="relative group">
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <img
            src={file.url}
            alt={file.name}
            className="h-[55px] w-auto object-cover"
          />
          <button
            onClick={() => onRemove(file.id)}
            className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 transition-colors"
            title="Remove file"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        <span className="text-xs text-gray-500 mt-1 truncate max-w-[55px] block">
          {truncateFileName(file.name, 10)}
        </span>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${fileColor} border border-gray-200`}>
        <div className={fileColor.split(' ')[1]}>{getFileIcon(file.name)}</div>
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate max-w-[140px]">{file.name}</span>
          <span className="text-xs opacity-80">{getFileTypeLabel(file.name)}</span>
        </div>
        <button
          onClick={() => onRemove(file.id)}
          className="ml-2 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          title="Remove file"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

const ToolPill: React.FC<{
  tool: Tool
  onRemove: () => void
}> = ({ tool, onRemove }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${tool.color}`}>
    {tool.icon}
    <span>{tool.name}</span>
    <button
      onClick={onRemove}
      className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
      title="Remove tool"
    >
      <X className="w-3 h-3" />
    </button>
  </div>
)

const Dropdown: React.FC<{
  isOpen: boolean
  children: React.ReactNode
  className?: string
}> = ({ isOpen, children, className = "" }) => {
  if (!isOpen) return null
  
  return (
    <div className={`absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 ${className}`}>
      {children}
    </div>
  )
}

// Main component
export function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask anything...",
  isLoading = false,
}: ChatInputProps) {
  // State
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [showToolSelector, setShowToolSelector] = useState(false)
  const [showPlusDropdown, setShowPlusDropdown] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showFormatting, setShowFormatting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { textareaRef } = useTextareaAutoResize(value)

  // Close dropdowns when clicking outside
  useClickOutside([containerRef], () => {
    setShowToolSelector(false)
    setShowPlusDropdown(false)
  })

  // Event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((value.trim() || uploadedFiles.length > 0) && !isLoading) {
      onSubmit(e as React.FormEvent<HTMLFormElement>)
    }
  }

  const insertText = useCallback((before: string, after = "", placeholder = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || placeholder
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end)

    onChange({ target: { value: newText } } as React.ChangeEvent<HTMLTextAreaElement>)

    setTimeout(() => {
      const newPosition = start + before.length + (selectedText ? textToInsert.length : 0)
      textarea.setSelectionRange(newPosition, newPosition + (selectedText ? 0 : placeholder.length))
      textarea.focus()
    }, 0)
  }, [value, onChange, textareaRef])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
      return
    }

    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      const shortcuts: Record<string, () => void> = {
        'b': () => insertText("**", "**", "bold text"),
        'i': () => insertText("*", "*", "italic text"),
        '`': () => insertText("`", "`", "code"),
      }
      
      if (shortcuts[e.key]) {
        e.preventDefault()
        shortcuts[e.key]()
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: generateId(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      file,
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])
    setShowPlusDropdown(false)
    
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id)
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.url)
      return prev.filter(file => file.id !== id)
    })
  }

  const formatButtons: FormatButton[] = [
    { icon: <Bold className="w-4 h-4" />, label: "Bold", action: () => insertText("**", "**", "bold text"), shortcut: "Ctrl+B" },
    { icon: <Italic className="w-4 h-4" />, label: "Italic", action: () => insertText("*", "*", "italic text"), shortcut: "Ctrl+I" },
    { icon: <Code className="w-4 h-4" />, label: "Code", action: () => insertText("`", "`", "code"), shortcut: "Ctrl+`" },
    { icon: <Link className="w-4 h-4" />, label: "Link", action: () => insertText("[", "](url)", "link text") },
    { icon: <List className="w-4 h-4" />, label: "Bullet List", action: () => insertText("- ", "", "list item") },
    { icon: <ListOrdered className="w-4 h-4" />, label: "Numbered List", action: () => insertText("1. ", "", "list item") },
    { icon: <Quote className="w-4 h-4" />, label: "Quote", action: () => insertText("> ", "", "quote") },
  ]

  const hasContent = value.trim() || uploadedFiles.length > 0

  return (
    <div className="relative" ref={containerRef}>
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
        {/* Formatting toolbar */}
        {showFormatting && (
          <div className="border-b border-gray-100 px-5 py-2.5">
            <div className="flex items-center gap-1 flex-wrap">
              {formatButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.action}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={`${button.label}${button.shortcut ? ` (${button.shortcut})` : ""}`}
                >
                  {button.icon}
                </button>
              ))}
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`p-2 rounded-lg transition-colors ${
                  showPreview ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                }`}
                title="Toggle Preview"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <div className="px-5 py-3.5 flex flex-col">
          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="w-full mb-3.5 max-h-[110px] overflow-y-auto flex flex-wrap gap-2">
              {uploadedFiles.map(file => (
                <FilePreview key={file.id} file={file} onRemove={removeFile} />
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="w-full min-h-[30px] mb-2 overflow-y-auto">
            {showPreview ? (
              <div className="min-h-[30px] max-h-[158px] overflow-y-auto text-gray-900 text-base leading-6 prose prose-sm max-w-none">
                {value ? (
                  <SimpleMarkdown>{value}</SimpleMarkdown>
                ) : (
                  <p className="text-gray-500 italic">Preview will appear here...</p>
                )}
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
                className="w-full resize-none border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 text-base leading-6"
                style={{
                  minHeight: `${TEXTAREA_MIN_HEIGHT}px`,
                  maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
                  wordBreak: "break-word",
                }}
                rows={1}
              />
            )}
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center gap-2.5 mt-auto">
            {/* Add attachment */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPlusDropdown(!showPlusDropdown)
                  setShowToolSelector(false)
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add attachment"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                hidden
              />

              <Dropdown isOpen={showPlusDropdown} className="min-w-[210px]">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors"
                >
                  <FileImage className="w-4 h-4 text-gray-600" />
                  <span>Add Photos and Files</span>
                </button>
                <button
                  onClick={() => {
                    console.log("Import from GitHub")
                    setShowPlusDropdown(false)
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors"
                >
                  <Github className="w-4 h-4 text-gray-600" />
                  <span>Import from GitHub</span>
                </button>
                <button
                  onClick={() => {
                    console.log("Import from Notion")
                    setShowPlusDropdown(false)
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors"
                >
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span>Import from Notion</span>
                </button>
              </Dropdown>
            </div>

            {/* Tools selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowToolSelector(!showToolSelector)
                  setShowPlusDropdown(false)
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
                title="Select tool"
              >
                <Sliders className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Tools</span>
              </button>

              <Dropdown isOpen={showToolSelector} className="min-w-[270px]">
                {AVAILABLE_TOOLS.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool)
                      setShowToolSelector(false)
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${tool.color}`}>{tool.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.description}</div>
                    </div>
                  </button>
                ))}
              </Dropdown>
            </div>

            {/* Selected tool */}
            {selectedTool && (
              <ToolPill tool={selectedTool} onRemove={() => setSelectedTool(null)} />
            )}

            <div className="flex-1" />

            {/* Voice input */}
            <button 
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
              title="Voice input"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </button>

            {/* Send button */}
            <button
              onClick={handleSubmit}
              className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50"
              title={hasContent ? "Send message" : "Voice input"}
              disabled={isLoading}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Helper text */}
      <div className="text-center mt-3">
        <p className="text-sm text-gray-500">
          Press Enter to send, Shift + Enter for new line • Supports Markdown formatting
        </p>
        {showFormatting && (
          <p className="text-xs text-gray-400 mt-1">
            Ctrl+B for bold, Ctrl+I for italic, Ctrl+` for code
          </p>
        )}
      </div>
    </div>
  )
}