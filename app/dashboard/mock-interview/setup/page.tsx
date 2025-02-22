'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MicIcon, VideoIcon } from "lucide-react"
import { InterviewService } from '@/services/interview-service'
import { useUser } from '@/lib/user'

export default function SetupPage() {
  const router = useRouter()
  const { user } = useUser()
  const [devices, setDevices] = useState({ video: false, audio: false })
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const audioContext = useRef<AudioContext | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let mounted = true;
    
    async function checkDevices() {
      try {
        if (!stream) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          })
          
          if (!mounted) {
            mediaStream.getTracks().forEach(track => track.stop());
            return;
          }

          setStream(mediaStream)
          setDevices({ video: true, audio: true })

          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
          }

          audioContext.current = new AudioContext()
          analyser.current = audioContext.current.createAnalyser()
          const source = audioContext.current.createMediaStreamSource(mediaStream)
          source.connect(analyser.current)
          analyser.current.fftSize = 256
          
          const checkAudioLevel = () => {
            if (!analyser.current || !mounted) return
            const dataArray = new Uint8Array(analyser.current.frequencyBinCount)
            analyser.current.getByteFrequencyData(dataArray)
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length
            setAudioLevel(average)
            requestAnimationFrame(checkAudioLevel)
          }
          checkAudioLevel()
        }
      } catch (error) {
        console.error('Error accessing devices:', error)
        if (mounted) {
          setDevices({ video: false, audio: false })
        }
      }
    }
    
    checkDevices()

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (audioContext.current) {
        audioContext.current.close()
      }
    }
  }, [stream])

  const createAndStartInterview = async () => {
    if (!devices.video || !devices.audio || !user?.id) return;
    
    try {
      // Get the form data from localStorage
      const formDataStr = localStorage.getItem('interview-form-data');
      if (!formDataStr) {
        alert('Interview form data not found. Please try again.');
        return;
      }

      const formData = JSON.parse(formDataStr);
      
      // Create a File object from the stored resume data
      let resumeFile = null;
      if (formData.resume_file) {
        resumeFile = new File(
          [formData.resume_file], 
          formData.resume_file.name, 
          { type: formData.resume_file.type }
        );
      }
      
      const response = await InterviewService.createInterview({
        user_id: user.id,
        job_title: formData.job_title,
        job_description: formData.job_description,
        resume_file: resumeFile
      });

      if (response.success && response.data) {
        // Store questions for the session
        localStorage.setItem('current-interview-questions', JSON.stringify(response.data.questions));
        router.push(`/dashboard/mock-interview/session/${response.data.id}`);
      } else {
        alert('Failed to create interview. Please try again.');
      }
    } catch (error) {
      console.error('Error creating interview:', error);
      alert('An error occurred while creating the interview.');
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-4xl m-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#0A2647]">
            Let&apos;s Test Your Devices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
                  <VideoIcon size={16} className={devices.video ? "text-green-400" : "text-red-400"} />
                  <span className="text-sm">Camera {devices.video ? 'Connected' : 'Not connected'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MicIcon size={20} className={devices.audio ? "text-green-500" : "text-red-500"} />
                    <span>Microphone {devices.audio ? 'Connected' : 'Not connected'}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Audio Level:</p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-green-500 transition-all duration-150 w-[${(audioLevel / 255) * 100}%]`}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-4">
                    Try saying &quot;Hello&quot; to test your microphone
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={createAndStartInterview}
              disabled={!devices.video || !devices.audio}
              variant="default"
              size="lg"
              className="w-full md:w-auto"
            >
              Start Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 