import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface QuestionCardProps {
  currentQuestion: number
  question: string
}

export function QuestionCard({ currentQuestion, question }: QuestionCardProps) {
  return (
    <Card className="flex-none">
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#0A2647] mb-1">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-base text-gray-700">
              {question || 'Loading question...'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}