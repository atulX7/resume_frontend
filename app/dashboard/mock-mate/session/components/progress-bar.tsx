import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Timer } from "lucide-react"

interface ProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  recordingTime: number
  formatTime: (seconds: number) => string
}

export function ProgressBar({ currentQuestion, totalQuestions, recordingTime, formatTime }: ProgressBarProps) {
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0

  return (
    <Card className="mb-2 flex-none">
      <CardContent className="py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Progress: {currentQuestion + 1}/{totalQuestions}
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Timer className="w-4 h-4" />
            {formatTime(recordingTime)}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  )
}