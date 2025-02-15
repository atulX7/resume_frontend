import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Mic, ArrowRight, AlertCircle, Sparkles, Brain } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface SetupScreenProps {
  onStart: () => void
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [permissionError, setPermissionError] = useState(false)

  const handleStart = async () => {
    try {
      const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName })
      if (permissions.state === 'denied') {
        setPermissionError(true)
        return
      }
      onStart()
    } catch {
      onStart()
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-background/90 p-4">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-5 animate-fade-in-up">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <h1 className="text-3xl font-bold text-primary">
                  AI Interview Practice
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Master your interview skills with real-time AI feedback
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border border-primary/10 bg-muted/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">Video Analysis</h3>
                    <p className="text-xs text-muted-foreground">Real-time feedback</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border border-primary/10 bg-muted/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">AI-Powered</h3>
                    <p className="text-xs text-muted-foreground">Smart insights</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Required Access:</h2>
              <Card className="p-4 border border-primary/10 bg-muted/30 backdrop-blur-sm">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3 text-sm">
                    <Camera className="w-4 h-4 text-primary" />
                    <span>Camera for video recording</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm">
                    <Mic className="w-4 h-4 text-primary" />
                    <span>Microphone for audio recording</span>
                  </li>
                </ul>
              </Card>
            </div>

            {permissionError && (
              <div className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Please enable camera access in browser settings</span>
              </div>
            )}

            <div>
              <Button 
                onClick={handleStart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground p-5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Interview</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Your recordings will remain private and secure
              </p>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
            <div className="relative space-y-4">
              <div className="relative h-[400px] rounded-xl overflow-hidden border border-primary/10 shadow-xl group hover:shadow-2xl transition-all duration-300">
                <Image 
                  src="/images/interview.png" 
                  alt="Interview Preview"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-primary/10 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">AI-Powered Analysis</h3>
                      <p className="text-xs text-muted-foreground">Get real-time feedback on your performance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border border-primary/10 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Video Analysis</h3>
                      <p className="text-xs text-muted-foreground">Body language insights</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-primary/10 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Voice Analysis</h3>
                      <p className="text-xs text-muted-foreground">Speech clarity score</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 