/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { MicIcon, VideoIcon, SmartphoneIcon } from "lucide-react"
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
            
            const isMobileDevice = checkIfMobile();

            // Request permissions based on device type
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                // On mobile, don't request video
                video: isMobileDevice ? false : {
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
                video: hasVideo || isMobileDevice, // Consider video as "active" on mobile even without actual video
                audio: hasAudio 
            });

            // Set up video preview if not mobile
            if (videoRef.current && hasVideo && !isMobileDevice) {
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
                setDevices({ video: isMobile, audio: false });
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
    // On mobile we only require audio, not video
    if ((!devices.video && !isMobile) || !devices.audio || !user?.id) return;
    
    setIsStarting(true);
    
    try {
      const formDataStr = localStorage.getItem('interview-form-data');
      if (!formDataStr) {
        console.error("Missing interview details", { description: "Please go back and re-enter your job & resume." });
        setIsStarting(false);
        return;
      }
  
      const { job_title, job_description, resume_temp_key } = JSON.parse(formDataStr);
      const response = await InterviewService.createInterview({
        user_id: user.id,
        job_title: job_title,
        job_description: job_description,
        resume_temp_key: resume_temp_key
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 p-3 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2647] dark:text-blue-300 mb-2 sm:mb-3">
            Device Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
            Let&apos;s make sure your {!isMobile ? "camera and " : ""}microphone {isMobile ? "is" : "are"} working properly
          </p>
        </div>
        
        {/* Main Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Camera Preview Section - Only show on non-mobile devices */}
            {!isMobile ? (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
                <div className="relative aspect-video rounded-lg md:rounded-xl overflow-hidden shadow-inner bg-gradient-to-r from-gray-900 to-gray-800">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-center gap-2 bg-black/60 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
                    <VideoIcon size={16} className={`${devices.video ? "text-green-400" : "text-red-400"} animate-pulse`} />
                    <span className="text-xs sm:text-sm font-medium">
                      {devices.video ? 'Camera Active' : 'Camera Not Found'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                    <SmartphoneIcon size={32} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Mobile Device Detected
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Video is disabled on mobile devices for better performance. 
                    Your interview will be audio-only.
                  </p>
                </div>
              </div>
            )}

            {/* Audio Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="space-y-4 md:space-y-6">
                {/* Microphone Status */}
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className={`p-2 md:p-3 rounded-full ${devices.audio ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                    <MicIcon 
                      size={20} 
                      className={`${devices.audio ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} ${devices.audio ? "animate-pulse" : ""}`} 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                      {devices.audio ? 'Microphone Connected' : 'Microphone Not Found'}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {devices.audio ? 'Audio input is working properly' : 'Please check your microphone connection'}
                    </p>
                  </div>
                </div>

                {/* Audio Level Meter */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">Audio Level</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Try speaking to test</span>
                  </div>
                  <div className="h-2 md:h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 dark:from-blue-400 dark:to-indigo-300 transition-all duration-150"
                      style={{ width: `${Math.min((audioLevel / 255) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col items-center pt-4 md:pt-8 space-y-3 md:space-y-4">
            <Button
              onClick={createAndStartInterview}
              disabled={(!devices.video && !isMobile) || !devices.audio || isStarting}
              className={`
                px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-6 rounded-lg md:rounded-xl text-base md:text-lg font-semibold shadow-lg
                ${(!devices.video && !isMobile) || !devices.audio 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-indigo-600 dark:to-emerald-600 hover:from-indigo-600 hover:to-emerald-600 dark:hover:from-indigo-700 dark:hover:to-emerald-700 text-white transform hover:scale-105 transition-all duration-200'
                }
                ${isStarting ? 'opacity-90 pointer-events-none' : ''}
              `}
            >
              {isStarting 
                ? 'Starting Interview...' 
                : ((devices.video || isMobile) && devices.audio ? 'Start Interview →' : 'Please Enable Devices')
              }
            </Button>
            {(!devices.video && !isMobile) || !devices.audio ? (
              <p className="text-xs md:text-sm text-red-500 dark:text-red-400">
                Please allow access to {!isMobile ? "both camera and " : ""}microphone to continue
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}