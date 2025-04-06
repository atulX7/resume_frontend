'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InterviewService } from '@/services/interview-service'
import type { AnalysisResponse } from '@/services/interview-service'
import { use } from 'react'

function LoadingAnalysis() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="col-span-1">
            <CardHeader>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <div className="h-4 w-full bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-2 w-full bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AnalysisPage({ params }: { params: Promise<{ interviewId: string }> }) {
  const { interviewId } = use(params)
  const router = useRouter()
  const [analysis, setAnalysis] = useState<AnalysisResponse['data']>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setIsLoading(true)
        const response = await InterviewService.getAnalysis(interviewId)
        if (response.success && response.data) {
          setAnalysis(response.data)
        }
      } catch (error) {
        console.error('Error fetching analysis:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, [interviewId])

  if (isLoading) {
    return <LoadingAnalysis />
  }

  if (!analysis) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700">No analysis data available</h2>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/mock-mate')}
          className="mt-4"
        >
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0A2647] to-[#144272] bg-clip-text text-transparent">
              Interview Analysis
            </h1>
            <div className="flex gap-4 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-sm font-medium">Job Title:</span>
                <span className="bg-blue-50 px-3 py-1 rounded-full text-sm">
                  {analysis.job_title}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sm font-medium">Date:</span>
                <span className="bg-blue-50 px-3 py-1 rounded-full text-sm">
                  {new Date(analysis.created_at).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/mock-mate')}
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Start New Interview
          </Button>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="col-span-1 bg-gradient-to-br from-[#0A2647] to-[#144272] text-white">
            <CardHeader>
              <CardTitle className="text-gray-100">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">
                {analysis.overall_score * 20}%
              </div>
            </CardContent>
          </Card>

          {Object.entries(analysis.skill_assessment).map(([skill, score]) => (
            <Card key={skill} className="col-span-1 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm capitalize">{skill.replace(/_/g, ' ')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-semibold text-[#2E8B57]">
                  {(score as number) * 20}%
                </div>
                <Progress 
                  value={(score as number) * 20} 
                  className="h-2 bg-gray-100"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Question Analysis */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-gray-50">
            <CardTitle>Question Analysis</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {analysis.evaluation_results.map((result, index) => (
              <div key={index} className="py-6 first:pt-4 last:pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    Q{index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-800">{result.question}</h3>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Progress 
                    value={result.score * 20} 
                    className="h-2 flex-1 bg-gray-100" 
                  />
                  <span className="text-sm font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    {result.score * 20}%
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {result.feedback}
                </p>
                {result.follow_up_question && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Follow-up Question: </span>
                      {result.follow_up_question}
                    </p>
                  </div>
                )}
                {result.audio_presigned_url && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <audio controls className="w-full h-8">
                      <source src={result.audio_presigned_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
