"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/lib/user"
import { Button } from "@/components/ui/button"

// Toggle this to enable/disable fullscreen feature
const ENABLE_FULLSCREEN = true;

interface FullscreenPopupProps {
  onRequestFullscreen: () => void;
  onClose: () => void;
}

function FullscreenPopup({ onRequestFullscreen }: FullscreenPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800/95 rounded-lg shadow-xl dark:shadow-black/30 max-w-md w-full p-6 relative border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Enter Fullscreen Mode
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          For the best interview experience, we recommend using fullscreen mode. This ensures proper camera and audio functionality.
        </p>
        <Button
          onClick={onRequestFullscreen}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors"
        >
          Enter Fullscreen
        </Button>
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
  const stopAllMediaTracks = useCallback(() => {
    if (activeStream) {
      activeStream.getTracks().forEach(track => {
        track.stop()
      })
      setActiveStream(null)
    }
  }, [activeStream])

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

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopAllMediaTracks();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isFullscreen) {
        stopAllMediaTracks();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopAllMediaTracks();
    };
  }, [isFullscreen, stopAllMediaTracks]);

  return (
    <>
      {ENABLE_FULLSCREEN && showFullscreenPopup && !isFullscreen && (
        <FullscreenPopup 
          onRequestFullscreen={handleFullscreen}
          onClose={() => setShowFullscreenPopup(false)}
        />
      )}
      <div className="fixed inset-0 w-full h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </>
  )
}