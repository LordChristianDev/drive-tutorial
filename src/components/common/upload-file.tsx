import { Upload } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function UploadFile() {
	return (
		<Card className="border-2 border-dashed border-border hover:border-primary transition-colors mb-6 p-8 text-center">
			<Upload className="mx-auto mb-4 text-muted-foreground w-12 h-12" />
			<h3 className="text-lg font-medium mb-2">Drop files here to upload</h3>
			<p className="text-muted-foreground mb-4">Or click to select files</p>
			<Button>
				<Upload className="w-4 h-4 mr-2" />
				Choose Files
			</Button>
		</Card>
	);
}