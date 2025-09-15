"use client"

import { useState } from "react";
import { Folder } from "lucide-react";

import { TooltipProvider } from "~/components/ui/tooltip";
import AppBar from "~/components/layout/appbar";
import GridView from "~/components/layout/grid-view";
import ListView from "~/components/layout/list-view";
import UploadFile from "~/components/common/upload-file";
import Navigations from "~/components/layout/navigations";
import Breadcrumbs from "~/components/layout/breadcrumbs";

import { type AppbarUpdateProps } from "./mock-data";
import type { files_table, folders_table } from "~/server/db/schema";

export default function DriveContents(props: {
  files: typeof files_table.$inferSelect[],
  folders: typeof folders_table.$inferSelect[],
  parents: typeof folders_table.$inferSelect[],
}) {
  const getRootFolder = props.folders.find(folder => folder.parent === null) ?? {};
  const [currentPath, setCurrentPath] = useState<typeof folders_table.$inferSelect[]>([getRootFolder as typeof folders_table.$inferSelect]);

  const [viewMode, setViewMode] = useState<AppbarUpdateProps['viewMode']>("grid")
  const [sidebarCollapsed, setSidebarCollapsed] = useState<AppbarUpdateProps['sidebarCollapsed']>(false)

  const allItems = [...props.files, ...props.folders];

  const handleFolderClick = (folder: typeof folders_table.$inferSelect) => setCurrentPath([...currentPath, folder]);

  const handleFileClick = (file: typeof files_table.$inferSelect) => window.open(file.url, "_blank");

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background dark flex flex-col">
        {/* <AppBar
          onChange={(updates) => {
            setViewMode(updates.viewMode);
            setSidebarCollapsed(updates.sidebarCollapsed);
          }}
        /> */}

        {/* <div className="flex flex-1 w-full">
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
            <Breadcrumbs breadcrumbs={props.parents} />

            <UploadFile />

            {viewMode === "grid" ? (
              <GridView
                filteredFiles={props.files}
                filteredFolders={props.folders}
                handleFileClick={handleFileClick}
              />
            ) : (
              <ListView
                filteredFiles={props.files}
                filteredFolders={props.folders}
                handleFolderClick={handleFolderClick}
                handleFileClick={handleFileClick}
              />
            )}

            {allItems.length === 0 && (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No files found</h3>
                <p className="text-muted-foreground">Try adjusting your search or upload some files</p>
              </div>
            )}
          </main>
        </div> */}
      </div>
    </TooltipProvider >
  )
}
