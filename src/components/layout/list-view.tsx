import { Badge, Download, Folder, MoreVertical, Star, Trash2 } from "lucide-react";

import { getFileIcon } from "~/lib/helpers";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

import type { files_table, folders_table } from "~/server/db/schema";

type ListViewProps = {
	filteredFiles: typeof files_table.$inferSelect[];
	filteredFolders: typeof folders_table.$inferSelect[];
	handleFolderClick: (folder: typeof folders_table.$inferSelect) => void;
	handleFileClick: (file: typeof files_table.$inferSelect) => void;
}

export default function ListView({
	filteredFiles, filteredFolders,
	handleFolderClick, handleFileClick
}: ListViewProps) {

	const renderFiles = filteredFiles.map((file) => {
		const { id, name, size, fileType } = file;

		return (
			<Card
				key={id}
				className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
				onClick={() => handleFileClick(file)}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						{getFileIcon(file.fileType)}
						<div>
							<h3 className="text-sm font-medium">{name}</h3>
							<div className="flex items-center space-x-4 text-xs">
								<span>{size}</span>

								<Badge className="text-xs">
									{fileType}
								</Badge>
							</div>
						</div>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								size="sm"
								variant="ghost"
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
				</div >
			</Card >
		);
	});

	const renderFolders = filteredFolders.map((folder) => {
		const { id, name } = folder;

		return (
			<Card
				key={id}
				className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
				onClick={() => handleFolderClick(folder)}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Folder className="text-brown-500 w-6 h-6 " />

						<h3 className="text-sm font-medium">{name}</h3>
					</div>
				</div>
			</Card >
		);
	});

	return (
		<div className="space-y-2">
			{renderFolders}{renderFiles}
		</div>
	);
}