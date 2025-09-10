import { getFileIcon } from "~/lib/helpers";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

import type { FileProp, FolderProp } from "~/app/mock-data";
import { Badge, Download, Folder, MoreVertical, Star, Trash2 } from "lucide-react";

type ListViewProps = {
	filteredItems: (FolderProp | FileProp)[];
	handleFolderClick: (folder: FolderProp) => void;
	handleFileClick: (file: FileProp) => void;
}

export default function ListView({
	filteredItems, handleFolderClick, handleFileClick
}: ListViewProps) {

	const renderItems = filteredItems.map((item) => {
		const { id, name, type } = item;

		return (
			<Card
				key={id}
				className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
				onClick={() => {
					if (item.type === "folder") {
						handleFolderClick(item);
					} else {
						handleFileClick(item);
					}
				}}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						{item.type === "folder" ? (
							<Folder className="text-brown-500 w-6 h-6 " />
						) : (
							getFileIcon(item)
						)}
						<div>
							<h3 className="text-sm font-medium">{name}</h3>
							<div className="flex items-center space-x-4 text-xs">
								{type === "file" && item.size && <span>{item.size}</span>}
								{type === "file" && (
									<Badge className="text-xs">
										{item.fileType}
									</Badge>
								)}
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
				</div>
			</Card>
		);
	});

	return (
		<div className="space-y-2">
			{renderItems}
		</div>
	);
}