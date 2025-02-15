'use client'

import { useState } from 'react'
import { SetupScreen } from './components/SetupScreen'
import { SystemCheck } from './components/SystemCheck'
import { InterviewSession } from './components/InterviewSession'
import { InterviewReview } from './components/InterviewReview'
import { useMediaStream } from '@/hooks/use-media-stream'
import { useVoiceRecording } from '@/hooks/use-voice-recording'
import { interviewQuestions } from './data/questions'

enum InterviewState {
  SETUP,
  CHECKING,
  INTERVIEWING,
  REVIEW
}

export default function InterviewPage() {
  const [interviewState, setInterviewState] = useState<InterviewState>(InterviewState.SETUP)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])
  const { stream, hasPermission, requestPermission } = useMediaStream()
  const { startRecording, stopRecording, audioUrl } = useVoiceRecording()

  const handleStartInterview = async () => {
    if (!hasPermission) {
      const granted = await requestPermission()
      if (granted) {
        setInterviewState(InterviewState.CHECKING)
      }
    }
  }

  const handleBeginInterview = async () => {
    setInterviewState(InterviewState.INTERVIEWING)
    await startRecording()
  }

  const handleNextQuestion = async () => {
    await stopRecording()
    if (audioUrl) {
      setAnswers(prev => [...prev, audioUrl])
    }
    
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      await startRecording()
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      setInterviewState(InterviewState.REVIEW)
    }
  }

  const handleStartNew = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    setInterviewState(InterviewState.SETUP)
    setCurrentQuestion(0)
    setAnswers([])
  }

  return (
    <div className="container mx-auto py-8">
      {interviewState === InterviewState.SETUP && (
        <SetupScreen onStart={handleStartInterview} />
      )}

      {interviewState === InterviewState.CHECKING && (
        <SystemCheck 
          hasPermission={hasPermission} 
          onContinue={handleBeginInterview}
          onRetry={requestPermission}
          stream={stream}
        />
      )}

      {interviewState === InterviewState.INTERVIEWING && (
        <InterviewSession
          stream={stream}
          currentQuestion={interviewQuestions[currentQuestion]}
          isLastQuestion={currentQuestion === interviewQuestions.length - 1}
          onNext={handleNextQuestion}
        />
      )}

      {interviewState === InterviewState.REVIEW && (
        <InterviewReview
          answers={answers}
          questions={interviewQuestions}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  )
}