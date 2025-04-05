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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Submit Interview
          </DialogTitle>
          <DialogDescription>
            Please review your information before submitting
          </DialogDescription>
        </DialogHeader>

        <div className="bg-white rounded-lg overflow-hidden">
          {/* User Info Section */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-indigo-500 mr-3" />
              <span className="text-gray-600 w-24 font-medium">Email</span>
              <span className="text-gray-900">{userEmail}</span>
            </div>
            <div className="text-sm text-indigo-600 flex items-center gap-2 px-1">
              <CheckCircle className="w-4 h-4" />
              We&apos;ll send your interview feedback to this email address
            </div>
          </div>

          {/* Process Info */}
          <div className="space-y-3 bg-indigo-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-indigo-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-indigo-800">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                Your interview will be processed by our AI system
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                Detailed feedback will be sent to your email
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Processing typically takes 5-10 minutes
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isLoading}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              "Confirm Submission"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}