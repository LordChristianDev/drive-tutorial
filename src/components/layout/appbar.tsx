import { useEffect, useState } from "react";
import { Grid3X3, List, Search, Upload } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import HoverIcon from "~/components/common/hover-icon";

import type { AppbarUpdateProps } from "~/app/mock-data";

type AppBarProps = {
	onChange: (updates: AppbarUpdateProps) => void;
}

export default function AppBar({ onChange }: AppBarProps) {
	const [viewMode, setViewMode] = useState<AppbarUpdateProps['viewMode']>("grid")
	const [searchQuery, setSearchQuery] = useState<AppbarUpdateProps['searchQuery']>("")
	const [sidebarCollapsed, setSidebarCollapsed] = useState<AppbarUpdateProps['sidebarCollapsed']>(false)

	useEffect(() => {
		onChange({ viewMode, searchQuery, sidebarCollapsed });
	}, [viewMode, searchQuery, sidebarCollapsed])

	return (
		<header className="border-b border-border bg-card">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center space-x-4">
					<HoverIcon toggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

					<h1 className="text-2xl font-bold text-foreground">Flow Drive</h1>

					<div className="ml-16 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<Input
							placeholder="Search in Drive"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 w-96"
						/>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					<Button variant="outline" size="sm">
						<Upload className="w-4 h-4 mr-2" />
						Upload
					</Button>

					<Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
						{viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
					</Button>
				</div>
			</div>
		</header>
	);
}