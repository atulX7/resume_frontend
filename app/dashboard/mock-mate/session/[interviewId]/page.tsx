/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect, useRef } from 'react'
import { use } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { InterviewService } from '@/services/interview-service'
import { toast } from 'sonner'
import { SubmitInterviewModal } from "@/app/dashboard/mock-mate/session/components/submit-interview-modal"
import { useSession } from 'next-auth/react'
import { ProgressBar } from '../components/progress-bar'
import { QuestionCard } from '../components/question-card'
import { VideoPreview } from '../components/video-preview'
import { InterviewControls } from '../components/interview-controls'

interface Answer {
  questionId: string;
  recording: Blob;
}

export default function InterviewSession({ params }: { params: Promise<{ interviewId: string }> }) {
  const { data: session } = useSession()
  const { interviewId } = use(params)  // Using React.use() to unwrap the Promise
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [recording, setRecording] = useState<MediaRecorder | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [, setAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<Array<{ question_id: string, question: string }>>([])
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Function to detect if device is mobile
  const checkIfMobile = () => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobile = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    );
    setIsMobile(mobile);
    return mobile;
  }

  // Handle window resize to update mobile status
  useEffect(() => {
    const handleResize = () => {
      checkIfMobile();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        // Don't request video for mobile devices
        const isMobileDevice = checkIfMobile();
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isMobileDevice ? false : true,
          audio: true
        });

        if (!mounted) {
          mediaStream.getTracks().forEach(track => track.stop());
          return;
        }

        setStream(mediaStream);
        
        // Only set camera active on non-mobile or if we actually get video
        const hasVideo = mediaStream.getVideoTracks().length > 0;
        setIsCameraActive(hasVideo);

        if (currentVideoRef && hasVideo && !isMobileDevice) {
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
        if (!isMobile) {
          alert('Unable to access camera. Please check your permissions.');
        }
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

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      const currentQuestionId = questions[currentQuestion]?.question_id
    
      if (currentQuestionId) {
        // Start the upload in the background
        InterviewService.uploadAnswer(
          interviewId,
          currentQuestionId,
          blob
        ).catch(error => {
          console.error('Error uploading answer:', error);
        });

        // Store answer in local state
        setAnswers(prev => [...prev, {
          questionId: currentQuestionId,
          recording: blob
        }]);
    
        // Move to next question or finish immediately
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          setIsAllQuestionsAnswered(true);
        }
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
      
      const response = await InterviewService.processInterview(
        interviewId,
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
      window.location.href = '/dashboard/mock-mate'
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

  return (
    <>
      <div className="h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
        {!isCameraActive && !isMobile && (
          <div className="absolute top-0 left-0 right-0 text-center bg-red-500 dark:bg-red-600 text-white p-2">
            Camera is off. Please enable your camera.
          </div>
        )}

        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          recordingTime={recordingTime}
          formatTime={formatTime}
          isMobile={isMobile}
        />

        {/* Mobile layout */}
        {isMobile ? (
          <div className="flex-1 flex flex-col min-h-0 gap-4">
            <QuestionCard
              currentQuestion={currentQuestion}
              question={questions[currentQuestion]?.question}
              isRecording={!!recording}
              isMobile={true}
            />
            
            <div className="mt-auto">
              <InterviewControls
                isAllQuestionsAnswered={isAllQuestionsAnswered}
                recording={recording}
                onStartRecording={startAnswering}
                onStopRecording={() => {
                  recording?.stop()
                  setRecording(null)
                }}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                isMobile={true}
              />
            </div>
          </div>
        ) : (
          // Desktop layout
          <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
            <div className="col-span-8 grid grid-rows-[auto_1fr] gap-4 min-h-0">
              <QuestionCard
                currentQuestion={currentQuestion}
                question={questions[currentQuestion]?.question}
                isRecording={!!recording}
                isMobile={false}
              />
              <VideoPreview
                videoRef={videoRef}
                recording={recording}
              />
            </div>

            <div className="col-span-4 grid grid-rows-[auto_1fr] gap-4 min-h-0">
              <InterviewControls
                isAllQuestionsAnswered={isAllQuestionsAnswered}
                recording={recording}
                onStartRecording={startAnswering}
                onStopRecording={() => {
                  recording?.stop()
                  setRecording(null)
                }}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
                isMobile={false}
              />

              <Card className="flex-1 min-h-0 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="h-full p-4">
                  <div className="h-full flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">AI Interview Tips</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Our AI analyzes these key aspects of your responses:
                      </p>
                    </div>

                    <div className="flex-1 grid grid-cols-1 gap-2 auto-rows-min">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <h4 className="font-medium text-sm text-indigo-900 dark:text-indigo-100">Communication</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Speak clearly with steady pace. AI evaluates articulation.
                        </p>
                      </div>

                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <h4 className="font-medium text-sm text-indigo-900 dark:text-indigo-100">STAR Method</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Situation, Task, Action, Result. Keep responses structured.
                        </p>
                      </div>

                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <h4 className="font-medium text-sm text-indigo-900 dark:text-indigo-100">Professionalism</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Good posture, eye contact, show enthusiasm.
                        </p>
                      </div>

                      {recording && (
                        <div className="p-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-xs text-green-800 dark:text-green-200 font-medium">
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
        )}
      </div>

      <SubmitInterviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={submitInterview}
        isLoading={isSubmitting}
        userEmail={session?.user?.email || ''}
        isMobile={isMobile}
      />
    </>
  )
}
