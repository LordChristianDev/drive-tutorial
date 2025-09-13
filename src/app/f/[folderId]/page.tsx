import { Suspense } from "react";
import DriveContents from "~/app/drive-contents";
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
	params: Promise<{ folderId: string }>;
}) {
	const params = await props.params;
	const parsedFolderId = Number(params.folderId);

	if (isNaN(parsedFolderId)) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background dark">
				<h3 className="text-xl text-muted-foreground">Invalid Folder</h3>
			</div>
		);
	}

	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center min-h-screen bg-background dark">
					<h3 className="text-xl text-muted-foreground">Loading...</h3>
				</div>
			}>
			<FolderContents folderId={parsedFolderId} />
		</Suspense>
	);
}

async function FolderContents({ folderId }: { folderId: number }) {
	const [folders, files, parents] = await Promise.all([
		getFolders(folderId),
		getFiles(folderId),
		getAllParentsForFolder(folderId),
	]);

	return (
		<DriveContents
			files={files}
			folders={folders}
			parents={parents}
		/>
	);
}
