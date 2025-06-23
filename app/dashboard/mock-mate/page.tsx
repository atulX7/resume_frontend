'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ArrowRight, Check, Clock } from "lucide-react"
import { InterviewService } from "@/services/interview-service"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { RatingDialog } from "@/components/user-dashboard/RatingDialog"
import { submitRating } from '@/services/rating-service'

interface Interview {
  session_id: string
  job_title: string
  created_at: string
  status: 'completed' | 'in_progress' | 'pending'
  score?: number
}

export default function MockMatePage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession();
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const response = await InterviewService.getUserInterviews()
        if (response.success && response.data) {
          setInterviews(response.data)
        } else if (response.error) {
          toast.error(response.error)
        }
      } catch (error) {
        console.error('Error fetching interviews:', error)
        toast.error('Failed to fetch interviews. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndShowDialog = () => {
      const nextEligible = localStorage.getItem("showRatingDialogNext");
      const now = Date.now();
      if (
        localStorage.getItem("showRatingDialog") === "true" &&
        (!nextEligible || now > Number(nextEligible))
      ) {
        setShowRating(true);
        localStorage.setItem("showRatingDialog", "false");
      }
    };

    // Initial check on mount (for reloads)
    const timer = setTimeout(checkAndShowDialog, 5000);

    // Listen for localStorage changes (for instant show)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "showRatingDialog" && e.newValue === "true") {
        checkAndShowDialog();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleCloseRating = () => {
    setShowRating(false);
    // Set next eligible time to 48 hours from now
    const nextTime = Date.now() + 48 * 60 * 60 * 1000;
    localStorage.setItem("showRatingDialogNext", nextTime.toString());
  };

  const handleSubmitRating = async (rating: number, comment: string) => {
    await submitRating(
      rating,
      comment,
      session?.user?.name ?? undefined,
      session?.user?.email ?? undefined
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="p-4 sm:p-6 space-y-8 container mx-auto max-w-7xl">
        {/* Hero Section */}
        {!isLoading && interviews.length === 0 ? (
          <div className="flex flex-col lg:flex-row justify-between items-center min-h-[60vh] lg:min-h-[80vh] gap-8">
            <div className="max-w-xl space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#0A2647] dark:text-white leading-tight">
                Welcome to <span className="text-primary dark:text-primary-foreground">Mock Mate</span>
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-base sm:text-lg leading-relaxed">
                Get more job offers by improving your interview skills...
              </p>
              <Link
                href="/dashboard/mock-mate/new"
                className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Start Your First Interview
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <Image
                src="/images/interview-illustration.svg"
                alt="Interview illustration"
                className="w-full max-w-md lg:max-w-[600px] h-auto hover:transform hover:scale-105 transition-transform duration-300"
                width={600}
                height={600}
                priority
              />
            </div>
          </div>
        ) : null}

        {/* Modified header section */}
        {interviews.length > 0 && (
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8">
            <div className="max-w-xl space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#0A2647] dark:text-white leading-tight">
                Welcome to <span className="text-primary dark:text-primary-foreground">Mock Mate</span>
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-base sm:text-lg leading-relaxed">
                Get more job offers by improving your interview skills...
              </p>
              <Link
                href="/dashboard/mock-mate/new"
                className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Start New Interview
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0">
              <Image
                src="/images/interview-illustration.svg"
                alt="Interview illustration"
                className="w-full max-w-md lg:max-w-[500px] h-auto hover:transform hover:scale-105 transition-transform duration-300"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        )}

        {/* Interviews Grid with floating arrow */}
        {interviews.length > 0 && (
          <div className="relative space-y-4 pt-16">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="hidden sm:flex flex-col items-center animate-bounce">
                <ArrowRight className="w-8 h-8 text-primary dark:text-primary-foreground transform rotate-90" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Interviews</span>
              </div>
              <div className="sm:hidden text-center">
                <span className="text-sm font-medium text-primary dark:text-primary-foreground">Scroll down to see your interviews</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center lg:text-left">Your Mock Interviews</h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="h-48" />
                  </Card>
                ))}
              </div>
            ) : interviews.length === 0 ? (
              <div className="min-h-[60vh] lg:min-h-[80vh] flex flex-col items-center justify-center">
                <div className="text-center max-w-2xl mx-auto p-4">
                  <Image
                    src="/images/empty-interview.svg"
                    alt="No interviews"
                    className="w-48 h-48 sm:w-64 sm:h-64 mb-8 mx-auto"
                    width={256}
                    height={256}
                  />
                  <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-[#0A2647]">
                    Start Your Interview Journey
                  </h1>
                  <p className="text-gray-600 mb-8 text-base sm:text-lg">
                    Practice makes perfect! Begin your interview preparation by simulating
                    real job interviews with our AI-powered mock interview system.
                  </p>
                  <Link href="/dashboard/mock-mate/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-6 h-auto text-base sm:text-lg gap-2">
                      <FileText className="w-5 h-5" />
                      Start Your First Interview
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interviews.map((interview) => (
                  <Link
                    key={interview.session_id}
                    href={`/dashboard/mock-mate/${interview.session_id}`}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full border-2 border-gray-100 group">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold truncate">
                          {interview.job_title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          {new Date(interview.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm">
                          {interview.status === 'completed' ? (
                            <Check className="w-4 h-4 mr-2" />
                          ) : interview.status === 'in_progress' ? (
                            <Clock className="w-4 h-4 mr-2" />
                          ) : (
                            <Check className="w-4 h-4 mr-2" />
                          )}
                          <span className={`
                            capitalize px-2 py-1 rounded-full text-xs
                            ${interview.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                            ${interview.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : ''}
                            ${interview.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                          `}>
                            {interview.status}
                          </span>
                        </div>
                        <div className="flex justify-end items-center">
                          <span className="text-sm text-gray-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            View Analysis
                          </span>
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <RatingDialog
        open={showRating}
        onClose={handleCloseRating}
        onSubmit={handleSubmitRating}
      />
    </div>
  )
}