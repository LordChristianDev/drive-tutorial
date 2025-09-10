import { FileText, ImageIcon, Music, Video } from "lucide-react"
import type { FileProp } from "~/app/mock-data"

export const getFileIcon = (file: FileProp) => {
	switch (file.fileType) {
		case "jpg":
		case "png":
		case "gif":
			return <ImageIcon className="w-6 h-6 text-green-500" />
		case "mp4":
			return <Video className="w-6 h-6 text-red-500" />
		case "mp3":
			return <Music className="w-6 h-6 text-purple-500" />
		default:
			return <FileText className="w-6 h-6 text-blue-500" />
	}
}
