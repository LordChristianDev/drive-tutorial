import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { folders_table } from "~/server/db/schema";

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: typeof folders_table.$inferSelect[] }) {

	const renderBreadcrumbs = breadcrumbs.map((folder, index) => {
		const { id, name } = folder;

		return (
			<div key={index} className="flex items-center">
				<Link
					href={`/f/${id}`}
					className="text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					{name}
				</Link>
				{index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
			</div>
		);
	});

	return (
		<nav className="flex items-center space-x-2 mb-6">
			{renderBreadcrumbs}
		</nav>
	);
}