import { Suspense } from "react";
import DriveContents from "~/app/drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone({
	params,
}: {
	params: { folderId: string };
}) {
	const parsedFolderId = Number(params.folderId);

	if (isNaN(parsedFolderId)) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
				<h3 className="text-xl text-muted-foreground">Invalid Folder</h3>
			</div>
		);
	}

	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
					<h3 className="text-xl text-muted-foreground">Loading...</h3>
				</div>
			}
		>
			{/* FolderContents is async so Suspense works fine */}
			<FolderContents folderId={parsedFolderId} />
		</Suspense>
	);
}

async function FolderContents({ folderId }: { folderId: number }) {
	const [folders, files, parents] = await Promise.all([
		QUERIES.getFolders(folderId),
		QUERIES.getFiles(folderId),
		QUERIES.getAllParentsForFolder(folderId),
	]);

	return <DriveContents files={files} folders={folders} parents={parents} />;
}
