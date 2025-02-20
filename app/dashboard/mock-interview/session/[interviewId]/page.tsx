'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { INTERVIEW_QUESTIONS } from '../../data/questions'
import { 
  PlayCircle, 
  StopCircle, 
  Timer, 
  Video, 
  Mic, 
  AlertCircle 
} from "lucide-react"
import { use } from 'react'

export default function InterviewSession({ params }: { params: Promise<{ interviewId: string }> }) {
  const router = useRouter()
  const { interviewId } = use(params)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [recording, setRecording] = useState<MediaRecorder | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [, setAnswers] = useState<Blob[]>([])

  useEffect(() => {
    let mounted = true;

    async function setupStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })

        if (!mounted) {
          mediaStream.getTracks().forEach(track => track.stop());
          return;
        }

        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (error) {
        console.error('Error accessing devices:', error)
      }
    }
    
    setupStream()

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop()
        })
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (recording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [recording])

  useEffect(() => {
    const currentVideo = videoRef.current; // Store ref value in variable
    
    if (currentVideo && stream) {
      currentVideo.srcObject = stream;
    }

    return () => {
      if (currentVideo) {
        currentVideo.srcObject = null;
      }
    };
  }, [stream]); // Add stream to dependencies

  const startAnswering = () => {
    if (!stream) return
    setRecordingTime(0)
    const mediaRecorder = new MediaRecorder(stream)
    const chunks: BlobPart[] = []

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      setAnswers(prev => [...prev, blob])
      
      if (currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        finishInterview()
      }
    }

    mediaRecorder.start()
    setRecording(mediaRecorder)
  }

  const stopAnswering = () => {
    recording?.stop()
    setRecording(null)
    
    if (currentQuestion === INTERVIEW_QUESTIONS.length - 1) {
      finishInterview()
    }
  }

  const cleanupMedia = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
      })
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const finishInterview = () => {
    cleanupMedia()
    router.push(`/dashboard/mock-interview/analysis/${interviewId}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Progress: {currentQuestion + 1}/{INTERVIEW_QUESTIONS.length}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Timer className="w-4 h-4" />
                {formatTime(recordingTime)}
              </span>
            </div>
            <Progress 
              value={(currentQuestion / INTERVIEW_QUESTIONS.length) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#0A2647] mb-2">
                  Question {currentQuestion + 1}
                </h2>
                <p className="text-lg text-gray-700">
                  {INTERVIEW_QUESTIONS[currentQuestion]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
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

          <Card>
            <CardContent className="p-8 flex flex-col justify-center items-center gap-6">
              {!recording ? (
                <Button
                  onClick={startAnswering}
                  variant="default"
                  size="lg"
                  className="w-full max-w-md h-16 text-lg gap-2"
                >
                  <PlayCircle className="w-6 h-6" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopAnswering}
                  variant="destructive"
                  size="lg"
                  className="w-full max-w-md h-16 text-lg gap-2"
                >
                  <StopCircle className="w-6 h-6" />
                  Stop Recording
                </Button>
              )}
              <p className="text-sm text-gray-500 text-center">
                {!recording 
                  ? "Click to start recording your answer" 
                  : "Recording in progress... Click to stop when finished"
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 