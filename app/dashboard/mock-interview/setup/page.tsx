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
    let animationFrameId: number;
    
    async function checkDevices() {
        try {
            // Stop any existing streams first
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            // Request both video and audio permissions
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            
            if (!mounted) {
                mediaStream.getTracks().forEach(track => track.stop());
                return;
            }

            // Check if we actually got both audio and video tracks
            const hasVideo = mediaStream.getVideoTracks().length > 0;
            const hasAudio = mediaStream.getAudioTracks().length > 0;

            setDevices({ 
                video: hasVideo, 
                audio: hasAudio 
            });

            // Set up video preview
            if (videoRef.current && hasVideo) {
                videoRef.current.srcObject = mediaStream;
            }

            // Set up audio analysis
            if (hasAudio) {
                if (audioContext.current) {
                    await audioContext.current.close();
                }
                audioContext.current = new AudioContext();
                analyser.current = audioContext.current.createAnalyser();
                const source = audioContext.current.createMediaStreamSource(mediaStream);
                source.connect(analyser.current);
                analyser.current.fftSize = 256;
                
                const checkAudioLevel = () => {
                    if (!analyser.current || !mounted) return;
                    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
                    analyser.current.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setAudioLevel(average);
                    animationFrameId = requestAnimationFrame(checkAudioLevel);
                };
                checkAudioLevel();
            }

            setStream(mediaStream);

        } catch (error) {
            console.error('Error accessing devices:', error);
            if (mounted) {
                // Provide more specific error feedback
                if (error instanceof DOMException) {
                    switch (error.name) {
                        case 'NotAllowedError':
                            console.error('Permission denied for camera/microphone');
                            break;
                        case 'NotFoundError':
                            console.error('Camera/microphone not found');
                            break;
                        case 'NotReadableError':
                            console.error('Camera/microphone is already in use');
                            break;
                        default:
                            console.error('Error accessing media devices:', error.message);
                    }
                }
                setDevices({ video: false, audio: false });
            }
        }
    }
    
    checkDevices();

    // Cleanup function
    return () => {
        mounted = false;
        
        // Cancel any pending animation frames
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        // Stop all media tracks
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }

        // Close audio context
        if (audioContext.current && audioContext.current.state !== 'closed') {
            audioContext.current.close().catch(err => 
                console.error('Error closing AudioContext:', err)
            );
        }
    };
  }, []); // Remove stream from dependencies to prevent re-running

  const createAndStartInterview = async () => {
    if (!devices.video || !devices.audio || !user?.id) return;
    
    try {
      const formDataStr = localStorage.getItem('interview-form-data');
      if (!formDataStr) {
        console.log('Interview form data not found. Please try again.');
        return;
      }

      const formData = JSON.parse(formDataStr);
      
      let resumeFile = null;
      if (formData.resume_file) {
        const binaryStr = atob(formData.resume_file.data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        resumeFile = new File(
          [bytes.buffer], 
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

      // Debugging: Log the entire response
      console.log('Create Interview Response:', response);

      if (response.success && response.data) {
        if (response.data.session_id) {
          router.push(`/dashboard/mock-interview/session/${response.data.session_id}`);
        } else {
          console.log('Session ID not found in response data:', response.data);
        }
      } else {
        console.log('Failed to create interview. Response was not successful:', response);
      }
    } catch (error) {
      console.error('Error creating interview:', error);
      console.log('An error occurred while creating the interview.');
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