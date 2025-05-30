import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, StopCircle, Send } from "lucide-react"

interface InterviewControlsProps {
  isAllQuestionsAnswered: boolean
  recording: MediaRecorder | null
  onStartRecording: () => void
  onStopRecording: () => void
  onOpenSubmitModal: () => void
  isMobile?: boolean
}

export function InterviewControls({
  isAllQuestionsAnswered,
  recording,
  onStartRecording,
  onStopRecording,
  onOpenSubmitModal,
  isMobile = false
}: InterviewControlsProps) {
  return (
    <Card className={`flex-none dark:bg-gray-800 dark:border-gray-700 ${isMobile ? 'mb-2' : ''}`}>
      <CardContent className={isMobile ? "p-4" : "p-6"}>
        {isAllQuestionsAnswered ? (
          <Button
            onClick={onOpenSubmitModal}
            variant="default"
            size={isMobile ? "default" : "lg"}
            className={`w-full ${isMobile ? 'h-10 text-sm' : 'h-12 text-base'} gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white`}
          >
            <Send className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
            Submit Interview
          </Button>
        ) : !recording ? (
          <Button
            onClick={onStartRecording}
            variant="default"
            size={isMobile ? "default" : "lg"}
            className={`w-full ${isMobile ? 'h-10 text-sm' : 'h-12 text-base'} gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white`}
          >
            <PlayCircle className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={onStopRecording}
            variant="destructive"
            size={isMobile ? "default" : "lg"}
            className={`w-full ${isMobile ? 'h-10 text-sm' : 'h-12 text-base'} gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white`}
          >
            <StopCircle className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
            Stop Recording
          </Button>
        )}
        {!isMobile && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {!recording
              ? "Click to start recording your answer. Once started, record your response and click stop when finished. The next question will appear automatically."
              : "Recording in progress... Click stop when you've finished your answer to move to the next question."
            }
          </p>
        )}
      </CardContent>
    </Card>
  )
}