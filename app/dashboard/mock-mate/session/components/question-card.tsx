import { Card, CardContent } from "@/components/ui/card"
import { CircleOff, Disc } from "lucide-react"

interface QuestionCardProps {
  currentQuestion: number
  question: string
  isRecording: boolean
  isMobile?: boolean
}

export function QuestionCard({ currentQuestion, question, isRecording, isMobile = false }: QuestionCardProps) {
  return (
    <Card className={`${isMobile ? 'flex-1' : 'flex-none'} dark:bg-gray-800 dark:border-gray-700 ${isRecording ? 'border-red-300 dark:border-red-700' : ''}`}>
      <CardContent className={`${isMobile ? 'py-4 px-4' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900 dark:text-gray-100`}>
            Question {currentQuestion + 1}
          </h3>
          <div className="flex items-center gap-2">
            {isRecording ? (
              <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                <Disc className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} animate-pulse`} />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Recording</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <CircleOff className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Not Recording</span>
              </div>
            )}
          </div>
        </div>
        <div className={`${isRecording ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20' : 'bg-gray-50 dark:bg-gray-700/30 border-gray-100 dark:border-gray-700'} rounded-lg border p-4 ${isMobile ? 'text-sm' : ''}`}>
          <p className="text-gray-800 dark:text-gray-200">
            {question || 'Loading question...'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}