"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Download,
  MoreVertical,
  ChevronRight,
  Home,
  Star,
  Trash2,
  Clock,
  Menu,
  ChevronLeft,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

interface FileItem {
  id: string
  name: string
  type: "folder" | "file"
  size?: string
  modified: string
  fileType?: "document" | "image" | "video" | "audio"
  url?: string
  children?: FileItem[]
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "2 days ago",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.pdf",
        type: "file",
        size: "2.4 MB",
        modified: "1 hour ago",
        fileType: "document",
        url: "https://example.com/proposal.pdf",
      },
      {
        id: "1-2",
        name: "Meeting Notes.docx",
        type: "file",
        size: "156 KB",
        modified: "3 hours ago",
        fileType: "document",
        url: "https://example.com/notes.docx",
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    children: [
      {
        id: "2-1",
        name: "vacation-beach.jpg",
        type: "file",
        size: "4.2 MB",
        modified: "5 days ago",
        fileType: "image",
        url: "https://example.com/beach.jpg",
      },
      {
        id: "2-2",
        name: "family-dinner.png",
        type: "file",
        size: "3.1 MB",
        modified: "1 week ago",
        fileType: "image",
        url: "https://example.com/dinner.png",
      },
    ],
  },
  {
    id: "3",
    name: "Videos",
    type: "folder",
    modified: "3 days ago",
    children: [
      {
        id: "3-1",
        name: "presentation-demo.mp4",
        type: "file",
        size: "45.2 MB",
        modified: "2 days ago",
        fileType: "video",
        url: "https://example.com/demo.mp4",
      },
    ],
  },
  {
    id: "4",
    name: "Budget Spreadsheet.xlsx",
    type: "file",
    size: "892 KB",
    modified: "4 hours ago",
    fileType: "document",
    url: "https://example.com/budget.xlsx",
  },
  {
    id: "5",
    name: "Background Music.mp3",
    type: "file",
    size: "8.7 MB",
    modified: "1 day ago",
    fileType: "audio",
    url: "https://example.com/music.mp3",
  },
]

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"])
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") return <Folder className="w-6 h-6 text-primary" />

    switch (item.fileType) {
      case "image":
        return <ImageIcon className="w-6 h-6 text-green-500" />
      case "video":
        return <Video className="w-6 h-6 text-red-500" />
      case "audio":
        return <Music className="w-6 h-6 text-purple-500" />
      default:
        return <FileText className="w-6 h-6 text-blue-500" />
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentPath([...currentPath, item.name])
      setCurrentItems(item.children)
    } else if (item.type === "file" && item.url) {
      window.open(item.url, "_blank")
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentPath(["My Drive"])
      setCurrentItems(mockData)
    } else {
      const newPath = currentPath.slice(0, index + 1)
      setCurrentPath(newPath)
      setCurrentItems(mockData)
    }
  }

  const filteredItems = currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sidebarItems = [
    { icon: Home, label: "My Drive", active: true },
    { icon: Star, label: "Starred", active: false },
    { icon: Clock, label: "Recent", active: false },
    { icon: Trash2, label: "Trash", active: false },
  ]

  return (
    <div className="min-h-screen bg-background dark">
      <TooltipProvider>
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2">
                {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Drive</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search in Drive"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-96"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside
            className={`${sidebarCollapsed ? "w-16" : "w-64"} border-r border-border bg-sidebar p-4 transition-all duration-300`}
          >
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={item.active ? "secondary" : "ghost"}
                      className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
                    </Button>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right" className="ml-2">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>

            {!sidebarCollapsed && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Storage</h3>
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">6.5 GB of 15 GB used</p>
                </div>
              </div>
            )}
          </aside>

          <main className="flex-1 p-6">
            <nav className="flex items-center space-x-2 mb-6">
              {currentPath.map((path, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {path}
                  </button>
                  {index < currentPath.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
                </div>
              ))}
            </nav>

            <Card className="border-2 border-dashed border-border hover:border-primary transition-colors mb-6 p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here to upload</h3>
              <p className="text-muted-foreground mb-4">Or click to select files</p>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </Card>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      {getFileIcon(item)}
                      <h3 className="text-sm font-medium truncate w-full" title={item.name}>
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs text-muted-foreground">{item.modified}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="w-4 h-4 mr-2" />
                              Add to starred
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Move to trash
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(item)}
                        <div>
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{item.modified}</span>
                            {item.size && <span>{item.size}</span>}
                            {item.type === "file" && (
                              <Badge variant="secondary" className="text-xs">
                                {item.fileType}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="w-4 h-4 mr-2" />
                            Add to starred
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Move to trash
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No files found</h3>
                <p className="text-muted-foreground">Try adjusting your search or upload some files</p>
              </div>
            )}
          </main>
        </div>
      </TooltipProvider>
    </div>
  )
}
