import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, StopCircle, Send } from "lucide-react"

interface InterviewControlsProps {
  isAllQuestionsAnswered: boolean
  recording: MediaRecorder | null
  onStartRecording: () => void
  onStopRecording: () => void
  onOpenSubmitModal: () => void
}

export function InterviewControls({
  isAllQuestionsAnswered,
  recording,
  onStartRecording,
  onStopRecording,
  onOpenSubmitModal
}: InterviewControlsProps) {
  return (
    <Card className="flex-none">
      <CardContent className="p-6">
        {isAllQuestionsAnswered ? (
          <Button
            onClick={onOpenSubmitModal}
            variant="default"
            size="lg"
            className="w-full h-12 text-base gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Send className="w-5 h-5" />
            Submit Interview
          </Button>
        ) : !recording ? (
          <Button
            onClick={onStartRecording}
            variant="default"
            size="lg"
            className="w-full h-12 text-base gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <PlayCircle className="w-5 h-5" />
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={onStopRecording}
            variant="destructive"
            size="lg"
            className="w-full h-12 text-base gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <StopCircle className="w-5 h-5" />
            Stop Recording
          </Button>
        )}
        <p className="text-sm text-gray-500 text-center mt-2">
          {!recording
            ? "Click to start recording your answer. Once started, record your response and click stop when finished. The next question will appear automatically."
            : "Recording in progress... Click stop when you've finished your answer to move to the next question."
          }
        </p>
      </CardContent>
    </Card>
  )
}