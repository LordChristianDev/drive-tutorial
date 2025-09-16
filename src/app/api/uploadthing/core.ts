import z from "zod";
import { auth } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { Upload } from "lucide-react";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	driveUploader: f({
		blob: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: "1GB",
			maxFileCount: 9099,
		},
	}).input(z.object({
		folderId: z.number(),
	}))
		// Set permissions and file types for this FileRoute
		.middleware(async ({ input }) => {
			// This code runs on your server before upload
			const user = await auth();

			// If you throw, the user will not be able to upload
			if (!user.userId) throw new UploadThingError("Unauthorized!");

			const folder = await QUERIES.getFolderById(input.folderId);

			if (!folder) throw new UploadThingError("Folder not found!");
			if (folder.ownerId !== user.userId) throw new UploadThingError("Unauthorized!");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.userId, parentId: input.folderId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);
			console.log("file url", file.ufsUrl);

			const getFileTypeInfo = (fileName: string) => {
				const extension = fileName.split('.').pop()?.toLowerCase() || '';

				const fileTypeMap: Record<string, { type: string; category: string }> = {
					// Images
					jpg: { type: 'jpg', category: 'image' },
					jpeg: { type: 'jpeg', category: 'image' },
					png: { type: 'png', category: 'image' },
					gif: { type: 'gif', category: 'image' },
					webp: { type: 'webp', category: 'image' },
					svg: { type: 'svg', category: 'image' },

					// Documents
					pdf: { type: 'pdf', category: 'document' },
					doc: { type: 'doc', category: 'document' },
					docx: { type: 'docx', category: 'document' },
					txt: { type: 'txt', category: 'document' },

					// Videos
					mp4: { type: 'mp4', category: 'video' },
					avi: { type: 'avi', category: 'video' },
					mov: { type: 'mov', category: 'video' },
				};

				return fileTypeMap[extension] || { type: extension, category: 'unknown' };
			};

			const info = getFileTypeInfo(file.name);

			await MUTATIONS.creatFile({
				file: {
					name: file.name,
					size: file.size,
					url: file.url,
					parent: metadata.parentId,
					fileType: info.type,
				},
				userId: metadata.userId
			});

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
