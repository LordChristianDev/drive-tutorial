import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { MUTATIONS } from "~/server/db/queries";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			/**
			 * For full list of options and defaults, see the File Route API reference
			 * @see https://docs.uploadthing.com/file-routes#route-config
			 */
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async () => {
			// This code runs on your server before upload
			const user = await auth();

			// If you throw, the user will not be able to upload
			if (!user.userId) throw new UploadThingError("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.userId };
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
					parent: 0,
					fileType: info.type,
				},
				userId: metadata.userId
			});

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
