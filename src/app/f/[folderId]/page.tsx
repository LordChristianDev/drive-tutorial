import { notFound } from "next/navigation";
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
	try {
		// Validate folderId
		if (!folderId || folderId < 0) {
			notFound();
		}

		const [folders, files, parents] = await Promise.all([
			QUERIES.getFolders(folderId),
			QUERIES.getFiles(folderId),
			QUERIES.getAllParentsForFolder(folderId),
		]);

		// Handle case where folder doesn't exist
		if (!folders && !files && !parents) {
			notFound();
		}

		return <DriveContents files={files} folders={folders} parents={parents} />;
	} catch (error) {
		console.error('Error loading folder contents:', error);

		// For server components, you can either:
		// 1. Use notFound() for 404 errors
		if (error instanceof Error && error.message.includes('not found')) {
			notFound();
		}

		// 2. Or throw the error to be caught by error boundary
		throw new Error('Failed to load folder contents');
	}
}