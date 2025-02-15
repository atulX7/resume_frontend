import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InterviewQuestion } from '../types'
import { Mic, MicOff, Timer, ArrowRight, Brain, AlertCircle, ThumbsUp } from 'lucide-react'
import { useState, useRef } from 'react'

interface InterviewSessionProps {
  stream: MediaStream | null
  currentQuestion: InterviewQuestion
  isLastQuestion: boolean
  onNext: () => void
}

export function InterviewSession({ 
  stream, 
  currentQuestion, 
  isLastQuestion, 
  onNext 
}: InterviewSessionProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  // Set video stream when available
  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      clearInterval(timerRef.current)
      setRecordingTime(0)
    } else {
      // Start recording
      setIsRecording(true)
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-start justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-7xl h-[500px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
          {/* Left Column - Video and Controls */}
          <div className="flex flex-col h-full space-y-2">
            <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm p-2 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Timer className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Interview Session
                </h1>
              </div>
              {isRecording && (
                <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full border border-red-500/20">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            {stream && (
              <div className="relative rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 shadow-2xl group flex-1">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {isRecording && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-semibold animate-pulse shadow-lg">
                    LIVE
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "default"}
                className="shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-sm font-semibold"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
              
              <Button
                onClick={onNext}
                disabled={isRecording}
                variant="outline"
                className="shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-sm font-semibold"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{isLastQuestion ? 'Finish' : 'Skip'}</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </div>

          {/* Right Column - Question and Controls */}
          <div className="flex flex-col h-full space-y-2">
            <Card className="flex-1 p-2 border-2 border-primary/10 bg-white/70 backdrop-blur-sm shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-primary">
                    Question {currentQuestion.id}
                  </h3>
                  <div className="px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary">
                    {isLastQuestion ? 'Final Question' : `Question ${currentQuestion.id}`}
                  </div>
                </div>
                <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
                <div className="space-y-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <p className="text-base font-semibold text-primary flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Key points to address:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    {currentQuestion.expectedPoints.map((point, index) => (
                      <li key={index} className="text-muted-foreground text-base">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-yellow-800">STAR Method</p>
                      <p className="text-sm text-yellow-700">
                        Structure your answer using: Situation, Task, Action, Result
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-2">
              <Button 
                onClick={onNext}
                disabled={isRecording}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>{isLastQuestion ? 'Complete Interview' : 'Next Question'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <div className="text-center text-xs text-muted-foreground bg-white/50 backdrop-blur-sm p-2 rounded-xl">
                <div className="flex items-center justify-center space-x-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>You&apos;re doing great! Keep going!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 