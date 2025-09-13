import { Download, Folder, MoreVertical, Star, Trash2 } from "lucide-react";

import { getFileIcon } from "~/lib/helpers";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

import type { files, folders } from "~/server/db/schema";

type GridViewProps = {
	filteredFiles: typeof files.$inferSelect[];
	filteredFolders: typeof folders.$inferSelect[];
	handleFolderClick: (folder: typeof folders.$inferSelect) => void;
	handleFileClick: (file: typeof files.$inferSelect) => void;
}

export default function GridView({
	filteredFiles, filteredFolders,
	handleFolderClick, handleFileClick
}: GridViewProps) {

	const renderFiles = filteredFiles.map((file, index) => {
		const { id, name, size } = file;

		return (
			<Card
				key={id + index}
				className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
				onClick={() => handleFileClick(file)}
			>
				<div className="flex flex-col items-center justify-center text-center gap-2">
					{getFileIcon(file.fileType)}

					<h3 className="text-sm font-medium truncate w-full" title={name}>
						{name}
					</h3>
					<div className="flex items-center justify-between w-full">
						<span className="text-xs text-muted-foreground">
							{size}
						</span>
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
		);
	});

	const renderFolders = filteredFolders.map((folder, index) => {
		const { id, name } = folder;

		return (
			<Card
				key={id + index}
				className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
				onClick={() => handleFolderClick(folder)}
			>
				<div className="flex flex-col items-center justify-center text-center gap-2 h-full">
					<Folder className="w-6 h-6 text-grey-500" />
					<h3 className="text-sm font-medium truncate w-full" title={name}>
						{name}
					</h3>
				</div>
			</Card>
		);
	})

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{renderFolders} {renderFiles}
		</div>
	);
}