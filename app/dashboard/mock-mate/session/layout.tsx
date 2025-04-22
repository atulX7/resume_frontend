"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/lib/user"
import { X } from "lucide-react"

// Toggle this to enable/disable fullscreen feature
const ENABLE_FULLSCREEN = true;

interface FullscreenPopupProps {
  onRequestFullscreen: () => void;
  onClose: () => void;
}

function FullscreenPopup({ onRequestFullscreen, onClose }: FullscreenPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close fullscreen popup"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Enter Fullscreen Mode
        </h3>
        <p className="text-gray-600 mb-6">
          For the best interview experience, we recommend using fullscreen mode. This ensures proper camera and audio functionality.
        </p>
        <button
          onClick={onRequestFullscreen}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enter Fullscreen
        </button>
      </div>
    </div>
  );
}

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFullscreenPopup, setShowFullscreenPopup] = useState(false)

  // Function to stop all media tracks
  const stopAllMediaTracks = () => {
    if (activeStream) {
      activeStream.getTracks().forEach(track => {
        track.stop()
      })
      setActiveStream(null)
    }
  }

  // Function to handle fullscreen
  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.error('Error attempting to enable fullscreen:', err);
    }
    setShowFullscreenPopup(false);
  };

  // Function to exit fullscreen
  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error attempting to exit fullscreen:', err);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    // Check if we're in a session page
    const isInSessionPage = pathname?.includes('/dashboard/mock-mate/session')
    const isMockMateDashboard = pathname === '/dashboard/mock-mate'
    
    if (!isInSessionPage) {
      stopAllMediaTracks()
      if (isMockMateDashboard) {
        setTimeout(() => {
          window.location.reload()
        }, 100)
      } else {
        window.location.reload()
      }
      return
    }

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Show fullscreen popup if enabled and not in fullscreen
    if (ENABLE_FULLSCREEN && !document.fullscreenElement && !showFullscreenPopup) {
      setShowFullscreenPopup(true);
    }

    // Handle browser back/forward navigation
    const handlePopState = () => {
      const currentPath = window.location.pathname
      if (!currentPath.includes('/dashboard/mock-mate/session')) {
        stopAllMediaTracks()
        if (currentPath === '/dashboard/mock-mate') {
          setTimeout(() => {
            window.location.reload()
          }, 100)
        } else {
          window.location.reload()
        }
      }
    }

    // Handle page unload
    const handleBeforeUnload = () => {
      stopAllMediaTracks()
      if (isFullscreen) {
        exitFullscreen();
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup function
    return () => {
      stopAllMediaTracks()
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (isFullscreen) {
        exitFullscreen();
      }
    }
  }, [user, router, pathname, showFullscreenPopup])

  return (
    <>
      {ENABLE_FULLSCREEN && showFullscreenPopup && !isFullscreen && (
        <FullscreenPopup 
          onRequestFullscreen={handleFullscreen}
          onClose={() => setShowFullscreenPopup(false)}
        />
      )}
      <div className="fixed inset-0 w-full h-full bg-background overflow-hidden">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </>
  )
}