import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff } from "lucide-react"

interface QuestionCardProps {
  question: string
  isRecording: boolean
  currentQuestion: number
}

export function QuestionCard({ question, isRecording, currentQuestion }: QuestionCardProps) {
  return (
    <Card className="mb-4 flex-none dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="py-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${isRecording ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            {isRecording ? (
              <Mic className="w-5 h-5 text-red-500 dark:text-red-400" />
            ) : (
              <MicOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
              Question {currentQuestion + 1}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{question}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}