'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { INTERVIEW_ANALYSIS } from '../../data/analysis'
import { useEffect } from 'react'
import { InterviewService } from '@/services/interview-service'
import { use } from 'react'

export default function AnalysisPage({ params }: { params: Promise<{ interviewId: string }> }) {
  const { interviewId } = use(params)
  const router = useRouter()

  useEffect(() => {
    const stopMediaTracks = async () => {
      try {
        const streams = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        streams.getTracks().forEach(track => track.stop())
      } catch (error) {
        console.error('Error stopping media tracks:', error)
      }
    }

    stopMediaTracks()
  }, [])

  useEffect(() => {
    console.log('Interview ID:', interviewId)
  }, [interviewId])

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await InterviewService.getAnalysis(interviewId)
        if (response.success && response.data) {
          console.log('Analysis data:', response.data)
        }
      } catch (error) {
        console.error('Error fetching analysis:', error)
      }
    }

    fetchAnalysis()
  }, [interviewId])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2647]">Interview Analysis</h1>
          <p className="text-gray-600">Duration: {INTERVIEW_ANALYSIS.duration}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/mock-interview')}
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
              {INTERVIEW_ANALYSIS.overallScore}%
            </div>
          </CardContent>
        </Card>
        

        {INTERVIEW_ANALYSIS.metrics.map((metric) => (
          <Card key={metric.name} className="col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={metric.score} className="h-2" />
              <span className="text-sm text-gray-600 mt-2">{metric.score}%</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Question Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {INTERVIEW_ANALYSIS.questions.map((q, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold mb-2">{q.question}</h3>
                <div className="flex items-center gap-4 mb-2">
                  <Progress value={q.score} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{q.score}%</span>
                </div>
                <p className="text-gray-600 mb-2">{q.feedback}</p>
                <div className="space-y-1">
                  {q.improvements.map((imp, i) => (
                    <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span>•</span> {imp}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
              
        <Card>
          <CardHeader>
            <CardTitle>Keyword Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Positive Keywords Used</h4>
                <div className="flex flex-wrap gap-2">
                  {INTERVIEW_ANALYSIS.keywordAnalysis.positiveKeywords.map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {INTERVIEW_ANALYSIS.keywordAnalysis.missingKeywords.map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Overused Words</h4>
                <div className="flex flex-wrap gap-2">
                  {INTERVIEW_ANALYSIS.keywordAnalysis.overusedWords.map((word) => (
                    <span key={word} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 