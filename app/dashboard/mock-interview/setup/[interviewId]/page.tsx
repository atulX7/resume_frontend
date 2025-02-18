'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MicIcon, VideoIcon } from "lucide-react"

export default function SetupPage({ params }: { params: Promise<{ interviewId: string }> }) {
  const router = useRouter()
  const { interviewId } = use(params)
  const [devices, setDevices] = useState({ video: false, audio: false })
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const audioContext = useRef<AudioContext | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    async function checkDevices() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setStream(mediaStream)
        setDevices({ video: true, audio: true })

        // Set video stream
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }

        // Set up audio analysis
        audioContext.current = new AudioContext()
        analyser.current = audioContext.current.createAnalyser()
        const source = audioContext.current.createMediaStreamSource(mediaStream)
        source.connect(analyser.current)
        analyser.current.fftSize = 256
        
        const checkAudioLevel = () => {
          if (!analyser.current) return
          const dataArray = new Uint8Array(analyser.current.frequencyBinCount)
          analyser.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average)
          requestAnimationFrame(checkAudioLevel)
        }
        checkAudioLevel()
      } catch (error) {
        console.error('Error accessing devices:', error)
      }
    }
    checkDevices()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (audioContext.current) {
        audioContext.current.close()
      }
    }
  }, [stream])

  const startInterview = () => {
    if (devices.video && devices.audio) {
      router.push(`/dashboard/mock-interview/session/${interviewId}`)
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
            {/* Camera Preview */}
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

            {/* Audio Test */}
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
              onClick={startInterview}
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