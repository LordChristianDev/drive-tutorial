
import { useRouter } from "next/navigation";

import { Card } from "~/components/ui/card";
import { UploadButton } from "~/components/uploadthing";

export default function UploadFile({ folderId }: { folderId: number }) {
	const navigate = useRouter();

	return (
		<Card className="border-2 border-dashed border-border hover:border-primary transition-colors mb-6 p-8 text-center">
			{/* <Upload className="mx-auto mb-4 text-muted-foreground w-12 h-12" />
			<h3 className="text-lg font-medium mb-2">Drop files here to upload</h3>
			<p className="text-muted-foreground mb-4">Or click to select files</p> */}
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={() => {
					navigate.refresh();
				}}
				input={{
					folderId: folderId
				}}
			/>
		</Card>
	);
}