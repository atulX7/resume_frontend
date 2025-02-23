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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2647]">Interview Analysis</h1>
          <p className="text-gray-600">Job Title: {analysis.job_title}</p>
          <p className="text-gray-600">Date: {new Date(analysis.created_at).toLocaleDateString()}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/mock-mate')}
        >
          Start New Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#2E8B57]">
              {analysis.overall_score * 20}%
            </div>
          </CardContent>
        </Card>

        {Object.entries(analysis.skill_assessment).map(([skill, score]) => (
          <Card key={skill} className="col-span-1">
            <CardHeader>
              <CardTitle className="text-sm capitalize">{skill.replace('_', ' ')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(score as number) * 20} className="h-2" />
              <span className="text-sm text-gray-600 mt-2">{(score as number) * 20}%</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Question Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {analysis.evaluation_results.map((result, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-2">{result.question}</h3>
                <div className="flex items-center gap-4 mb-2">
                  <Progress value={result.score * 20} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{result.score * 20}%</span>
                </div>
                <p className="text-gray-600 mb-2">{result.feedback}</p>
                {result.follow_up_question && (
                  <p className="text-sm text-primary mt-2">
                    Follow-up: {result.follow_up_question}
                  </p>
                )}
                {result.audio_presigned_url && (
                  <audio controls className="mt-2 w-full">
                    <source src={result.audio_presigned_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 