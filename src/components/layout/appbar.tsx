import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Grid3X3, List, Upload } from "lucide-react";

import { Button } from "~/components/ui/button";
import HoverIcon from "~/components/common/hover-icon";

import type { AppbarUpdateProps } from "~/app/mock-data";

type AppBarProps = {
	onChange: (updates: AppbarUpdateProps) => void;
}

export default function AppBar({ onChange }: AppBarProps) {
	const [viewMode, setViewMode] = useState<AppbarUpdateProps['viewMode']>("grid")
	const [sidebarCollapsed, setSidebarCollapsed] = useState<AppbarUpdateProps['sidebarCollapsed']>(false)

	useEffect(() => {
		onChange({ viewMode, sidebarCollapsed });
	}, [viewMode, sidebarCollapsed])

	return (
		<header className="border-b border-border bg-card">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center space-x-4">
					<HoverIcon toggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

					<h1 className="text-2xl font-bold text-foreground">Flow Drive</h1>
				</div>

				<div className="flex items-center space-x-2">
					<Button variant="outline" size="sm">
						<Upload className="w-4 h-4 mr-2" />
						Upload
					</Button>

					<Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
						{viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
					</Button>

					<SignedOut>
						<SignInButton />
						<SignUpButton>
							<button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
								Sign Up
							</button>
						</SignUpButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	);
}