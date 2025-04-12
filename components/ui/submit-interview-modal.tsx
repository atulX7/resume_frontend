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

  const handleSubmit = async () => {
    try {
      await onConfirm()
      router.push('/dashboard/mock-mate')
    } catch (error) {
      console.error('Error submitting interview:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-indigo-500 to-blue-600">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Ready to Submit
          </DialogTitle>
          <DialogDescription className="text-indigo-100">
            Your interview session is complete. Let&apos;s review before processing.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* User Info Section */}
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
              <Mail className="w-6 h-6 text-indigo-600 mr-3" />
              <div className="flex flex-col">
                <span className="text-sm text-indigo-600 font-medium">Your Email</span>
                <span className="text-gray-900 font-medium">{userEmail}</span>
              </div>
            </div>
            <div className="text-sm text-indigo-600 flex items-center gap-2 px-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Interview feedback will be sent to this email
            </div>
          </div>

          {/* Process Info */}
          <div className="space-y-4 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
              What happens next?
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                </div>
                <span className="text-gray-700">AI processes your interview responses</span>
              </li>
              <li className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-gray-700">Detailed feedback sent to your email</span>
              </li>
              <li className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-gray-700">Processing takes 5-10 minutes</span>
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
              className="flex-1 border-indigo-200 hover:bg-indigo-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
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