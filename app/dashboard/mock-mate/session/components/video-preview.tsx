import { Card, CardContent } from "@/components/ui/card"
import { Video, Mic } from "lucide-react"

interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>
  recording: MediaRecorder | null
}

export function VideoPreview({ videoRef, recording }: VideoPreviewProps) {
  return (
    <Card className="flex-1 min-h-0">
      <CardContent className="p-4 h-full">
        <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
              <Video className="w-4 h-4" />
              <span className="text-sm">Live</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
              <Mic className="w-4 h-4" />
              <span className="text-sm">Recording {recording ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}