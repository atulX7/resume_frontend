import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Mic, XCircle, CheckCircle2, Volume2 } from 'lucide-react'
import { useRef, useState } from 'react'

interface SystemCheckProps {
  hasPermission: boolean
  onContinue: () => void
  onRetry: () => void
  stream: MediaStream | null
}

export function SystemCheck({ hasPermission, onContinue, stream }: SystemCheckProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isTestingAudio, setIsTestingAudio] = useState(false)
  const [videoVerified, setVideoVerified] = useState(false)
  const [audioVerified, setAudioVerified] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)
  
  // Set video stream when available
  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream
  }

  const testMicrophone = async () => {
    if (!stream) return
    
    setIsTestingAudio(true)
    
    // Create audio context if not exists
    if (!audioContext.current) {
      audioContext.current = new AudioContext()
    }
    
    // Create audio feedback loop
    const source = audioContext.current.createMediaStreamSource(stream)
    const destination = audioContext.current.createMediaStreamDestination()
    source.connect(destination)
    
    // Stop after 3 seconds
    setTimeout(() => {
      source.disconnect()
      setIsTestingAudio(false)
      setAudioVerified(true)
    }, 3000)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-lg p-8 shadow-lg backdrop-blur-sm bg-background/95">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-primary">System Check</h2>
          
          {stream && (
            <div className="relative rounded-lg overflow-hidden bg-muted aspect-video mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onPlaying={() => setVideoVerified(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVideoVerified(true)}
                  disabled={videoVerified}
                  className="bg-white/80 hover:bg-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  <span>{videoVerified ? 'Camera OK' : 'Test Camera'}</span>
                </Button>
              </div>
              {videoVerified && (
                <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-primary" />
                <span className="text-foreground">Camera Access</span>
              </div>
              {videoVerified ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Mic className="w-5 h-5 text-primary" />
                <span className="text-foreground">Microphone Access</span>
              </div>
              <div className="flex items-center space-x-2">
                {audioVerified ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testMicrophone}
                    disabled={isTestingAudio}
                    className="ml-2"
                  >
                    <Volume2 className={`w-4 h-4 ${isTestingAudio ? 'animate-pulse' : ''}`} />
                    <span className="ml-2">
                      {isTestingAudio ? 'Say "Hello"...' : 'Test Mic'}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {hasPermission && videoVerified && audioVerified && (
            <div className="text-center">
              <Button 
                onClick={onContinue}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Begin Interview
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 