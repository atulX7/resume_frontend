'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ArrowRight, Check, Clock } from "lucide-react"
import { InterviewService } from "@/services/interview-service"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react" // Add this import

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

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const response = await InterviewService.getUserInterviews()
        if (response.success && response.data) {
          setInterviews(response.data)
        }
      } catch (error) {
        console.error('Error fetching interviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="p-6 space-y-8 container mx-auto max-w-7xl">
        {/* Hero Section - Show only when there are NO interviews */}
        {!isLoading && interviews.length === 0 ? (
          <div className="flex justify-between items-center min-h-[80vh] gap-8">
            <div className="max-w-xl space-y-6">
              <h1 className="text-5xl font-bold mb-4 text-[#0A2647] leading-tight">
                Welcome to <span className="text-primary">Mock Mate</span>
              </h1>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Get more job offers by improving your interview skills, master the process, breakdown your
                interviews into manageable parts, and finally conquer your desired job.
              </p>
              <Link 
                href="/dashboard/mock-mate/new"
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Start Your First Interview
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Image
                src="/images/interview-illustration.svg" 
                alt="Interview illustration" 
                className="w-[600px] h-auto hover:transform hover:scale-105 transition-transform duration-300"
                width={600}
                height={600}
              />
            </div>
          </div>
        ) : null}

        {/* Modified header section when interviews exist */}
        {interviews.length > 0 && (
          <div className="flex justify-between items-center gap-8 pt-8">
            <div className="max-w-xl space-y-6">
              <h1 className="text-5xl font-bold mb-4 text-[#0A2647] leading-tight">
                Welcome to <span className="text-primary">Mock Mate</span>
              </h1>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Get more job offers by improving your interview skills, master the process, breakdown your
                interviews into manageable parts, and finally conquer your desired job.
              </p>
              <Link 
                href="/dashboard/mock-mate/new"
                className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Start New Interview
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Image
                src="/images/interview-illustration.svg" 
                alt="Interview illustration" 
                className="w-[500px] h-auto hover:transform hover:scale-105 transition-transform duration-300"
                width={500}
                height={500}
              />
            </div>
          </div>
        )}

        {/* Interviews Grid with floating arrow */}
        {interviews.length > 0 && (
          <div className="relative space-y-4 pt-16">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
              <ArrowRight className="w-8 h-8 text-primary transform rotate-90" />
              <span className="text-sm font-medium text-gray-600">Your Interviews</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Mock Interviews</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="h-48" />
                  </Card>
                ))}
              </div>
            ) : interviews.length === 0 ? (
              <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <div className="text-center max-w-2xl mx-auto">
                  <Image
                    src="/images/empty-interview.svg" 
                    alt="No interviews" 
                    className="w-64 h-64 mb-8 mx-auto"
                    width={256}
                    height={256}
                  />
                  <h1 className="text-4xl font-bold mb-4 text-[#0A2647]">
                    Start Your Interview Journey
                  </h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Practice makes perfect! Begin your interview preparation by simulating 
                    real job interviews with our AI-powered mock interview system.
                  </p>
                  <Link href="/dashboard/mock-mate/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg gap-2">
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
    </div>
  )
}