import "server-only";

import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { files_table, folders_table, type DB_FileType } from "~/server/db/schema";

export const QUERIES = {
	getFolders: function (folderId: number) {
		return db
			.select()
			.from(folders_table)
			.where(eq(folders_table.parent, folderId));
	},

	getFiles: function (folderId: number) {
		return db
			.select()
			.from(files_table)
			.where(eq(files_table.parent, folderId));
	},

	getAllParentsForFolder: async function (folderId: number) {
		let parents: typeof folders_table.$inferSelect[] = [];
		let currentId: number | null = folderId;

		while (currentId != null) {
			const folder = await db
				.select()
				.from(folders_table)
				.where(eq(folders_table.id, currentId));

			if (!folder[0]) {
				throw new Error("Folder not found!");
			}

			parents = [folder[0], ...parents];
			currentId = folder[0]?.parent;
		}

		return parents;
	},

	getFolderById: async function (folderId: number) {
		const folder = await db
			.select()
			.from(folders_table)
			.where(eq(folders_table.id, folderId));

		return folder[0];
	}
}


export const MUTATIONS = {
	creatFile: async function (input: {
		file: {
			name: string;
			url: string;
			size: number;
			fileType: string;
			parent: number;
		},
		userId: string;
	}) {
		return await db.insert(files_table).values({
			...input.file,
			ownerId: input.userId,
		});
	}
}


