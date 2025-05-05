import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Timer } from "lucide-react"

interface ProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  recordingTime: number
  formatTime: (seconds: number) => string
  isMobile?: boolean
}

export function ProgressBar({ currentQuestion, totalQuestions, recordingTime, formatTime, isMobile = false }: ProgressBarProps) {
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0

  return (
    <Card className={`mb-2 flex-none dark:bg-gray-800 dark:border-gray-700 ${isMobile ? 'shadow-sm' : ''}`}>
      <CardContent className={`${isMobile ? 'py-2 px-3' : 'py-3'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-500 dark:text-gray-400`}>
            Progress: {currentQuestion + 1}/{totalQuestions}
          </span>
          <span className={`flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-500 dark:text-gray-400`}>
            <Timer className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            {formatTime(recordingTime)}
          </span>
        </div>
        <Progress value={progress} className="h-2 dark:bg-gray-700" />
      </CardContent>
    </Card>
  )
}