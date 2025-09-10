import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

import { sidebarItems } from "~/app/mock-data";

export default function Navigations({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {

	const renderSidebarItems = sidebarItems.map((item) => {
		const { label } = item;

		return (
			<Tooltip key={label} delayDuration={0}>
				<TooltipTrigger asChild>
					<Button
						variant={item.active ? "secondary" : "visible"}
						className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
					>
						<item.icon className="w-4 h-4" />
						{!sidebarCollapsed &&
							<span className="ml-2">
								{label}
							</span>
						}
					</Button>
				</TooltipTrigger>
				{sidebarCollapsed && (
					<TooltipContent side="right" className="ml-2">
						<p>{label}</p>
					</TooltipContent>
				)}
			</Tooltip>
		);
	});

	return (
		<nav className="space-y-2">
			{renderSidebarItems}
		</nav>
	);
}