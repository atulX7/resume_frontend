/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
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
  const [isStarting, setIsStarting] = useState(false)

  const stopAllMediaTracks = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
      })
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    if (audioContext.current) {
      audioContext.current.close()
      audioContext.current = null
    }
    if (analyser.current) {
      analyser.current = null
    }
  }

  useEffect(() => {
    let mounted = true;
    let animationFrameId: number;
    
    async function checkDevices() {
        try {
            // Stop any existing streams first
            stopAllMediaTracks()

            // Request both video and audio permissions with improved audio settings
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                },
                audio: {
                    echoCancellation: { ideal: true },
                    noiseSuppression: { ideal: true },
                    autoGainControl: { ideal: true }
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
        stopAllMediaTracks()
    };
  }, []);

  const createAndStartInterview = async () => {
    if (!devices.video || !devices.audio || !user?.id) return;
    
    setIsStarting(true);
    
    try {
      const formDataStr = localStorage.getItem('interview-form-data');
      if (!formDataStr) {
        setIsStarting(false);
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
  
      if (response.success && response.data) {
        if (response.data.session_id) {
          // Clean up media before navigating
          stopAllMediaTracks()
          router.push(`/dashboard/mock-mate/session/${response.data.session_id}`);
        } else {
          console.error('Session ID not found in response data:', response.data);
          setIsStarting(false);
        }
      } else {
        console.error('Failed to create interview. Response was not successful:', response);
        setIsStarting(false);
      }
    } catch (error) {
      console.error('Error creating interview:', error);
      setIsStarting(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A2647] mb-3">
            Device Setup
          </h1>
          <p className="text-gray-600 text-lg">
            Let&apos;s make sure your camera and microphone are working properly
          </p>
        </div>
        
        {/* Main Content */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Camera Preview Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner bg-gradient-to-r from-gray-900 to-gray-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                  <VideoIcon size={18} className={`${devices.video ? "text-green-400" : "text-red-400"} animate-pulse`} />
                  <span className="text-sm font-medium">
                    {devices.video ? 'Camera Active' : 'Camera Not Found'}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="space-y-6">
                {/* Microphone Status */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${devices.audio ? "bg-green-100" : "bg-red-100"}`}>
                    <MicIcon 
                      size={24} 
                      className={`${devices.audio ? "text-green-600" : "text-red-600"} ${devices.audio ? "animate-pulse" : ""}`} 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {devices.audio ? 'Microphone Connected' : 'Microphone Not Found'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {devices.audio ? 'Audio input is working properly' : 'Please check your microphone connection'}
                    </p>
                  </div>
                </div>

                {/* Audio Level Meter */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Audio Level</span>
                    <span className="text-xs text-gray-500">Try speaking to test</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-150"
                      style={{ width: `${Math.min((audioLevel / 255) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col items-center pt-8 space-y-4">
            <Button
              onClick={createAndStartInterview}
              disabled={!devices.video || !devices.audio || isStarting}
              className={`
                px-12 py-6 rounded-xl text-lg font-semibold shadow-lg
                ${devices.video && devices.audio && !isStarting
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white transform hover:scale-105 transition-all duration-200' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
              `}
            >
              {isStarting 
                ? 'Starting Interview...' 
                : (devices.video && devices.audio ? 'Start Interview →' : 'Please Enable Devices')
              }
            </Button>
            {!devices.video || !devices.audio ? (
              <p className="text-sm text-red-500">
                Please allow access to both camera and microphone to continue
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}