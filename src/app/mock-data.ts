import { Clock, Home, Star, Trash2, type LucideIcon } from "lucide-react";

export type AppbarUpdateProps = {
	viewMode?: "grid" | "list";
	searchQuery?: string;
	sidebarCollapsed: boolean;
}

export type FileDProp = {
	id: number;
	name: string;
	url: string;
	size: string;
	parent: number;
	fileType: string;
}

export type FolderDProp = {
	id: number;
	name: string;
	parent: number | null;
}

export type FileProp = {
	id: string;
	name: string;
	type: "file";
	url: string;
	size: string;
	parent: string;
	fileType: string;
}

export type FolderProp = {
	id: string;
	name: string;
	type: "folder";
	parent: string | null;
}

export type SidebarProp = {
	icon: LucideIcon;
	label: string;
	active: boolean;
}

export const mockFolders: FolderProp[] = [
	{ id: "root", name: "My Drive", type: "folder", parent: null },
	{ id: "1", name: "Documents", type: "folder", parent: "root" },
	{ id: "2", name: "Photos", type: "folder", parent: "root" },
	{ id: "3", name: "Videos", type: "folder", parent: "root" },
	{ id: "4", name: "Asset Videos", type: "folder", parent: "3" },
]

export const mockFiles: FileProp[] = [
	{ id: "1", name: "Project Proposal.pdf", type: "file", url: "https://example.com/proposal.pdf", size: "2.4 MB", parent: "1", fileType: "pdf" },
	{ id: "2", name: "Meeting Notes.docx", type: "file", url: "https://example.com/notes.docx", size: "156 KB", parent: "1", fileType: "docx" },
	{ id: "3", name: "vacation-beach.jpg", type: "file", url: "https://example.com/beach.jpg", size: "4.2 MB", parent: "2", fileType: "jpg" },
	{ id: "4", name: "family-dinner.png", type: "file", url: "https://example.com/dinner.png", size: "3.1 MB", parent: "2", fileType: "png" },
	{ id: "5", name: "presentation-demo.mp4", type: "file", url: "https://example.com/demo.mp4", size: "45.2 MB", parent: "3", fileType: "mp4" },
	{ id: "6", name: "Budget Spreadsheet.xlsx", type: "file", url: "https://example.com/budget.xlsx", size: "892 KB", parent: "root", fileType: "xlsx" },
	{ id: "7", name: "Background Music.mp3", type: "file", url: "https://example.com/music.mp3", size: "8.7 MB", parent: "root", fileType: "mp3" },
]

export const sidebarItems: SidebarProp[] = [
	{ icon: Home, label: "My Drive", active: true },
	{ icon: Star, label: "Starred", active: false },
	{ icon: Clock, label: "Recent", active: false },
	{ icon: Trash2, label: "Trash", active: false },
]
