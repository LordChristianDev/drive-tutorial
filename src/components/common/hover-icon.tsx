import { useState } from "react";
import Image from "next/image";

import { Sidebar } from "lucide-react";
import { Button } from "~/components/ui/button"

import logo from "~/assets/flowdrive.png";

const HoverIcon = ({ toggle }: { toggle: () => void }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Button
			variant="visible"
			size="icon"
			onClick={toggle}
			aria-label="Toggle sidebar"
			className="text-muted-foreground cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isHovered
				? <Sidebar />
				: <Image src={logo} alt="logo" className="w-[2.5rem]" />}
		</Button>
	);
}

export default HoverIcon;