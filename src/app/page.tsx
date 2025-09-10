"use client"

import { useState } from "react";
import { Folder, ChevronRight } from "lucide-react";

import { TooltipProvider } from "~/components/ui/tooltip";
import AppBar from "~/components/layout/appbar";
import GridView from "~/components/layout/grid-view";
import ListView from "~/components/layout/list-view";
import Navigations from "~/components/layout/navigations";
import UploadFile from "~/components/common/upload-file";

import {
  type AppbarUpdateProps, type FileProp, type FolderProp,
  mockFiles, mockFolders
} from "./mock-data";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root")
  const [currentPath, setCurrentPath] = useState<FolderProp[]>([
    { id: "root", name: "My Drive", type: "folder", parent: null }
  ]);

  const [viewMode, setViewMode] = useState<AppbarUpdateProps['viewMode']>("grid")
  const [searchQuery, setSearchQuery] = useState<AppbarUpdateProps['searchQuery']>("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState<AppbarUpdateProps['sidebarCollapsed']>(false)

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  const getCurrentFolders = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder)
  }

  const handleFolderClick = (folder: FolderProp) => {
    setCurrentFolder(folder.id);
    setCurrentPath([...currentPath, folder]);
  };

  const handleFileClick = (file: FileProp) => window.open(file.url, "_blank");

  const handleBreadCrumbClick = (folder: FolderProp) => {
    const index = currentPath.findIndex((item) => item.id === folder.id);

    if (folder) {
      setCurrentFolder(folder.id);
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };

  const filteredItems = [...getCurrentFolders(), ...getCurrentFiles()].filter((item) => {
    if (searchQuery) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (currentFolder === "root") {
      return item.parent === "root";
    }

    return true;
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background dark flex flex-col">
        <AppBar
          onChange={(updates) => {
            setViewMode(updates.viewMode);
            setSearchQuery(updates.searchQuery);
            setSidebarCollapsed(updates.sidebarCollapsed);
          }}
        />

        <div className="flex flex-1 w-full">
          <aside
            className={`${sidebarCollapsed ? "w-16" : "w-64"} flex flex-col h-[calc(100vh-4.375rem)] border-r border-border bg-sidebar transition-all duration-300 overflow-auto`}
          >
            <div className="flex-1 overflow-y-auto p-4">
              <Navigations sidebarCollapsed={sidebarCollapsed} />
            </div>

            {!sidebarCollapsed && (
              <div className="flex-shrink-0 p-4 border-t border-border">
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

          <main className="flex-1 p-6 overflow-auto">
            <nav className="flex items-center space-x-2 mb-6">
              {currentPath.map((path, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleBreadCrumbClick(path)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {path.name}
                  </button>
                  {index < currentPath.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
                </div>
              ))}
            </nav>

            {/* <UploadFile /> */}

            {viewMode === "grid" ? (
              <GridView
                filteredItems={filteredItems}
                handleFolderClick={handleFolderClick}
                handleFileClick={handleFileClick}
              />
            ) : (
              <ListView
                filteredItems={filteredItems}
                handleFolderClick={handleFolderClick}
                handleFileClick={handleFileClick}
              />
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
      </div>
    </TooltipProvider >
  )
}
