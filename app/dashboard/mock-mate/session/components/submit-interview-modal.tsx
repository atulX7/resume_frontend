import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, Clock, Mail } from "lucide-react"
import { useRouter } from 'next/navigation'

interface SubmitInterviewModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  userEmail: string
}

export function SubmitInterviewModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  userEmail,
}: SubmitInterviewModalProps) {
  const router = useRouter()

  const stopAllMediaTracks = () => {
    // Get all video elements and stop their streams
    const videoElements = document.querySelectorAll('video')
    videoElements.forEach(video => {
      if (video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach(track => {
          track.stop()
        })
        video.srcObject = null
      }
    })

    // Also try to stop any active media streams
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => {
        stream.getTracks().forEach(track => {
          track.stop()
        })
      })
      .catch(() => {
        // No media streams to cleanup
      })
  }

  const handleSubmit = async () => {
    try {
      await onConfirm()
      
      // Clean up media devices before redirecting
      stopAllMediaTracks()
      
      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        router.push('/dashboard/mock-mate')
      }, 100)
    } catch (error) {
      console.error('Error submitting interview:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-gray-800">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Ready to Submit
          </DialogTitle>
          <DialogDescription className="text-indigo-100 dark:text-indigo-200">
            Your interview session is complete. Let&apos;s review before processing.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* User Info Section */}
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
              <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
              <div className="flex flex-col">
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Your Email</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{userEmail}</span>
              </div>
            </div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2 px-1">
              <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
              Interview feedback will be sent to this email
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2 px-1 mt-1">
              <Clock className="w-3 h-3" />
              Please check your spam/junk folder if you don&apos;t see our email within 30 minutes
            </div>
          </div>

          {/* Process Info */}
          <div className="space-y-4 bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              What happens next?
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">AI processes your interview responses</span>
              </li>
              <li className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Detailed feedback sent to your email</span>
              </li>
              <li className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Processing takes 5-10 minutes</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <div className="flex gap-3 w-full">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isLoading}
              className="flex-1 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                "Submit Interview"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}