import { Suspense } from "react";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";

import DriveContents from "~/app/drive-contents";

import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import type { folders } from "~/server/db/schema";

async function getAllParents(folderId: number) {
	let parents: typeof folders.$inferSelect[] = [];
	let currentId: number | null = folderId;

	while (currentId != null) {
		const folder = await db
			.select()
			.from(foldersSchema)
			.where(eq(foldersSchema.id, currentId));

		if (!folder[0]) {
			throw new Error("Folder not found!");
		}

		parents = [folder[0], ...parents];

		// parents.unshift(folder[0]);
		currentId = folder[0]?.parent;
	}

	return parents;
}

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
	const foldersPromise = await db
		.select()
		.from(foldersSchema)
		.where(eq(foldersSchema.parent, folderId));

	const filesPromise = await db
		.select()
		.from(filesSchema)
		.where(eq(filesSchema.parent, folderId));

	const parentsPromise = getAllParents(folderId);

	const [folders, files, parents] = await Promise.all([
		foldersPromise,
		filesPromise,
		parentsPromise,
	]);

	return (
		<DriveContents
			files={files}
			folders={folders}
			parents={parents}
		/>
	);
}
