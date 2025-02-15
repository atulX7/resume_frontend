'use client'

import { useState } from 'react'
import { Upload, Lock, FileText, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ScoreSection {
  title: string;
  score: number;
  items: string[];
}

export function ResumeChecker() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<{
    totalScore: number;
    sections: ScoreSection[];
  } | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.includes('word'))) {
      setFile(droppedFile)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const analyzeResume = async () => {
    if (!file) return
    setLoading(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setAnalysis({
        totalScore: 92,
        sections: [
          {
            title: 'Content',
            score: 95,
            items: ['ATS Parse Rate', 'Quantifying Impact', 'Repetition']
          },
          {
            title: 'Format & Brevity',
            score: 88,
            items: ['Layout Structure', 'Section Headers', 'Length']
          },
          {
            title: 'Style',
            score: 90,
            items: ['Action Verbs', 'Clarity', 'Consistency']
          }
        ]
      })
    } catch (error) {
      console.error('Error analyzing resume:', error)
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content and Upload */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                AI-Powered
              </span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Is your resume good enough?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI analyzes your resume against 16 crucial parameters to ensure maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold">ATS Optimization</h3>
              <p className="text-sm text-muted-foreground">Ensures your resume passes ATS systems</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">Get detailed feedback in seconds</p>
            </div>
          </div>

          <Card className={cn(
            "border-2 border-dashed border-gray-200 rounded-xl p-6 transition-all",
            isDragging && "border-primary bg-primary/5"
          )}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center text-center"
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-base font-semibold mb-2">Drop your resume here</h3>
              <p className="text-sm text-muted-foreground mb-4">PDF & DOCX only. Max 2MB file size.</p>
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button variant="default" size="lg" className="mb-4">
                  Upload Resume <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </label>

              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{file.name}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                <Lock className="h-3 w-3" />
                <span>Privacy guaranteed</span>
              </div>
            </div>
          </Card>

          {file && !analysis && (
            <Button 
              onClick={analyzeResume} 
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          )}
        </div>

        {/* Right Column - Image or Analysis Results */}
        <div className="relative">
          {!analysis ? (
            <div className="relative h-[600px] w-full">
              <Image
                src="/resume-analysis-preview.png"
                alt="Resume Analysis Preview"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resume Score</h2>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{analysis.totalScore}/100</span>
                  </div>
                  <Progress value={analysis.totalScore} className="h-32 w-32 rounded-full" />
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
                <div className="space-y-4">
                  {analysis.sections.map((section, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{section.title}</h3>
                        <span className="text-sm text-muted-foreground">{section.score}%</span>
                      </div>
                      <Progress value={section.score} className="h-2" />
                      <ul className="text-sm text-muted-foreground">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 