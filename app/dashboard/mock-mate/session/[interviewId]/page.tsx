/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  PlayCircle,
  StopCircle,
  Timer,
  Video,
  Mic,
  AlertCircle,
  Send,
} from "lucide-react"
import { use } from 'react'
import { InterviewService } from '@/services/interview-service'
import { toast } from 'sonner'
import { SubmitInterviewModal } from "@/components/ui/submit-interview-modal"
import { useSession } from 'next-auth/react'

interface Answer {
  questionId: string;
  recording: Blob;
}

export default function InterviewSession({ params }: { params: Promise<{ interviewId: string }> }) {
  const { data: session } = useSession()
  const { interviewId } = use(params)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [recording, setRecording] = useState<MediaRecorder | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<Array<{ question_id: string, question: string }>>([])
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)

  useEffect(() => {
    const savedQuestions = localStorage.getItem('current-interview-questions');
    if (savedQuestions && savedQuestions !== 'undefined') {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, [interviewId]);

  useEffect(() => {
    let mounted = true;
    const currentVideoRef = videoRef.current;

    async function setupStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        if (!mounted) {
          mediaStream.getTracks().forEach(track => track.stop());
          return;
        }

        setStream(mediaStream);
        setIsCameraActive(true);

        if (currentVideoRef) {
          currentVideoRef.srcObject = mediaStream;
          // Add event listeners for better error handling
          const playVideo = async () => {
            try {
              await currentVideoRef.play();
            } catch (error) {
              console.error('Error playing video:', error);
              // Retry play on loadedmetadata
              currentVideoRef.addEventListener('loadedmetadata', async () => {
                try {
                  await currentVideoRef.play();
                } catch (playError) {
                  console.error('Error playing video after metadata loaded:', playError);
                }
              }, { once: true });
            }
          };

          playVideo();
        }
      } catch (error) {
        console.error('Error accessing devices:', error);
        alert('Unable to access camera. Please check your permissions.');
      }
    }

    setupStream();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      if (currentVideoRef) {
        currentVideoRef.srcObject = null;
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recording]);

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
      const currentQuestionId = questions[currentQuestion]?.question_id

      if (currentQuestionId) {
        setAnswers(prev => [...prev, {
          questionId: currentQuestionId,
          recording: blob
        }])
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setIsAllQuestionsAnswered(true)
      }
    }

    mediaRecorder.start()
    setRecording(mediaRecorder)
  }

  const cleanupMedia = () => {
    // Stop all media tracks
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    // Stop recording if active
    if (recording) {
      recording.stop();
      setRecording(null);
    }

    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // Reset recording time
    setRecordingTime(0);
  }

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitInterview = async () => {
    try {
      setIsSubmitting(true)
      // Collect the recordings and question IDs from the answers state
      const recordings = answers.map(a => a.recording)
      const questionIds = answers.map(a => a.questionId)

      // Call the processInterview method with the actual audio blobs
      const response = await InterviewService.processInterview(
        interviewId,
        recordings,
        questionIds
      )

      if (!response.success) {
        throw new Error(response.error)
      }

      // Clean up media
      cleanupMedia()
      localStorage.removeItem('current-interview-questions')

      toast.success('Interview submitted successfully!', {
        description: 'Redirecting to dashboard...',
      })

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard/mock-mate'
      }, 1500)
    } catch (error) {
      console.error('Error submitting interview:', error)
      toast.error('Failed to submit interview', {
        description: 'Please try again.',
      })
    } finally {
      setIsSubmitting(false)
      setIsSubmitModalOpen(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      <div className="h-[calc(100vh-4rem)] bg-gray-50 p-4 flex flex-col">
        {/* Camera status message */}
        {!isCameraActive && (
          <div className="absolute top-0 left-0 right-0 text-center bg-red-500 text-white p-2">
            Camera is off. Please enable your camera.
          </div>
        )}

        {/* Top section with progress */}
        <Card className="mb-2 flex-none">
          <CardContent className="py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">
                Progress: {currentQuestion + 1}/{questions.length}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Timer className="w-4 h-4" />
                {formatTime(recordingTime)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Main content area */}
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left column */}
          <div className="col-span-8 grid grid-rows-[auto_1fr] gap-4 min-h-0">
            {/* Question card */}
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
                      {questions[currentQuestion]?.question || 'Loading question...'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video card */}
            <Card className="flex-1 min-h-0">
              <CardContent className="p-4 h-full">
                <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
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
          </div>

          {/* Right column */}
          <div className="col-span-4 grid grid-rows-[auto_1fr] gap-4 min-h-0">
            {/* Controls card */}
            <Card className="flex-none">
              <CardContent className="p-6">
                {isAllQuestionsAnswered ? (
                  <Button
                    onClick={() => setIsSubmitModalOpen(true)}
                    variant="default"
                    size="lg"
                    className="w-full h-12 text-base gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Send className="w-5 h-5" />
                    Submit Interview
                  </Button>
                ) : !recording ? (
                  <Button
                    onClick={startAnswering}
                    variant="default"
                    size="lg"
                    className="w-full h-12 text-base gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      recording?.stop()
                      setRecording(null)
                    }}
                    variant="destructive"
                    size="lg"
                    className="w-full h-12 text-base gap-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <StopCircle className="w-5 h-5" />
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

            {/* New Interview Tips Card */}
            <Card className="flex-1 min-h-0">
              <CardContent className="h-full p-4">
                <div className="h-full flex flex-col">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-indigo-900">AI Interview Tips</h3>
                    <p className="text-xs text-gray-600">
                      Our AI analyzes these key aspects of your responses:
                    </p>
                  </div>

                  <div className="flex-1 grid grid-cols-1 gap-2 auto-rows-min">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <h4 className="font-medium text-sm text-indigo-900">Communication</h4>
                      <p className="text-xs text-gray-600">
                        Speak clearly with steady pace. AI evaluates articulation.
                      </p>
                    </div>

                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <h4 className="font-medium text-sm text-indigo-900">STAR Method</h4>
                      <p className="text-xs text-gray-600">
                        Situation, Task, Action, Result. Keep responses structured.
                      </p>
                    </div>

                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <h4 className="font-medium text-sm text-indigo-900">Professionalism</h4>
                      <p className="text-xs text-gray-600">
                        Good posture, eye contact, show enthusiasm.
                      </p>
                    </div>

                    {recording && (
                      <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-green-800 font-medium">
                          🎯 Recording: Focus on clear, structured response
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SubmitInterviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={submitInterview}
        isLoading={isSubmitting}
        userEmail={session?.user?.email || ''}
      />
    </>
  )
} // Close both JSX fragment and function
